'use client';

import React, { useEffect, useState } from 'react';

export default function ConfirmLeadPage() {
  const [params, setParams] = useState<{
    lid: string;
    cid: string;
    status: string;
    channel: string;
    mgr: string;
    maskedPhone: string;
  }>({
    lid: '',
    cid: '',
    status: 'qualified_lead',
    channel: 'email',
    mgr: '',
    maskedPhone: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const lid = urlParams.get('lid') || '—';
    const cid = urlParams.get('cid') || '—';
    const status = urlParams.get('status') || 'qualified_lead';
    const channel = urlParams.get('channel') || 'email';
    const mgr = urlParams.get('mgr') || 'Менеджер';
    const pMask = urlParams.get('p_mask') || '';

    const maskedPhone = pMask ? `+7 (***) ***-${pMask.replace(/\D/g, '').slice(-4)}` : '';

    setParams({
      lid,
      cid,
      status,
      channel,
      mgr,
      maskedPhone,
    });

    // NOTE: In static export mode (output: 'export'), client-side reachGoal is strictly disabled
    // to prevent manager visits from poisoning advertising conversion statistics.
  }, []);

  const isSpam = params.status === 'spam_bot';
  const isMeasurement = params.status === 'measurement_booked';

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl text-center space-y-4">
        <div className="text-5xl">
          {isSpam ? '🤖' : isMeasurement ? '📐' : '📋'}
        </div>

        <h1 className="text-xl font-bold">
          {isSpam
            ? 'Карточка обращения: Спам / Бот'
            : isMeasurement
            ? 'Карточка обращения: Запись на замер'
            : 'Карточка обращения: Целевой лид'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Параметры обращения зафиксированы. Для передачи офлайн-конверсий в Яндекс.Метрику используйте экспорт ClientID в соответствии с регламентом ТЗ.
        </p>

        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 text-left text-xs text-slate-400 space-y-2 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">ID заявки:</span>
            <span className="text-slate-200">{params.lid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Канал:</span>
            <span className="text-slate-200 uppercase font-sans font-medium">{params.channel}</span>
          </div>
          {params.mgr && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Менеджер:</span>
              <span className="text-slate-200 font-sans">{params.mgr}</span>
            </div>
          )}
          {params.maskedPhone && (
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Телефон (152-ФЗ):</span>
              <span className="text-slate-200">{params.maskedPhone}</span>
            </div>
          )}
          <div className="pt-1.5 border-t border-slate-800/80 flex justify-between text-[11px]">
            <span className="text-slate-500 font-sans">ClientID (_ym_uid):</span>
            <span className="text-emerald-400 truncate max-w-[170px]">{params.cid}</span>
          </div>
        </div>

        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-medium">
            🛡️ Менеджерская сессия изолирована от Метрики
          </span>
        </div>

        <p className="text-xs text-slate-500 pt-1">
          Эту страницу можно закрыть и вернуться в рабочую почту.
        </p>
      </div>
    </main>
  );
}
