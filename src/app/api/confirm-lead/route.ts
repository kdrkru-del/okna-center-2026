import { NextRequest, NextResponse } from 'next/server';
import { METRIKA_ID, generateLeadConfirmToken } from '@/components/YandexMetrika';

// In-memory set of confirmed actions to guarantee idempotency and prevent duplicate offline conversions
const confirmedTokens = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { lid, cid, status, channel, mgr, ts, sig } = body;

    if (!lid || !status || !sig || !ts) {
      return NextResponse.json(
        { ok: false, error: 'Отсутствуют обязательные параметры верификации' },
        { status: 400 }
      );
    }

    const numericTs = Number(ts);
    const expectedSig = generateLeadConfirmToken(lid, cid || 'unknown', status, numericTs);

    // 1. Strict cryptographic signature verification
    if (sig !== expectedSig) {
      return NextResponse.json(
        { ok: false, error: 'Недействительная цифровая подпись запроса' },
        { status: 403 }
      );
    }

    // 2. Expiration check (links expire after 30 days)
    const thirtyDaysSeconds = 30 * 24 * 60 * 60;
    const nowUnix = Math.floor(Date.now() / 1000);
    if (nowUnix - numericTs > thirtyDaysSeconds) {
      return NextResponse.json(
        { ok: false, error: 'Срок действия ссылки подтверждения истёк (более 30 дней)' },
        { status: 410 }
      );
    }

    // 3. Idempotency check: prevent duplicate submissions of the same event
    const dedupKey = `${lid}:${status}`;
    if (confirmedTokens.has(dedupKey)) {
      return NextResponse.json({
        ok: true,
        alreadyConfirmed: true,
        message: 'Это обращение уже было подтверждено ранее.',
        leadId: lid,
        status,
      });
    }

    // Register confirmation in memory
    confirmedTokens.add(dedupKey);

    // 4. Server-to-server dispatch of offline conversion (Yandex.Metrika Offline Conversions API / AI Agent)
    const agentWebhook =
      process.env.DIRECT_AGENT_URL ||
      process.env.NEXT_PUBLIC_DIRECT_AGENT_URL ||
      '';

    if (agentWebhook && !agentWebhook.includes('localhost')) {
      try {
        await fetch(agentWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Lead-Token': sig,
          },
          body: JSON.stringify({
            counterId: METRIKA_ID,
            leadId: lid,
            clientId: cid,
            target: status.toUpperCase(),
            dateTimeUnix: numericTs,
            channel: channel || 'email',
            manager: mgr || 'Менеджер',
            confirmedAtUnix: nowUnix,
          }),
        });
      } catch (agentErr) {
        console.warn('AI Agent offline conversion webhook error:', agentErr);
      }
    }

    return NextResponse.json({
      ok: true,
      alreadyConfirmed: false,
      message: 'Обращение успешно верифицировано и передано в систему обучения рекламы.',
      leadId: lid,
      status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Внутренняя ошибка сервера верификации' },
      { status: 500 }
    );
  }
}
