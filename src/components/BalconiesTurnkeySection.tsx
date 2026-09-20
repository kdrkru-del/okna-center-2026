import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Hammer, Flame, Layers, Sparkles } from "lucide-react";
import { BALCONIES_TURNKEY_ITEMS } from "@/data/home";

const BALCONY_ICONS = [Layers, Shield, Flame, Hammer, Sparkles];

export default function BalconiesTurnkeySection() {
  return (
    <section id="balconies" className="py-20 sm:py-24 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            Балконы и лоджии под ключ
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Выполняем полный комплекс работ от одного подрядчика: от сварки и расширения плиты до теплого остекления, утепления стен и чистовой отделки.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {BALCONIES_TURNKEY_ITEMS.map((item, idx) => {
            const Icon = BALCONY_ICONS[idx % BALCONY_ICONS.length];
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-7 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-cyan-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-cyan-600 group-hover:text-white transition-all mb-6 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-cyan-700 group-hover:text-slate-950 transition-colors">
                  <span>Узнать подробнее</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* Action Card */}
          <div className="p-7 rounded-3xl bg-slate-950 text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-3">
                Бесплатный выезд мастера
              </span>
              <h3 className="text-xl font-bold mb-3">
                Точный замер и расчет сметы на объекте
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                Мастер оценит состояние балконной плиты, предложит варианты остекления и отделки, составит точную смету с фиксацией цены в договоре.
              </p>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-cyan-500 hover:text-white text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              Заказать замер балкона 0 ₽
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
