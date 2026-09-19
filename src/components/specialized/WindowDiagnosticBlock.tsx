"use client";
import React, { useState } from "react";
import { Wrench, AlertTriangle, CheckCircle2, Phone } from "lucide-react";

interface Symptom {
  id: string;
  iconText: string;
  title: string;
  description: string;
  cause: string;
  solution: string;
  recommendedService: string;
  priceEstimate: string;
  urgency: "Срочно" | "Планово" | "Критично";
}

const SYMPTOMS: Symptom[] = [
  {
    id: "draft",
    iconText: "💨",
    title: "Продувает из-под створки или подоконника",
    description: "Холодный воздух проникает в комнату, слышен свист ветра, скапливается пыль на подоконнике.",
    cause: "Усыхание или износ уплотнительной резины, ослабление прижима цапф фурнитуры, нарушение герметичности монтажного шва.",
    solution: "Точная регулировка геометрии и прижима створки, замена изношенного контура уплотнителя на эластичный немецкий Schlegel Q-Lon.",
    recommendedService: "Регулировка створки и замена уплотнителя",
    priceEstimate: "Регулировка от 300 ₽, уплотнитель от 250 ₽/м",
    urgency: "Планово"
  },
  {
    id: "sagging",
    iconText: "📐",
    title: "Створка провисла и задевает раму при закрывании",
    description: "Створка трет нижнюю планку рамы, приходится приподнимать рукой за ручку, чтобы закрыть окно.",
    cause: "Провисание тяжелого стеклопакета под собственным весом, смещение регулировочных винтов петлевой группы.",
    solution: "Диагональное расклинивание стеклопакета пластиковыми мостами («выравнивание геометрии») и регулировка шестигранным ключом.",
    recommendedService: "Исправление геометрии створки",
    priceEstimate: "от 500 ₽ за створку",
    urgency: "Планово"
  },
  {
    id: "handle-jammed",
    iconText: "🔒",
    title: "Ручка туго поворачивается или заклинила",
    description: "Ручка застряла в промежуточном положении, невозможно повернуть вертикально или закрыть створку.",
    cause: "Срабатывание блокиратора ошибочного действия, скопление строительной пыли или полное высыхание смазки в механизмах Roto/Maco.",
    solution: "Разблокировка створки, очистка фурнитурной обвязки от грязи, регулировка ножниц и нанесение специализированной тефлоновой смазки.",
    recommendedService: "Чистка, смазка и переборка фурнитуры",
    priceEstimate: "от 350 ₽",
    urgency: "Срочно"
  },
  {
    id: "handle-spinning",
    iconText: "🔄",
    title: "Ручка прокручивается вхолостую на 360°",
    description: "Ручка свободно крутится во все стороны, но створка остается закрытой либо заблокированной в откинутом режиме.",
    cause: "Сломан четырехгранный металлический штифт оконной ручки или разрушился передаточный редуктор основного замка (запора).",
    solution: "Вскрытие створки мастером без повреждения пластика, замена ручки или установка нового редуктора основного запора.",
    recommendedService: "Замена ручки / ремонт запора",
    priceEstimate: "Ручка от 450 ₽, замена замка от 1 500 ₽",
    urgency: "Критично"
  },
  {
    id: "broken-glass",
    iconText: "⚡",
    title: "Треснул или разбился стеклопакет",
    description: "Трещина через одно или оба стекла, сквозное отверстие, потеря герметичности камеры.",
    cause: "Механическое повреждение, термошок (перепад температур на солнце при темных шторах) или деформация проема дома.",
    solution: "Лазерный замер точных габаритов (до миллиметра) и формулы стеклопакета, срочное производство в цехе и замена со штапиками.",
    recommendedService: "Изготовление и замена стеклопакета",
    priceEstimate: "от 3 800 ₽ с доставкой и установкой",
    urgency: "Критично"
  },
  {
    id: "fogging",
    iconText: "💧",
    title: "Запотевание внутри стеклопакета / конденсат",
    description: "Капли влаги и разводы находятся МЕЖДУ стеклами внутри запаянного блока, протереть тряпкой невозможно.",
    cause: "Разгерметизация дистанционной рамки и бутилового слоя, выработка адсорбента (молекулярного сита).",
    solution: "Стеклопакет не подлежит локальному ремонту — требуется полная замена герметичного блока на новый энергосберегающий.",
    recommendedService: "Замена разгерметизированного стеклопакета",
    priceEstimate: "от 3 800 ₽",
    urgency: "Планово"
  }
];

export default function WindowDiagnosticBlock() {
  const [activeId, setActiveId] = useState<string>("draft");
  const current = SYMPTOMS.find((s) => s.id === activeId) || SYMPTOMS[0];

  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-wider mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Интерактивная диагностика поломок</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Определите неисправность окна за 1 минуту
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Выберите симптом, с которым вы столкнулись. Наш алгоритм покажет причину, точный способ устранения и цену по прайсу.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 block font-mono">Срочный выезд мастера:</span>
          <span className="text-cyan-700 font-mono font-bold text-sm">во все районы Владивостока</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {SYMPTOMS.map((sym) => (
          <button
            key={sym.id}
            onClick={() => setActiveId(sym.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 cursor-pointer ${
              activeId === sym.id
                ? "bg-slate-950 border-slate-950 shadow-md scale-[1.02]"
                : "bg-white border-slate-200/80 hover:bg-slate-100 text-slate-800"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl">{sym.iconText}</span>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                  sym.urgency === "Критично"
                    ? "bg-rose-100 text-rose-800"
                    : sym.urgency === "Срочно"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-cyan-100 text-cyan-800"
                }`}
              >
                {sym.urgency}
              </span>
            </div>
            <span className={`text-xs font-medium line-clamp-2 leading-tight ${activeId === sym.id ? "text-white" : "text-slate-900"}`}>
              {sym.title}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{current.iconText}</span>
              <div>
                <h4 className="text-xl font-bold text-slate-900">{current.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{current.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/70">
                <div className="flex items-center gap-2 text-rose-700 text-xs font-mono uppercase tracking-wider mb-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Вероятная причина</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{current.cause}</p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/70">
                <div className="flex items-center gap-2 text-cyan-800 text-xs font-mono uppercase tracking-wider mb-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Способ устранения</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{current.solution}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                Рекомендуемая услуга
              </span>
              <span className="text-sm font-bold text-slate-900 block mb-3 leading-snug">
                {current.recommendedService}
              </span>

              <div className="p-3 rounded-lg bg-white border border-slate-200 mb-4 shadow-xs">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Прайс мастера:</span>
                <span className="text-lg font-bold text-slate-900 font-mono">{current.priceEstimate}</span>
              </div>
            </div>

            <a
              href="https://wa.me/79940100300?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9D%D1%83%D0%B6%D0%B5%D0%BD%20%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%20%D0%BE%D0%BA%D0%BE%D0%BD%2C%20%D0%BD%D1%83%D0%B6%D0%BD%D0%B0%20%D0%B4%D0%B8%D0%B0%D0%B3%D0%BD%D0%BE%D1%81%D1%82%D0%B8%D0%BA%D0%B0."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Вызвать мастера по WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}