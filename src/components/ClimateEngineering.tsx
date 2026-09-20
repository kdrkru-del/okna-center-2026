"use client";

import React from "react";
import Link from "next/link";
import { Wind, Droplets, ShieldCheck, SunMedium, ArrowRight, Gauge, Layers, Cpu } from "lucide-react";

export default function ClimateEngineering() {
  const specs = [
    {
      icon: Wind,
      title: "Штормовая устойчивость до 38 м/с",
      subtitle: "Экстремальные ветровые нагрузки",
      desc: "Осенние тайфуны во Владивостоке создают колоссальное давление на остекление высоток и береговой линии. Мы используем замкнутое оцинкованное армирование 2.0 мм, исключающее прогиб профиля и продувание створок.",
      badge: "Класс А по ГОСТ 23166",
    },
    {
      icon: Droplets,
      title: "Защита от 100% влажности и соли",
      subtitle: "Антикоррозийное напыление Roto Sil Nano",
      desc: "Солёный морской туман и косые ливни разрушают обычную дешёвую фурнитуру за 2–3 года. Наша фурнитура обладает 5-м максимальным классом коррозионной стойкости по стандарту EN 1670.",
      badge: "Класс коррозии 5 (EN 1670)",
    },
    {
      icon: ShieldCheck,
      title: "Трёхслойный монтажный шов ГОСТ",
      subtitle: "Ленты illbruck и тёплый контур",
      desc: "Монтаж выполняется строго по ГОСТ 30971-2012: наружная паропроницаемая лента отводит влагу, полиуретановый сердечник держит мороз, а внутренняя пароизоляция защищает откосы от сырости и плесени.",
      badge: "ГОСТ 30971-2012",
    },
    {
      icon: SunMedium,
      title: "Климат-контроль ClimaGuard Solar",
      subtitle: "Отражение ультрафиолета и сохранение тепла",
      desc: "Мультифункциональное напыление наночастиц серебра отражает до 68% инфракрасного излучения летом (кондиционер работает меньше) и удерживает до 88% тепловой энергии внутри помещения зимой.",
      badge: "R₀ до 1.05 м²·°С/Вт",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200/90 relative overflow-hidden">
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Почему обычные окна <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                не выдерживают климат Приморья?
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            Владивосток — город штормов, 100% влажности и соленых морских туманов. Дешевые оконные решения начинают свистеть, течь и промерзать уже на вторую зиму. Мы проектируем конструкции с двукратным запасом прочности.
          </p>
        </div>

        {/* 4 Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-110 group-hover:bg-slate-950 group-hover:text-cyan-400 transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-2 text-xs font-mono font-semibold text-slate-800">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>Заводская гарантия по официальному договору</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Callout Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Нужен расчет конструкций под ветровые нагрузки вашего этажа?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Наш инженер бесплатно выполнит лазерный замер, рассчитает статическую нагрузку и подберет правильную формулу профиля и стеклопакета для вашей квартиры или дома.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0 w-full lg:w-auto">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md"
            >
              Вызвать инженера-конструктора
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
