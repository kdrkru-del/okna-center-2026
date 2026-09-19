"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, CheckCircle2, Sparkles, Shield, Eye, Layers } from "lucide-react";
import { asset } from "@/lib/assetPath";

const VIEWS = [
  {
    id: "penthouse",
    label: "Пентхаус у моря",
    tag: "Панорама в пол",
    image: "/images/hero/hero-daylight-penthouse.jpg",
  },
  {
    id: "villa",
    label: "Загородная вилла",
    tag: "Порталы HS",
    image: "/images/hero/hero-daylight-villa.jpg",
  },
  {
    id: "patio",
    label: "Терраса & Патио",
    tag: "Порог 0 мм",
    image: "/images/hero/hero-daylight-patio.jpg",
  },
];

const HOTSPOTS = [
  {
    id: "glass",
    title: "Стеклопакет Triplex ClimaGuard Solar",
    tag: "Климат-контроль",
    desc: "Мультифункциональное стекло 44–52 мм с ионами серебра. Отражает 68% солнечного жара летом и сохраняет до 88% тепла зимой.",
    posDesktop: { top: "28%", left: "54%" },
  },
  {
    id: "threshold",
    title: "Бесшовный порог Zero-Threshold 0 мм",
    tag: "Безбарьерный пол",
    desc: "Утопленный в пол скрытый направляющий рельс. Пол гостиной бесшовно переходит в террасу без ступеней и спотыканий.",
    posDesktop: { top: "72%", left: "62%" },
  },
  {
    id: "frame",
    title: "Штормовое армирование Titan 2.0 мм",
    tag: "Тайфун-тест 38 м/с",
    desc: "Замкнутый контур из оцинкованной легированной стали. Выдерживает штормовые ветра Японского моря без прогиба рам.",
    posDesktop: { top: "42%", left: "82%" },
  },
];

export default function HeroArchitectural() {
  const [activeView, setActiveView] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentView = VIEWS[activeView];

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center overflow-hidden pt-28 pb-16">
      
      {/* 1. CRYSTAL-CLEAR FULLSCREEN PHOTOGRAPHY (NO MILKY OVERLAY) */}
      <div className="absolute inset-0 z-0 select-none">
        {VIEWS.map((view, idx) => (
          <div
            key={view.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              activeView === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={asset(view.image)}
              alt={view.label}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center transform transition-transform duration-1000"
            />
          </div>
        ))}

        {/* Minimalist localized vignette only behind text to ensure readability without dimming the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* 2. ATMOSPHERE / PROJECT SELECTOR (TOP RIGHT) */}
      <div className="absolute top-28 right-4 sm:right-8 z-30 hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold px-2">Проект:</span>
        {VIEWS.map((view, idx) => (
          <button
            key={view.id}
            onClick={() => setActiveView(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === idx
                ? "bg-slate-950 text-white shadow-sm font-semibold"
                : "text-slate-700 hover:bg-white/60 hover:text-slate-950"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* 3. INTERACTIVE HOTSPOTS ON THE WINDOW (DESKTOP) */}
      <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
        {HOTSPOTS.map((spot) => {
          const isOpened = activeHotspot === spot.id;
          return (
            <div
              key={spot.id}
              style={{ top: spot.posDesktop.top, left: spot.posDesktop.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <div className="relative group">
                {/* Pulsing Hotspot Target Button */}
                <button
                  onClick={() => setActiveHotspot(isOpened ? null : spot.id)}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  className="relative w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-slate-950 border border-slate-300 shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group"
                  aria-label={spot.title}
                >
                  <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                  <Sparkles className="w-4 h-4 text-cyan-600 relative z-10 transition-transform group-hover:rotate-45" />
                </button>

                {/* Hotspot Floating Info Card */}
                {isOpened && (
                  <div
                    onMouseLeave={() => setActiveHotspot(null)}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.2)] text-left animate-in fade-in zoom-in-95 duration-200 z-50"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 font-bold block mb-1">
                      {spot.tag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-950 leading-tight mb-1.5">
                      {spot.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. FLOATING ARCHITECTURAL PAVILION (LUXURY SEMI-TRANSPARENT FROSTED GLASS CONSOLE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-xl lg:max-w-2xl p-7 sm:p-10 lg:p-12 rounded-3xl bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.14)] ring-1 ring-white/50 transition-colors duration-500 animate-in fade-in slide-in-from-bottom-3">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-slate-900 text-[11px] font-mono uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span className="font-bold text-slate-950">Архитектурное остекление</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-700">Владивосток с 2004 г.</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-950 mb-5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Архитектура света <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-800">
              в вашем доме
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-slate-800 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            Проектирование и собственное производство панорамных порталов в пол, энергоэффективных окон Rehau и Schüco, тёплых лоджий под ключ. Рассчитано на экстремальные ветровые нагрузки Приморья до 38 м/с.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-7 py-4 bg-slate-950 hover:bg-cyan-700 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-cyan-600/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Заказать инженерный проект 0 ₽</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ghalierieia_rabot"
              className="px-6 py-4 rounded-2xl bg-white/70 hover:bg-white text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/90 shadow-sm backdrop-blur-md transition-all cursor-pointer"
            >
              Галерея 100+ объектов
            </Link>
          </div>

          {/* Technical Specs Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-900/10">
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-950 font-mono">20+ лет</div>
              <div className="text-[11px] text-slate-700 font-medium">опыт в Приморье</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-950 font-mono">до 10 лет</div>
              <div className="text-[11px] text-slate-700 font-medium">гарантия по договору</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-cyan-800 font-mono">38 м/с</div>
              <div className="text-[11px] text-slate-700 font-medium">тайфун-контроль</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-950 font-mono">0 ₽</div>
              <div className="text-[11px] text-slate-700 font-medium">лазерный 3D-замер</div>
            </div>
          </div>

        </div>

        {/* Mobile Hotspots Strip (visible on mobile only) */}
        <div className="lg:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className="flex-shrink-0 p-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-md text-xs max-w-[240px]"
            >
              <span className="text-[9px] font-mono uppercase text-cyan-700 font-bold block mb-0.5">{spot.tag}</span>
              <div className="font-bold text-slate-900 text-xs mb-1">{spot.title}</div>
              <p className="text-[11px] text-slate-600 font-light leading-snug">{spot.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#statement"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-600 hover:text-cyan-700 transition-colors"
      >
        <span>Листать вниз</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-slate-500" />
      </a>
    </section>
  );
}
