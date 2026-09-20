import React from "react";
import Link from "next/link";
import { Wrench, Phone, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { REPAIR_SERVICES_ITEMS } from "@/data/home";
import { COMPANY_INFO } from "@/data/company_info";

export default function WindowRepairCallout() {
  return (
    <section id="repair" className="py-20 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-4">
              Окно уже установлено, но работает плохо?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Не обязательно менять окно целиком, если из него дует или створка закрывается с усилием. Наша сервисная служба во Владивостоке быстро устранит дефекты и вернет окну герметичность.
            </p>
          </div>

          {/* 4 Repair Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {REPAIR_SERVICES_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-cyan-500/50 hover:bg-cyan-50/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <span className="text-xs font-mono font-bold text-cyan-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/remont_plastikovyh_okon_vladivostok"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all shadow-sm"
              >
                Все услуги по ремонту окон →
              </Link>

              <a
                href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <Phone className="w-4 h-4 text-cyan-700" />
                <span>{COMPANY_INFO.mainPhone}</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Написать мастеру в WhatsApp</span>
              </a>
            </div>

            <span className="text-xs text-slate-500 font-light">
              Мастер приедет с инструментом и комплектом запчастей
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
