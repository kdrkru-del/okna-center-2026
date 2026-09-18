import React from "react";
import { MapPin, Navigation, Truck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export default function GeographySection() {
  return (
    <section className="py-20 bg-[#080E17] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>География работы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Работаем во Владивостоке и по всему Приморью
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Собственные офисы и монтажные службы во Владивостоке и Уссурийске, регулярные выезды в пригороды и отправка по ДФО
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {COMPANY_INFO.offices.map((office) => (
            <div
              key={office.city}
              className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">{office.city}</span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                    {office.isMain ? "Главный офис" : "Филиал"}
                  </span>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">График: {office.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`tel:${office.phoneRaw}`}
                  className="text-base font-bold text-cyan-300 font-mono hover:underline"
                >
                  {office.phone}
                </a>
                <a
                  href="/contacts"
                  className="text-xs uppercase font-mono text-slate-300 hover:text-white"
                >
                  Схема проезда →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
            <Truck className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <span className="font-semibold text-white block">Доставка и монтаж по Приморскому краю:</span>
              <span className="text-slate-400">Владивосток, Уссурийск, Артем, Надеждинск, Находка, Большой Камень. Отправка окон на Сахалин, Камчатку, Магадан, Чукотку.</span>
            </div>
          </div>
          <a
            href="/zaiavka_na_uslughi_kompanii_oknatsientr"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap hover:bg-cyan-400 transition-colors"
          >
            Заказать доставку
          </a>
        </div>
      </div>
    </section>
  );
}
