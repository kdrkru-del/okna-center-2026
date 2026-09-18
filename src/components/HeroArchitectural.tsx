"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import HeroGrid from "@/components/HeroGrid";
import { CONTACTS } from "@/data/contact";
import { asset } from "@/lib/assetPath";

export default function HeroArchitectural() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Subtle, gentle translation (max 12-16px) to avoid dizziness
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 16, y: y * 16 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center bg-[#02050A] text-white pt-28 pb-16 overflow-hidden select-none"
    >
      <HeroGrid />

      {/* Volumetric Radial Ambient Light (moves slightly with cursor) */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Glass Panel Mask Reveal Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen">
        <div className="relative w-full max-w-7xl h-[70vh] rounded-3xl overflow-hidden">
          {/* Responsive architectural glazing hero backdrop */}
          <picture>
            <source
              type="image/avif"
              media="(max-width: 640px)"
              srcSet={asset("/images/hero/hero-architectural-480.avif")}
            />
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={asset("/images/hero/hero-architectural-480.webp")}
            />
            <source
              type="image/avif"
              media="(max-width: 1024px)"
              srcSet={asset("/images/hero/hero-architectural-768.avif")}
            />
            <source
              type="image/webp"
              media="(max-width: 1024px)"
              srcSet={asset("/images/hero/hero-architectural-768.webp")}
            />
            <source
              type="image/avif"
              srcSet={asset("/images/hero/hero-architectural-1222.avif")}
            />
            <source
              type="image/webp"
              srcSet={asset("/images/hero/hero-architectural-1222.webp")}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/legacy/Al2fspIs.jpg")}
              alt="Архитектурное панорамное остекление Владивосток"
              width={1222}
              height={686}
              fetchPriority="high"
              decoding="async"
              loading="eager"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02050A] via-[#02050A]/70 to-[#02050A]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-[#02050A]/80" />
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        <div className="max-w-4xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Архитектура света · Производство с 2004 года</span>
          </div>

          {/* Line by line text reveal H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-slate-50">
            <span className="block">
              Окна, балконы и
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-cyan-300 to-blue-400">
              архитектурное остекление
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:lg lg:text-xl font-light leading-relaxed mb-10 max-w-2xl">
            Собственное производство, надежная доставка и качественный монтаж конструкций во Владивостоке и Приморском крае.
            Профильные системы Funke, Rehau, KBE и долговечные алюминиевые фасады.
          </p>

          {/* Buttons CTA */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] transition-all transform active:scale-98 flex items-center gap-2"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ghalierieia_rabot"
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/10 backdrop-blur-md transition-all active:scale-98"
            >
              Посмотреть работы
            </Link>
          </div>

          {/* Trust points bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">С 2004 года</div>
              <div className="text-slate-400 mt-1 font-light">на рынке Приморья</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">Rehau / KBE</div>
              <div className="text-slate-400 mt-1 font-light">Funke, Deceuninck</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">Договор</div>
              <div className="text-slate-400 mt-1 font-light">гарантия на работы</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">Бесплатно</div>
              <div className="text-slate-400 mt-1 font-light">выезд на замер</div>
            </div>
          </div>

        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <a
        href="#statement"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition-colors pointer-events-auto"
      >
        <span>SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
      </a>
    </section>
  );
}
