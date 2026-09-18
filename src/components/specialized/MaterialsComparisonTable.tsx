"use client";

import React, { useState } from "react";
import { Layers, ShieldCheck, Droplets, CheckCircle2 } from "lucide-react";

interface MaterialItem {
  id: string;
  name: string;
  category: "insulation" | "exterior" | "interior";
  categoryLabel: string;
  waterResistance: "Высокая" | "Средняя" | "Требует пароизоляции" | "Абсолютная (100% герметичность)" | "Для сухих утепленных помещений";
  appliedIn: string;
  keyFeatures: string[];
  description: string;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "isopink",
    name: "Изопинк (экструдированный пенополистирол)",
    category: "insulation",
    categoryLabel: "Утеплитель",
    waterResistance: "Высокая",
    appliedIn: "Утепление пола, парапета и потолка лоджий и балконов",
    keyFeatures: [
      "Закрытая ячеистая структура материала",
      "Устойчив к влажному приморскому климату",
      "Выдерживает высокие нагрузки на сжатие"
    ],
    description: "Экструдированный пенополистирол. Применяется для капитального утепления лоджий во Владивостоке, устойчив к сырости и не оседает со временем."
  },
  {
    id: "psbs",
    name: "Пенополистирол (ПСБС)",
    category: "insulation",
    categoryLabel: "Утеплитель",
    waterResistance: "Средняя",
    appliedIn: "Утепление парапета и боковых стен балконов",
    keyFeatures: [
      "Легкий вес, минимальная нагрузка на выносную конструкцию",
      "Эффективная защита от зимнего холода",
      "Доступная стоимость утепления"
    ],
    description: "Классический вспененный полистирол. Подходит для базового утепления балконов и парапетов без прямого контакта с уличной влагой."
  },
  {
    id: "minvata",
    name: "Минеральная вата (базальтовая)",
    category: "insulation",
    categoryLabel: "Утеплитель",
    waterResistance: "Требует пароизоляции",
    appliedIn: "Шумоизоляция перегородок и утепление стен",
    keyFeatures: [
      "Высокие звукоизоляционные свойства",
      "Негорючий материал из горных пород",
      "Монтируется с обязательным пароизоляционным слоем"
    ],
    description: "Волокнистый утеплитель на основе горных пород. Используется для снижения уличного шума и обеспечения пожарной безопасности."
  },
  {
    id: "hanyi",
    name: "Фасадные панели «Ханьи» (Hanyi)",
    category: "exterior",
    categoryLabel: "Наружная обшивка",
    waterResistance: "Абсолютная (100% герметичность)",
    appliedIn: "Наружная облицовка парапетов балконов и фасадов",
    keyFeatures: [
      "Стальной лист с алюмоцинковым покрытием и полимерной окраской",
      "Фактуры под кирпич, дикий камень и штукатурку",
      "Устойчивость к соленым морским ветрам и выгоранию на солнце"
    ],
    description: "Многослойные утепленные металлические панели для наружной отделки балконов. Защищают парапет от ветра и придают зданию современный облик."
  },
  {
    id: "siding",
    name: "Виниловый сайдинг",
    category: "exterior",
    categoryLabel: "Наружная обшивка",
    waterResistance: "Высокая",
    appliedIn: "Внешняя обшивка парапета балконов с выносом",
    keyFeatures: [
      "Ударопрочный поливинилхлоридный профиль",
      "Не ржавеет и не гниет в условиях влажности Владивостока",
      "Легкий материал, не утяжеляющий балконную плиту"
    ],
    description: "Популярный материал для наружной защиты балконов от осадков и продувания. Не требует окрашивания и прост в уходе."
  },
  {
    id: "mdf",
    name: "Стеновые панели МДФ",
    category: "interior",
    categoryLabel: "Внутренняя отделка",
    waterResistance: "Для сухих утепленных помещений",
    appliedIn: "Чистовая внутренняя отделка стен и потолка лоджий",
    keyFeatures: [
      "Декоративные текстуры под натуральное дерево",
      "Быстрый монтаж без мокрых штукатурных процессов",
      "Создает атмосферу жилой теплой комнаты"
    ],
    description: "Древесноволокнистые плиты с ламинированным декоративным покрытием. Оптимальны для отделки лоджий, переоборудованных в кабинет или зону отдыха."
  }
];

export default function MaterialsComparisonTable() {
  const [filter, setFilter] = useState<"all" | "insulation" | "exterior" | "interior">("all");
  const filtered = filter === "all" ? MATERIALS : MATERIALS.filter((m) => m.category === filter);

  return (
    <div className="rounded-3xl bg-[#070D18] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Материалы отделки и утепления</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Характеристики применяемых материалов
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Качественное сравнение теплоизоляционных и фасадных материалов, используемых компанией «Окна Центр» при остеклении и отделке балконов.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filter === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Все материалы
          </button>
          <button
            onClick={() => setFilter("insulation")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filter === "insulation" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Утеплители
          </button>
          <button
            onClick={() => setFilter("exterior")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filter === "exterior" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Наружная обшивка
          </button>
          <button
            onClick={() => setFilter("interior")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filter === "interior" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Внутренняя отделка
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="rounded-2xl bg-[#03060B] border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 uppercase tracking-wider border border-cyan-500/20">
                  {mat.categoryLabel}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {mat.name}
              </h4>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                {mat.description}
              </p>

              <div className="space-y-2 text-xs pt-4 border-t border-white/5 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    Влагостойкость:
                  </span>
                  <span className="text-white font-medium">{mat.waterResistance}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Ключевые особенности:
                </span>
                {mat.keyFeatures.map((kf, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{kf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300">
              <span className="font-semibold text-cyan-300 block mb-0.5">Применение:</span>
              <span>{mat.appliedIn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}