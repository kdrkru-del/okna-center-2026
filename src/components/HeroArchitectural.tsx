"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { asset } from "@/lib/assetPath";

export default function HeroArchitectural() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden pt-24 pb-16">
      {/* Fullscreen High-Res Daylight Architectural Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={asset("/images/hero/hero-daylight-penthouse.jpg")}
          alt="Панорамное архитектурное остекление во Владивостоке — Окна Центр"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Soft, luminous architectural gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 md:via-white/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/40 z-10" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-12 md:py-20">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Luminous Brand Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm text-slate-800 text-xs font-mono uppercase tracking-wider mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-semibold text-slate-900">Архитектура Света</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600">Собственное производство с 2004 года</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-950 mb-6 drop-shadow-sm">
            Окна, балконы и <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-950">
              панорамное остекление
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
            Собственный сборочный цех во Владивостоке. Оригинальные профильные системы Rehau, KBE, Funke и тёплые раздвижные порталы. Точный бесплатный замер и официальный договор.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ghalierieia_rabot"
              className="px-8 py-4 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-300/80 backdrop-blur-md shadow-sm hover:shadow transition-all"
            >
              Смотреть 100+ работ
            </Link>
          </div>

          {/* Bottom Trust Indicators (Light Frosted Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-300/60">
            <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="text-lg sm:text-xl font-extrabold text-slate-950 font-mono">С 2004 года</div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">на рынке Приморья</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="text-lg sm:text-xl font-extrabold text-slate-950 font-mono">Rehau / KBE</div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">Funke, Deceuninck</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="text-lg sm:text-xl font-extrabold text-slate-950 font-mono">Договор</div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">гарантия на работы</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="text-lg sm:text-xl font-extrabold text-cyan-700 font-mono">Замер 0 ₽</div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">Владивосток и край</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#statement"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-600 hover:text-cyan-700 transition-colors"
      >
        <span>Вниз</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-slate-500" />
      </a>
    </section>
  );
}
