'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const METRIKA_ID = 43431474;

declare global {
  interface Window {
    ym?: (id: number, action: string, target?: string, params?: Record<string, unknown>) => void;
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    try {
      window.ym(METRIKA_ID, 'reachGoal', goal, params);
    } catch {
      // ignore
    }
  }
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
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${METRIKA_ID}, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
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
