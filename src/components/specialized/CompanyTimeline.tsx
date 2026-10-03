"use client";

import React from "react";
import { ShieldCheck, Building2, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

interface FactItem {
  title: string;
  desc: string;
  badge: string;
}

const VERIFIED_FACTS: FactItem[] = [
  {
    title: "Работаем с 2004 года",
    desc: "Более двух десятилетий компания «Окна Центр» занимается остеклением квартир, домов, балконов и лоджий по всему Приморскому краю. Собственный цех и склад.",
    badge: "Опыт с 2004 г."
  },
  {
    title: "Сборка за 4–7 рабочих дней",
    desc: "Быстрый запуск в работу без посредников. Изготавливаем окна в собственном цеху за 4–7 рабочих дней, организуем доставку по Приморью и всему Дальнему Востоку.",
    badge: "Срок: 4–7 дней"
  },
  {
    title: "Гарантия 5 лет по договору",
    desc: "Официальный договор с фиксированной сметой. Цена не вырастет в процессе монтажа. Гарантия 5 лет на конструкции и монтажные швы.",
    badge: "Гарантия 5 лет"
  },
  {
    title: "Вывоз мусора и бесплатный замер",
    desc: "Выезд мастера на замер бесплатный везде по краю. После установки монтажная бригада упаковывает и вывозит старые рамы и весь мусор — квартира остаётся чистой.",
    badge: "Мусор вывозим сами"
  }
];

export default function CompanyTimeline() {
  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            О компании «Окна Центр»
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            С 2004 года обеспечиваем жителей Приморского края качественными окнами, остеклением балконов и профессиональным монтажом.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            {COMPANY_INFO.legalName}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {VERIFIED_FACTS.map((f, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase tracking-wider inline-block mb-3 font-semibold">
                {f.badge}
              </span>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-600">
            <Building2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Владивосток:</span>
              <span>ул. Ильичева, д. 29, оф. 8</span>
              <span className="block text-[11px] text-slate-500">Офис и замерная служба</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-600">
            <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Уссурийск:</span>
              <span>ул. Кирова, д. 12, оф. 202</span>
              <span className="block text-[11px] text-slate-500">Филиал и монтажная служба</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Условия работы:</span>
              <span>Официальный договор, гарантия на выполненные работы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}