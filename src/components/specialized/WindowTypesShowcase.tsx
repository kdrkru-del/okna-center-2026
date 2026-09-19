"use client";
import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assetPath";

interface WindowTypeItem {
  id: string;
  name: string;
  sizes: string;
  priceFrom: string;
  chambers: string;
  glassFormula: string;
  image: string;
  description: string;
  features: string[];
}

const WINDOW_TYPES: WindowTypeItem[] = [
  {
    id: "win-1",
    name: "Одностворчатое окно",
    sizes: "800 × 1200 мм",
    priceFrom: "от 14 000 ₽",
    chambers: "3 или 5 камер (Rehau / KBE / Funke)",
    glassFormula: "1-кам (24 мм) или 2-кам (32/40 мм)",
    image: "/images/legacy/full_6tXcBN5Z.png",
    description: "Компактное решение для кухни, санузла, дачи или коридора. Может быть глухим или поворотно-откидным с микропроветриванием.",
    features: [
      "Доступно со склада без монтажа от 14 000 ₽",
      "Фурнитура ROTO с защитой от захлопывания ветром",
      "Возможность ламинации под дерево (дуб, орех)"
    ]
  },
  {
    id: "win-2",
    name: "Двухстворчатое окно под ключ",
    sizes: "1300 × 1400 мм",
    priceFrom: "от 19 500 ₽",
    chambers: "5-камерная система 70 мм",
    glassFormula: "2-камерный энергосберегающий 40 мм с Low-E",
    image: "/images/legacy/54a23164a3970dd0f09d0e561ea53674.jpg",
    description: "Самая популярная конструкция для типовых панельных и кирпичных домов Владивостока. Одна глухая и одна поворотно-откидная створка.",
    features: [
      "Полный монтаж по ГОСТ с отделкой откосов от 19 500 ₽",
      "Глушит уличный шум магистралей до 36 дБ",
      "Подоконник и водоотлив входят в стоимость монтажа"
    ]
  },
  {
    id: "win-3",
    name: "Трехстворчатое окно",
    sizes: "2050 × 1400 мм",
    priceFrom: "По расчёту",
    chambers: "5-камерная система 70 мм",
    glassFormula: "2-камерный шумопоглощающий стеклопакет",
    image: "/images/bento/bento-rehau-windows.jpg",
    description: "Широкое остекление гостиных и залов с максимальным световым проемом. Две открывающиеся створки для удобного мытья стекол.",
    features: [
      "Усиленное стальное армирование 1.5 мм в раме и импостах",
      "Устойчивость к тайфунным ветрам залива Петра Великого",
      "Монтаж под ключ с гарантией по договору"
    ]
  },
  {
    id: "win-balcony-block",
    name: "Балконный блок (окно + дверь)",
    sizes: "Дверь 700×2100 + Окно 1400×1400 мм",
    priceFrom: "По расчёту",
    chambers: "5-камерный профиль ПВХ",
    glassFormula: "Энергосберегающий мультифункциональный блок",
    image: "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg",
    description: "Единый эргономичный выход на лоджию или балкон. Поворотно-откидная дверь с микропроветриванием и теплым сэндвич-порогом.",
    features: [
      "Многозапорный замок двери для плотного прижима контура",
      "Бесшумное открывание и защита от продувания порога",
      "Качественные ручки и накладки на петли в тон рамы"
    ]
  }
];

export default function WindowTypesShowcase() {
  const [selectedId, setSelectedId] = useState<string>("win-2");
  const current = WINDOW_TYPES.find((w) => w.id === selectedId) || WINDOW_TYPES[1];

  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Конфигуратор типоразмеров</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Популярные конфигурации окон для квартир и домов
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Изготавливаем на собственном производстве во Владивостоке окна любых габаритов и геометрии. Цены указаны с учетом базовой комплектации.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {WINDOW_TYPES.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedId(w.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedId === w.id
                  ? "bg-slate-950 text-white font-bold shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200">
          <Image
            src={asset(current.image)}
            alt={current.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-cyan-600 text-white font-bold font-mono text-xs">
              {current.sizes}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 font-mono text-xs font-bold border border-slate-200">
              {current.priceFrom}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-2xl font-bold text-slate-900">{current.name}</h4>
              <span className="text-xs font-mono text-cyan-700 font-semibold">{current.sizes}</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Камерность профиля:
                </span>
                <span className="text-slate-900 font-semibold">{current.chambers}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Формула стеклопакета:
                </span>
                <span className="text-slate-900 font-semibold">{current.glassFormula}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
                Комплектация и условия:
              </span>
              {current.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Ориентировочная стоимость:</span>
              <span className="text-2xl font-black text-slate-950 font-mono">{current.priceFrom}</span>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>Записаться на замер</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}