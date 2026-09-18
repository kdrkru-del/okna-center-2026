import React from "react";
import Link from "next/link";
import { Tag, ArrowRight, HelpCircle } from "lucide-react";
import { ALL_PRICES, PriceItem } from "@/data/prices";

export default function PricingPreview() {
  const featured = ALL_PRICES.filter((p) => p.isPopular).slice(0, 6);

  return (
    <section id="prices" className="py-24 bg-[#03060B] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Tag className="w-3 h-3" />
              <span>Ориентиры по стоимости</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Прозрачные ориентиры цен
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Точная стоимость зависит от точных габаритов проема, марки профиля (Rehau / KBE / Funke), формулы стеклопакета и сложности монтажа.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((item: PriceItem) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
                    {item.priceFrom}
                  </span>
                  {item.unit && (
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      / {item.unit}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  {item.note || "Монтаж по ГОСТ с гарантией по договору."}
                </p>

                {item.needsReview && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 mb-4 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{item.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={item.sourcePage || "/zaiavka_na_uslughi_kompanii_oknatsientr"}
                  className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Записаться на замер
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          Все цены приведены на основе прайс-листа компании «Окна Центр». Финальный расчет выполняется инженером на объекте с выдачей официальной сметы и фиксацией в договоре.
        </div>

      </div>
    </section>
  );
}
