"use client";

import React, { useState } from "react";
import { PRICE_CATEGORIES, PRICES_LIST, PriceItem } from "@/data/prices_catalog";
import { Search, Tag, Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingTable() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = PRICES_LIST.filter((item) => {
    const matchCat = selectedCat === "all" || item.category === selectedCat;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="prices" className="py-20 bg-[#080E17] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Прозрачный прайс-лист</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Стоимость окон, балконов и ремонта
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Честные цены напрямую от производителя. Без скрытых наценок. Итоговая смета фиксируется в договоре и не меняется.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {PRICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedCat === cat.id
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по услугам..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-cyan-400 outline-none"
            />
          </div>
        </div>

        {/* Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                item.isPopular
                  ? "bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-900/60 border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{item.name}</h3>
                  {item.isPopular && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-400 text-slate-950 font-bold">
                      Хит
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed font-light">{item.description}</p>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono tracking-tight">
                    {item.price}
                  </div>
                  {item.unit && <span className="text-[10px] text-slate-400 font-mono">/ {item.unit}</span>}
                </div>

                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Заказать
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          Все цены указаны в рублях с учетом стандартной комплектации. Окончательный расчет выполняется инженером на объекте с учетом точных размеров проемов и выбранной фурнитуры.
        </div>
      </div>
    </section>
  );
}
