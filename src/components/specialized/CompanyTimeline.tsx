"use client";

import React from "react";
import { ShieldCheck, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

interface FactItem {
  title: string;
  desc: string;
  badge: string;
}

const VERIFIED_FACTS: FactItem[] = [
  {
    title: "Работаем с 2004 года",
    desc: "Более двух десятилетий компания «Окна Центр» занимается остеклением квартир, домов, балконов и лоджий во Владивостоке, Уссурийске и Приморском крае.",
    badge: "Подтвержденный опыт"
  },
  {
    title: "Собственное производство и склад",
    desc: "Изготовление конструкций из сертифицированных профильных систем Rehau, KBE, Funke с оригинальной фурнитурой ROTO. Продажа готовых окон со склада и изготовление под заказ.",
    badge: "Заводские условия"
  },
  {
    title: "Официальный договор и гарантия",
    desc: "На все поставляемые оконные конструкции и выполненные монтажные работы подписывается официальный договор с предоставлением гарантии.",
    badge: "Юридическая чистота"
  },
  {
    title: "Бесплатный выезд на замер",
    desc: "Выезд мастера-замерщика по Владивостоку и Уссурийску предоставляется бесплатно для точного расчета сметы перед заключением договора.",
    badge: "Точный расчет"
  }
];

export default function CompanyTimeline() {
  return (
    <div className="rounded-3xl bg-[#070D18] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>О компании · Подтвержденные факты</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            О компании «Окна Центр»
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            С 2004 года обеспечиваем жителей Приморского края качественными окнами, остеклением балконов и профессиональным монтажом.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            {COMPANY_INFO.legalName}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {VERIFIED_FACTS.map((f, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#03060B] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase tracking-wider inline-block mb-3">
                {f.badge}
              </span>
              <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0A111E] rounded-2xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-300">
            <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Владивосток:</span>
              <span>Офис и замерная служба</span>
              <span className="block text-[11px] text-cyan-400/80">Перед визитом уточните адрес по телефону</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-300">
            <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Уссурийск:</span>
              <span>Филиал и монтажная служба</span>
              <span className="block text-[11px] text-cyan-400/80">Перед визитом уточните адрес по телефону</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Условия работы:</span>
              <span>Официальный договор, гарантия на выполненные работы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}