import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { POPULAR_SOLUTIONS } from "@/data/home";
import { asset } from "@/lib/assetPath";

export default function PopularSolutions() {
  return (
    <section id="popular" className="py-20 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Популярные решения для квартир и домов
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-md leading-relaxed">
            Типовые конфигурации пластиковых окон, балконных блоков и остекления для домов 83-й, 125-й серий, хрущевок и новостроек Владивостока.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_SOLUTIONS.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                item.isFeatured
                  ? "bg-gradient-to-b from-cyan-50/40 via-white to-white border-2 border-cyan-500/60 shadow-lg shadow-cyan-900/5 ring-1 ring-cyan-400/30"
                  : "bg-white border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300"
              }`}
            >
              <div>
                {/* Product Image */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden group">
                  <Image
                    src={asset(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase shadow-xs ${
                        item.isFeatured
                          ? "bg-cyan-600 text-white"
                          : "bg-white/95 text-slate-900 backdrop-blur-md border border-slate-200"
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Price overlay on image bottom */}
                  <div className="absolute bottom-3 right-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-white font-mono font-bold text-sm sm:text-base border border-white/20">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-slate-950 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-800 uppercase tracking-wide mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-4">
                <Link
                  href={item.href}
                  className="text-xs font-semibold text-slate-700 hover:text-cyan-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    item.isFeatured
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm"
                      : "bg-slate-950 hover:bg-cyan-600 text-white shadow-sm"
                  }`}
                >
                  Заказать расчет
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Note under popular solutions */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-center max-w-2xl mx-auto text-xs text-slate-600">
          Нужны окна по вашим точным размерам? Изготовим любые одностворчатые, двустворчатые и фигурные рамы на собственном производстве за 3–5 дней.
        </div>

      </div>
    </section>
  );
}
