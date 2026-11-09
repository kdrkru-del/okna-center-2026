'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('okna_cookie_consent');
      if (!consent) {
        setShow(true);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('okna_cookie_consent', 'accepted');
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-slate-950/95 backdrop-blur-md text-slate-100 border-t border-slate-800 shadow-2xl transition-transform animate-fade-in"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="leading-relaxed text-slate-300 text-center sm:text-left">
          Мы используем файлы cookie и сервис веб-аналитики Яндекс.Метрика для технического обеспечения работы сайта, сбора статистики и улучшения пользовательского опыта в соответствии с Федеральным законом № 152-ФЗ. Ознакомьтесь с{' '}
          <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline font-medium">
            Политикой конфиденциальности
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 px-6 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          Принять и продолжить
        </button>
      </div>
    </aside>
  );
}
