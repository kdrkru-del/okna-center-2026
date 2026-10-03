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
];

export default function HeroArchitectural() {
  const { openMeasurementModal } = useMeasurementModal();

  return (
    <section className="relative min-h-[90dvh] lg:min-h-screen w-full flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-20 pb-8 sm:pb-12">
      {/* 1. CRYSTAL-CLEAR APARTMENT WINDOW WITH COZY LIVING ROOM INTERIOR & BAY VIEW */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={asset("/images/hero/hero-apartment-window-interior.jpg")}
          alt="Пластиковые окна в квартиру — Окна Центр"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_center]"
        />
      </div>

      {/* 2. TRANSLUCENT FROSTED GLASS CARD / ПОЛУПРОЗРАЧНАЯ ПЛАШКА */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-xl lg:max-w-[540px] p-5 sm:p-6 lg:p-7 rounded-3xl bg-white/50 sm:bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.22)] ring-1 ring-white/50">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-2.5 shadow-2xs backdrop-blur-xs">
            <span>Собственный завод · С 2004 года</span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold tracking-tight leading-[1.18] text-slate-950 mb-3 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            Тёплые пластиковые окна <br />
            <span className="text-slate-950">
              и балконы от производителя
            </span>
          </h1>

          {/* Core Subtitle for Mass Demand */}
          <p className="text-slate-800 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed mb-4 font-normal drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
            Изготавливаем за 4–7 рабочих дней в собственном цеху. Установим под ключ по ГОСТу с гарантией 5 лет или аккуратно доставим готовые окна без монтажа по Приморью и всему Дальнему Востоку. Старый мусор вывозим сами.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 mb-3.5">
            <button
              type="button"
              onClick={() => openMeasurementModal("Пластиковые окна")}
              className="px-5 py-2.5 sm:py-3 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs sm:text-[13px] tracking-wide shadow-lg shadow-slate-950/20 hover:shadow-cyan-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Вызвать мастера на замер 0 ₽</span>
            </button>

            <Link
              href="/ceny"
              className="px-5 py-2.5 sm:py-3 rounded-xl bg-white/85 hover:bg-white text-slate-950 font-bold text-xs sm:text-[13px] tracking-wide border border-white/90 shadow-sm backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Смотреть цены и размеры →</span>
            </Link>

            {/* Mobile quick call button */}
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="sm:hidden px-4 py-2 rounded-xl bg-white/85 text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 border border-white/90 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-700" />
              <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
            </a>
          </div>

          {/* Quick Service Links Strip */}
          <div className="pt-3 border-t border-slate-950/15 mb-3">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide block mb-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Быстрый переход к услугам:
            </span>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {QUICK_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/75 hover:bg-white text-slate-950 text-[10px] sm:text-xs font-semibold transition-all border border-white/80 shadow-2xs backdrop-blur-xs text-center flex items-center justify-center leading-tight"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-950/15">
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">0 ₽ везде</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">выезд мастера на замер</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-cyan-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">4–7 дней</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">срок сборки в цеху</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">5 лет</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">гарантия по договору</div>
            </div>
            <div>
              <div className="text-base sm:text-lg xl:text-xl font-extrabold text-slate-950 font-heading drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-tight">Вывоз мусора</div>
              <div className="text-[10px] sm:text-[11px] text-slate-800 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">чистота после монтажа</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
