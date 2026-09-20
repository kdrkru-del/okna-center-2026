"use client";

import React from "react";
import Link from "next/link";
import { Wind, Droplets, ShieldCheck, SunMedium, ArrowRight, Layers, CheckCircle2 } from "lucide-react";

export default function ClimateEngineering() {
  const specs = [
    {
      icon: Wind,
      title: "Усиленное армирование профиля",
      subtitle: "Стойкость к приморским ветрам",
      desc: "Оконные рамы испытывают сильное ветровое давление на открытых сопках и верхних этажах Владивостока. Стальное оцинкованное армирование исключает деформацию профиля и появление щелей.",
      badge: "Защита от сквозняков",
    },
    {
      icon: Droplets,
      title: "Антикоррозийная фурнитура",
      subtitle: "Защита от влажности и морского тумана",
      desc: "Высокая влажность и соленый морской воздух быстро выводят из строя некачественную фурнитуру. Мы устанавливаем проверенные немецкие механизмы с многослойным защитным антикоррозийным покрытием.",
      badge: "Плавный ход створок",
    },
    {
      icon: ShieldCheck,
      title: "Трехслойный монтажный шов по ГОСТ",
      subtitle: "Защита от сырости и плесени",
      desc: "Правильный монтаж — 80% долговечности окна. Используем профессиональную зимнюю/всесезонную пену, влагозащитные и пароизоляционные ленты, сохраняющие монтажный шов сухим и теплым.",
      badge: "Монтаж по ГОСТ",
    },
    {
      icon: SunMedium,
      title: "Энергосберегающие стеклопакеты",
      subtitle: "Комфортный микроклимат круглый год",
      desc: "Специальное напыление на стекле отражает избыточное солнечное тепло летом и возвращает тепловое излучение от батарей обратно в комнату зимой, снижая затраты на обогрев.",
      badge: "Тепло и тишина",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Окна, проверенные <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-800">
                климатом Приморья
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-md leading-relaxed">
            Владивосток отличается сильными ветрами, высокой влажностью и перепадами температур. Мы подбираем профили, стеклопакеты и фурнитуру, рассчитанные на долгую службу в наших условиях.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-9 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-105 group-hover:bg-cyan-700 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-cyan-800 uppercase tracking-wide mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-2 text-xs font-mono font-semibold text-slate-800">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>Гарантия на монтаж и конструкции по договору</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Нужна консультация по остеклению в вашем доме?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-light">
              Бесплатно приедем на замер, оценим продуваемость и влажность проемов, подскажем лучший профиль и стеклопакет под ваш бюджет.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0 w-full lg:w-auto">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-cyan-500 hover:text-white text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md"
            >
              Вызвать мастера на замер 0 ₽
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
