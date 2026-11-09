'use client';

import React, { useEffect, useState } from 'react';
import { METRIKA_ID } from '@/components/YandexMetrika';

export default function ConfirmLeadPage() {
  const [state, setState] = useState<{
    cid: string;
    status: string;
    channel: string;
    mgr: string;
    phone: string;
    sent: boolean;
  }>({
    cid: '',
    status: 'qualified_lead',
    channel: 'email',
    mgr: '',
    phone: '',
    sent: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const cid = params.get('cid') || 'unknown';
    const status = params.get('status') || 'qualified_lead';
    const channel = params.get('channel') || 'email';
    const mgr = params.get('mgr') || 'Менеджер';
    const phone = params.get('phone') || '';
    const ts = Number(params.get('ts') || Math.floor(Date.now() / 1000));

    setState({ cid, status, channel, mgr, phone, sent: true });

    // 1. Отправляем сигнал в Яндекс.Метрику #113115728 (параметры визита + цель подтверждения)
    if (typeof window.ym === 'function') {
      try {
        window.ym(METRIKA_ID, 'params', {
          lead_verification: {
            client_id: cid,
            status,
            channel,
            manager: mgr,
          },
        });
        if (status === 'qualified_lead' || status === 'measurement_booked') {
          window.ym(METRIKA_ID, 'reachGoal', status, {
            verified_client_id: cid,
            channel,
            manager: mgr,
          });
        }
      } catch {
        // ignore
      }
    }

    // 2. Передаём подтверждённую офлайн-конверсию в наш AI-Агент (для загрузки CSV по ClientID в API Метрики и отчёта в Telegram владельцу)
    const agentWebhook =
      (process.env.NEXT_PUBLIC_DIRECT_AGENT_URL && !process.env.NEXT_PUBLIC_DIRECT_AGENT_URL.includes('localhost'))
        ? process.env.NEXT_PUBLIC_DIRECT_AGENT_URL
        : '';

    if (agentWebhook) {
      fetch(agentWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          counterId: METRIKA_ID,
          clientId: cid,
          target: status.toUpperCase(),
          dateTimeUnix: ts,
          channel,
          manager: mgr,
          phone,
        }),
      }).catch(() => {});
    }
  }, []);

  const isSpam = state.status === 'spam_bot';
  const isMeasurement = state.status === 'measurement_booked';

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl text-center space-y-4">
        <div className="text-5xl">
          {isSpam ? '🤖' : isMeasurement ? '📐' : '✅'}
        </div>
        <h1 className="text-xl font-bold">
          {isSpam
            ? 'Обращение помечено как Спам / Пустой клик'
            : isMeasurement
            ? 'Запись на замер подтверждена!'
            : 'Реальный целевой лид подтверждён!'}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          {isSpam
            ? 'Этот визит занесён в фильтр антифрода и исключён из обучения автостратегий Яндекс.Директ.'
            : `Сигнал (${isMeasurement ? 'MEASUREMENT_BOOKED' : 'QUALIFIED_LEAD'}) отправлен в счётчик Яндекс.Метрики #113115728 для обучения рекламы на реальных заказчиках.`}
        </p>
        <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 text-left text-xs text-slate-400 space-y-1.5">
          <div>
            <span className="text-slate-500">Канал:</span>{' '}
            <span className="text-slate-200 font-medium uppercase">{state.channel}</span>
          </div>
          {state.mgr && (
            <div>
              <span className="text-slate-500">Менеджер:</span>{' '}
              <span className="text-slate-200 font-medium">{state.mgr}</span>
            </div>
          )}
          <div>
            <span className="text-slate-500">ClientID Метрики (_ym_uid):</span>{' '}
            <code className="text-emerald-400">{state.cid || 'определяется...'}</code>
          </div>
        </div>
        <p className="text-xs text-slate-500 pt-2">
          Эту вкладку можно закрыть и вернуться в почту okna.c@mail.ru.
        </p>
      </div>
    </main>
  );
}
