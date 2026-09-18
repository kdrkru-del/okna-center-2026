'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ConceptSwitcher() {
  const pathname = usePathname();

  // In production builds, ConceptSwitcher is hidden per specification
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const isArch = pathname.includes('architecture-of-light');
  const isLiving = pathname.includes('living-view');
  const isVladivostok = pathname.includes('vladivostok-view') && !isLiving && !isArch;
  const isFrosted = pathname.includes('frosted-glass');
  const isPanels = pathname.includes('glass-panels');

  return (
    <aside
      aria-label="Переключатель концептов"
      className="fixed bottom-4 right-4 sm:right-6 z-50 flex items-center gap-1 p-1.5 rounded-full bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.85)] text-[10px] sm:text-[11px] select-none max-w-[95vw] overflow-x-auto"
    >
      <Link
        href="/variants"
        title="Обзор всех концептов"
        className="px-2.5 py-1 text-slate-400 hover:text-cyan-400 font-mono text-[9px] uppercase tracking-wider hidden lg:flex items-center gap-1 transition-colors"
      >
        <span>Все 5</span>
        <span>→</span>
      </Link>
      
      <Link
        href="/variants/glass-panels"
        className={`px-2.5 sm:px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
          isPanels
            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        1. Панели
      </Link>

      <Link
        href="/variants/frosted-glass"
        className={`px-2.5 sm:px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
          isFrosted
            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        2. Иней
      </Link>

      <Link
        href="/variants/vladivostok-view"
        className={`px-2.5 sm:px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
          isVladivostok
            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        3. Вид
      </Link>

      <Link
        href="/variants/living-view"
        className={`px-2.5 sm:px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
          isLiving
            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        4. WebGL
      </Link>

      <Link
        href="/variants/architecture-of-light"
        className={`px-2.5 sm:px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
          isArch
            ? 'bg-gradient-to-r from-amber-200 via-cyan-300 to-blue-400 text-slate-950 shadow-md shadow-cyan-400/30 font-bold'
            : 'text-amber-200 hover:text-white hover:bg-white/10'
        }`}
      >
        ✨ 5. Архитектура света
      </Link>
    </aside>
  );
}
