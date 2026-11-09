'use client';

import { useEffect } from 'react';

export const METRIKA_ID = 113115728;

declare global {
  interface Window {
    ym?: (id: number, action: string, target?: string | Record<string, unknown> | ((clientId: string) => void), params?: Record<string, unknown>) => void;
    CROAgent?: {
      isClickbot?: () => boolean;
      getState?: () => Record<string, unknown>;
    };
  }
}

/**
 * Считывает системный ClientID Яндекс.Метрики (_ym_uid) текущего посетителя
 * для последующей склейки с реальной заявкой и отправки офлайн-конверсии.
 */
export function getMetrikaClientId(): string {
  if (typeof document === 'undefined') return '';
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ym_uid=([^;]*)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]).trim();
    }
  } catch {
    // ignore
  }
  try {
    const fromStorage = window.localStorage.getItem('_ym_uid');
    if (fromStorage) {
      return fromStorage.replace(/"/g, '').trim();
    }
  } catch {
    // ignore
  }
  return '';
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    try {
      // Антифрод-Щит: если визит распознан как кликбот, блокируем отправку конверсии в Метрику 113115728,
      // чтобы автостратегия Яндекс.Директ не обучалась на ботах
      if (window.CROAgent?.isClickbot?.()) {
        window.ym(METRIKA_ID, 'userParams', { is_clickbot: 'yes', blocked_goal: goal });
        return;
      }
      window.ym(METRIKA_ID, 'reachGoal', goal, params);
    } catch {
      // ignore
    }
  }
}

export function buildConfirmLeadUrl(params: {
  clientId: string;
  status: 'qualified_lead' | 'measurement_booked' | 'spam_bot';
  channel: 'email' | 'max' | 'whatsapp';
  manager?: string;
  phone?: string;
}): string {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://xn--80aknmcbtp7a.xn--p1ai';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const search = new URLSearchParams();
  if (params.clientId) search.set('cid', params.clientId);
  search.set('status', params.status);
  search.set('channel', params.channel);
  if (params.manager) search.set('mgr', params.manager);
  if (params.phone) search.set('phone', params.phone);
  search.set('ts', String(Math.floor(Date.now() / 1000)));
  return `${origin}${basePath}/confirm-lead/?${search.toString()}`;
}

export function notifyMessengerLeadToEmail(params: {
  channel: 'max' | 'whatsapp';
  managerLabel?: string;
  managerUrl?: string;
  sequenceNumber?: number;
  placement?: string;
}): void {
  if (typeof window === 'undefined') return;
  if (window.CROAgent?.isClickbot?.()) return;

  const sessionKey = `_okna_email_notified_${params.channel}`;
  try {
    if (window.sessionStorage.getItem(sessionKey) === '1') {
      return;
    }
    window.sessionStorage.setItem(sessionKey, '1');
  } catch {
    // ignore
  }

  const metrikaClientId = getMetrikaClientId();
  const pageUrl = window.location.href;
  const dateTimeStr =
    new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Vladivostok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' (Приморское время)';

  const channelTitle =
    params.channel === 'max'
      ? `MAX (${params.managerLabel || 'Менеджер'})`
      : 'WhatsApp (+7 994 010-03-00)';

  const subject =
    params.channel === 'max'
      ? `Переход в MAX (${params.managerLabel || 'Менеджер'}, #${params.sequenceNumber || 1}) — «Окна Центр»`
      : `Переход в WhatsApp с сайта — «Окна Центр»`;

  const body: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    'Канал обращения': channelTitle,
    'Блок на сайте': params.placement || 'Кнопка мессенджера',
    'Страница перехода': pageUrl,
    'Дата и время': dateTimeStr,
  };

  if (params.managerUrl) {
    body['Ссылка MAX менеджера'] = params.managerUrl;
  }
  if (metrikaClientId) {
    body['ID Яндекс.Метрики (_ym_uid)'] = metrikaClientId;
  }

  body['✅ Если клиент реально написал — подтвердить лид'] = buildConfirmLeadUrl({
    clientId: metrikaClientId || 'unknown',
    status: 'qualified_lead',
    channel: params.channel,
    manager: params.managerLabel,
  });
  body['📐 Если записался на замер — подтвердить замер'] = buildConfirmLeadUrl({
    clientId: metrikaClientId || 'unknown',
    status: 'measurement_booked',
    channel: params.channel,
    manager: params.managerLabel,
  });
  body['🤖 Пустой клик / Не написал / Бот'] = buildConfirmLeadUrl({
    clientId: metrikaClientId || 'unknown',
    status: 'spam_bot',
    channel: params.channel,
    manager: params.managerLabel,
  });

  fetch('https://formsubmit.co/ajax/okna.c@mail.ru', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export default function YandexMetrika() {
  useEffect(() => {
    // Global listener for tel: and wa.me links to automatically track phone_click and whatsapp_click
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        reachGoal('phone_click', { href });
      } else if (href.includes('wa.me') || href.includes('whatsapp')) {
        reachGoal('whatsapp_click', { href });
        notifyMessengerLeadToEmail({
          channel: 'whatsapp',
          placement: 'Переход в WhatsApp с сайта',
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=113115728', 'ym');

    ym(113115728, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `,
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

