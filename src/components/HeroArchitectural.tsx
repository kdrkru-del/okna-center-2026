"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, Ruler, Phone, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { asset } from "@/lib/assetPath";
import { COMPANY_INFO } from "@/data/company_info";

const QUICK_LINKS = [
  { label: "Пластиковые окна", href: "/kupit_plastikovye_okna_vladivostok" },
  { label: "С установкой", href: "/ustanovka_plastikovykh_okon_vo_vladivostokie" },
  { label: "Балконы и лоджии", href: "/osteklenie_balkona_vladivostok" },
  { label: "Ремонт окон", href: "/remont_plastikovyh_okon_vladivostok" },
];

export default function HeroArchitectural() {
  return (
    <section className="relative min-h-[92dvh] sm:min-h-[100dvh] w-full flex items-center overflow-hidden pt-28 pb-14 sm:pb-20">
      {/* 1. PHOTOREALISTIC APARTMENT WINDOW HERO BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={asset("/images/hero/hero-window-vladivostok.jpg")}
          alt="Пластиковые окна во Владивостоке от производителя Окна Центр"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_35%]"
        />

        {/* Soft daylight gradient to ensure clean readability across devices */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:via-white/70 sm:to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
      </div>

      {/* 2. MAIN HERO CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-2xl lg:max-w-2xl p-6 sm:p-10 lg:p-12 rounded-3xl bg-white/75 sm:bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5">
          
          {/* Trust badge line */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50/90 border border-cyan-200/80 text-cyan-900 text-xs font-semibold mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span>Работаем во Владивостоке и Приморье с 2004 года</span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-950 mb-4">
            Пластиковые окна <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-cyan-900 to-cyan-700">
              во Владивостоке
            </span>
          </h1>

          {/* Core Subtitle for Mass Demand */}
          <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-normal">
            С установкой и без. Для квартир, частных домов, балконов и лоджий. Собственное производство, надежные профили Rehau, KBE и Funke, доставка и профессиональный монтаж по ГОСТ.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <a
              href="#calculator"
              className="px-7 py-4 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-slate-950/15 hover:shadow-cyan-600/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Рассчитать стоимость окна</span>
            </a>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ruler className="w-4 h-4 text-cyan-600" />
              <span>Вызвать замерщика 0 ₽</span>
            </Link>

            {/* Mobile quick call button */}
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="sm:hidden px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200"
            >
              <Phone className="w-4 h-4 text-cyan-700" />
              <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
            </a>
          </div>

          {/* Price jump link */}
          <div className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <span>Хотите сразу узнать ориентир цен?</span>
            <a
              href="#prices"
              className="text-cyan-700 hover:text-cyan-800 font-semibold inline-flex items-center gap-1 underline underline-offset-4 decoration-cyan-400"
            >
              <span>Смотреть цены</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Service Links Strip */}
          <div className="pt-6 border-t border-slate-200/80">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2.5">
              Быстрый переход к услугам:
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-800 text-xs font-semibold transition-all border border-slate-200/80 hover:border-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-200/80">
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-950 font-mono">20+ лет</div>
              <div className="text-[11px] text-slate-600 font-medium">опыт с 2004 года</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-950 font-mono">0 ₽</div>
              <div className="text-[11px] text-slate-600 font-medium">бесплатный замер</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-cyan-700 font-mono">от 3 дней</div>
              <div className="text-[11px] text-slate-600 font-medium">срок изготовления</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-950 font-mono">5 лет</div>
              <div className="text-[11px] text-slate-600 font-medium">гарантия по договору</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
