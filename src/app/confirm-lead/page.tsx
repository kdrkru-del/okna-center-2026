'use client';

import React, { useEffect, useState } from 'react';

interface VerificationState {
  loading: boolean;
  success: boolean;
  alreadyConfirmed: boolean;
  error?: string;
  lid: string;
  cid: string;
  status: string;
  channel: string;
  mgr: string;
  maskedPhone: string;
}

export default function ConfirmLeadPage() {
  const [state, setState] = useState<VerificationState>({
    loading: true,
    success: false,
    alreadyConfirmed: false,
    lid: '',
    cid: '',
    status: 'qualified_lead',
    channel: 'email',
    mgr: '',
    maskedPhone: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const lid = params.get('lid') || '';
    const cid = params.get('cid') || 'unknown';
    const status = params.get('status') || 'qualified_lead';
    const channel = params.get('channel') || 'email';
    const mgr = params.get('mgr') || 'Менеджер';
    const pMask = params.get('p_mask') || '';
    const ts = params.get('ts') || '';
    const sig = params.get('sig') || '';

    const maskedPhone = pMask ? `+7 (***) ***-${pMask.replace(/\D/g, '').slice(-4)}` : '';

    setState((prev) => ({
      ...prev,
      lid,
      cid,
      status,
      channel,
      mgr,
      maskedPhone,
    }));

    // Server-side verification POST: Manager visit NEVER triggers client-side window.ym goal!
    fetch('/api/confirm-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lid, cid, status, channel, mgr, ts, sig }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          setState((prev) => ({
            ...prev,
            loading: false,
            success: true,
            alreadyConfirmed: Boolean(data.alreadyConfirmed),
          }));
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            success: false,
            error: data.error || 'Ошибка проверки подлинности запроса',
          }));
        }
      })
      .catch((err) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          success: false,
          error: 'Ошибка связи с сервером верификации: ' + (err?.message || 'сеть недоступна'),
        }));
      });
  }, []);

  const isSpam = state.status === 'spam_bot';
  const isMeasurement = state.status === 'measurement_booked';

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl text-center space-y-4">
        {state.loading ? (
          <div className="py-10 space-y-3">
            <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-400">Проверка цифровой подписи обращения...</p>
          </div>
        ) : state.error ? (
          <div className="py-6 space-y-3">
            <div className="text-5xl">⚠️</div>
            <h1 className="text-xl font-bold text-red-400">Ошибка авторизации подтверждения</h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-red-950/40 border border-red-800/60 p-3 rounded-xl">
              {state.error}
            </p>
            <p className="text-xs text-slate-500">
              По соображениям безопасности (152-ФЗ РФ) подтверждение доступно только по действительной ссылке из официального уведомления.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-5xl">
              {isSpam ? '🤖' : isMeasurement ? '📐' : '✅'}
            </div>

            <h1 className="text-xl font-bold">
              {state.alreadyConfirmed
                ? 'Обращение уже было подтверждено'
                : isSpam
                ? 'Спам / Пустой клик зафиксирован'
                : isMeasurement
                ? 'Запись на замер подтверждена!'
                : 'Реальный целевой лид подтверждён!'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {state.alreadyConfirmed
                ? 'Повторная отправка отклонена: этот лид уже зафиксирован в системе, дубликат исключён.'
                : isSpam
                ? 'Этот визит помечен в антифроде и исключён из обучения автостратегий Яндекс.Директа.'
                : `Сигнал (${isMeasurement ? 'MEASUREMENT_BOOKED' : 'QUALIFIED_LEAD'}) безопасно передан в систему офлайн-конверсий по исходному ClientID.`}
            </p>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 text-left text-xs text-slate-400 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">ID обращения:</span>
                <span className="text-slate-200">{state.lid || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Канал:</span>
                <span className="text-slate-200 uppercase font-sans font-medium">{state.channel}</span>
              </div>
              {state.mgr && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Менеджер:</span>
                  <span className="text-slate-200 font-sans">{state.mgr}</span>
                </div>
              )}
              {state.maskedPhone && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Клиент:</span>
                  <span className="text-slate-200">{state.maskedPhone}</span>
                </div>
              )}
              <div className="pt-1 border-t border-slate-800/80 flex justify-between text-[11px]">
                <span className="text-slate-500 font-sans">ClientID (_ym_uid):</span>
                <span className="text-emerald-400 truncate max-w-[170px]">{state.cid}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-medium">
                🛡️ Менеджерская сессия изолирована от Метрики
              </span>
            </div>

            <p className="text-xs text-slate-500 pt-1">
              Эту вкладку можно закрыть и вернуться в рабочую почту.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
