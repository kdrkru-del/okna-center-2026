'use client';

import { useEffect } from 'react';

export const METRIKA_ID = 113115728;

declare global {
  interface Window {
    ym?: {
      (
        id: number,
        action: string,
        target?: string | Record<string, unknown> | ((clientId: string) => void),
        params?: Record<string, unknown>
      ): void;
      a?: any[];
      l?: number;
    };
    CROAgent?: {
      isClickbot?: () => boolean;
      getState?: () => Record<string, unknown>;
    };
  }
}

/**
 * Mapping of legacy event identifiers to verified Yandex.Metrika (113115728) goal conditions:
 * - 679698805: click_phone
 * - 679698806: click_whatsapp
 * - 679698807: click_telegram
 * - 679698808: lead_submit
 * - 679698809: bot_detected
 */
export const GOAL_MAP: Record<string, string> = {
  phone_click: 'click_phone',
  whatsapp_click: 'click_whatsapp',
  telegram_click: 'click_telegram',
  form_submit: 'lead_submit',
  lead_form_submit: 'lead_submit',
  contact_form: 'lead_submit',
};

const recentGoals = new Map<string, number>();
const DEDUP_WINDOW_MS = 1200; // Deduplication window: 1.2s for identical physical actions

const UTM_STORAGE_KEY = '_okna_stored_utms';

/**
 * Captures and stores UTM and tracking parameters across user sessions
 */
export function captureUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const url = new URL(window.location.href);
    const params: Record<string, string> = {};
    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'yclid',
      'etext',
    ];
    let hasUtm = false;

    utmKeys.forEach((k) => {
      const val = url.searchParams.get(k);
      if (val) {
        params[k] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
      return params;
    }

    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return {};
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

/**
 * Reads Yandex.Metrika ClientID (_ym_uid)
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

/**
 * Centralized, deduplicated goal tracking function.
 * Automatically translates legacy event names to verified conditions,
 * queues goals if tag.js is still loading, and prevents duplicate triggers
 * from accidental double-clicks or event bubbling without suppressing distinct user actions.
 */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const targetGoal = GOAL_MAP[goal] || goal;
  // Ensure Metrika async queue function exists even if called before tag.js loads
  if (typeof window.ym !== 'function') {
    const ymQueue: any = function (...args: any[]) {
      (ymQueue.a = ymQueue.a || []).push(args);
    };
    ymQueue.l = 1 * Date.now();
    window.ym = ymQueue;
  }

  // Anti-fraud filter: If recognized as clickbot by CROAgent sensor, withhold conversion goal from ad bidding
  if (window.CROAgent?.isClickbot?.()) {
    try {
      if (typeof window.ym === 'function') {
        window.ym(METRIKA_ID, 'userParams', { is_clickbot: 'yes', blocked_goal: targetGoal });
        window.ym(METRIKA_ID, 'reachGoal', 'bot_detected', { original_goal: targetGoal, ...params });
      }
    } catch {}
    return; // Withhold conversion goal from Yandex.Metrika training
  }

  const actionIdentity =
    (params?.leadId as string) ||
    (params?.href as string) ||
    (params?.placement as string) ||
    (params?.source as string) ||
    '';
  const dedupKey = `${targetGoal}:${actionIdentity}`;

  const now = Date.now();
  const lastTime = recentGoals.get(dedupKey) || 0;

  // Deduplicate identical action within 1.2s to prevent multiple triggers from bubbling / capture
  if (now - lastTime < DEDUP_WINDOW_MS) {
    return;
  }

  try {
    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', targetGoal, params);
    }
    // Record timestamp ONLY after confirmed dispatch or queueing
    recentGoals.set(dedupKey, now);
  } catch (err) {
    console.warn('Yandex.Metrika reachGoal error:', err);
  }
}

/**
 * Builds informational lead confirmation link for notification emails.
 * Note: Under static deployment (output: 'export'), verification is handled
 * via CRM / Lead Gateway backend rather than unauthenticated client scripts.
 */
export function buildConfirmLeadUrl(params: {
  leadId?: string;
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
  const leadId = params.leadId || `lead_${Date.now()}`;
  const ts = Math.floor(Date.now() / 1000);

  search.set('lid', leadId);
  if (params.clientId) search.set('cid', params.clientId);
  search.set('status', params.status);
  search.set('channel', params.channel);
  if (params.manager) search.set('mgr', params.manager);
  if (params.phone) {
    // 152-FZ Privacy protection: strictly avoid transmitting raw phones in open URL query strings
    const digits = params.phone.replace(/\D/g, '');
    const masked = digits.length >= 4 ? `***${digits.slice(-4)}` : 'masked';
    search.set('p_mask', masked);
  }
  search.set('ts', String(ts));

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

  const messengerLeadId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  body['✅ Если клиент реально написал — подтвердить лид'] = buildConfirmLeadUrl({
    leadId: messengerLeadId,
    clientId: metrikaClientId || 'unknown',
    status: 'qualified_lead',
    channel: params.channel,
    manager: params.managerLabel,
  });
  body['📐 Если записался на замер — подтвердить замер'] = buildConfirmLeadUrl({
    leadId: messengerLeadId,
    clientId: metrikaClientId || 'unknown',
    status: 'measurement_booked',
    channel: params.channel,
    manager: params.managerLabel,
  });
  body['🤖 Пустой клик / Не написал / Бот'] = buildConfirmLeadUrl({
    leadId: messengerLeadId,
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
    // Initial capture of UTM parameters from landing query string
    captureUtmParams();

    // Centralized listener for tel: and wa.me links to automatically track click_phone and click_whatsapp
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      const placement =
        target.getAttribute('data-placement') ||
        target.getAttribute('title') ||
        'Ссылка на сайте';

      if (href.startsWith('tel:')) {
        reachGoal('click_phone', { href, placement });
      } else if (href.includes('wa.me') || href.includes('whatsapp')) {
        reachGoal('click_whatsapp', { href, placement });
        notifyMessengerLeadToEmail({
          channel: 'whatsapp',
          placement: placement || 'Переход в WhatsApp с сайта',
        });
      } else if (href.includes('t.me') || href.includes('telegram')) {
        reachGoal('click_telegram', { href, placement });
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
