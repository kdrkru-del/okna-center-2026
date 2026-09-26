"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, Ruler, Phone } from "lucide-react";
import { asset } from "@/lib/assetPath";
import { COMPANY_INFO } from "@/data/company_info";
import { useMeasurementModal } from "@/context/ModalContext";

const QUICK_LINKS = [
  { label: "Пластиковые окна", href: "/kupit_plastikovye_okna_vladivostok" },
  { label: "С установкой", href: "/ustanovka_plastikovykh_okon_vo_vladivostokie" },
  { label: "Балконы и лоджии", href: "/osteklenie_balkona_vladivostok" },
  { label: "Ремонт окон", href: "/remont_plastikovyh_okon_vladivostok" },
];

export default function HeroArchitectural() {
  const { openMeasurementModal } = useMeasurementModal();

  return (
    <section className="relative min-h-[90dvh] lg:min-h-screen w-full flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-20 pb-8 sm:pb-12">
      {/* 1. CRYSTAL-CLEAR APARTMENT WINDOW WITH COZY LIVING ROOM INTERIOR & BAY VIEW */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={asset("/images/hero/hero-apartment-window-interior.jpg")}
          alt="Пластиковые окна в квартиру во Владивостоке — Окна Центр"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_center]"
        />
      </div>

      {/* 2. TRANSLUCENT FROSTED GLASS CARD / ПОЛУПРОЗРАЧНАЯ ПЛАШКА */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-xl lg:max-w-[540px] p-5 sm:p-6 lg:p-7 rounded-3xl bg-white/50 sm:bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.22)] ring-1 ring-white/50">

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold tracking-tight leading-[1.18] text-slate-950 mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Пластиковые окна <br />
            <span className="text-slate-950">
              с установкой и без под ключ
            </span>
          </h1>

          {/* Core Subtitle for Mass Demand */}
          <p className="text-slate-800 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed mb-4 font-normal drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
            Собственное производство с 2004 года, фирменные офисы во Владивостоке и Уссурийске, бесплатный выезд мастера на замер и монтаж по ГОСТу по всему Приморью.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 mb-3.5">
            <a
              href="#calculator"
              className="px-5 py-2.5 sm:py-3 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs sm:text-[13px] tracking-wide shadow-lg shadow-slate-950/20 hover:shadow-cyan-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Рассчитать стоимость</span>
            </a>

            <button
              type="button"
              onClick={() => openMeasurementModal("Пластиковые окна")}
              className="px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 hover:bg-white text-slate-950 font-bold text-xs sm:text-[13px] tracking-wide border border-white/90 shadow-sm backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Ruler className="w-4 h-4 text-cyan-700 shrink-0" />
              <span>Вызвать замерщика 0 ₽</span>
            </button>

            {/* Mobile quick call button */}
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="sm:hidden px-4 py-2 rounded-xl bg-white/85 text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 border border-white/90 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-700" />
              <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
            </a>
          </div>

          {/* Price jump link */}
          <div className="mb-3.5 flex items-center gap-2 text-xs sm:text-[13px] text-slate-900 font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            <span>Хотите сразу узнать ориентир цен?</span>
            <Link
              href="/ceny"
              className="text-cyan-900 hover:text-cyan-950 font-extrabold inline-flex items-center gap-1 underline underline-offset-4 decoration-cyan-600"
            >
              <span>Смотреть цены</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Service Links Strip */}
          <div className="pt-3 border-t border-slate-950/15 mb-3">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide block mb-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Быстрый переход к услугам:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {QUICK_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="px-3 py-1 rounded-lg bg-white/70 hover:bg-white text-slate-950 text-[11px] sm:text-xs font-semibold transition-all border border-white/80 shadow-2xs backdrop-blur-xs"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-950/15">
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">20+ лет</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">опыт с 2004 года</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">0 ₽</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">бесплатный замер</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-cyan-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">от 3 дней</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">срок производства</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">5 лет</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">гарантия по договору</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
