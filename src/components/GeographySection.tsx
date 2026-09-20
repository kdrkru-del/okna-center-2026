import React from "react";
import { MapPin, Truck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export default function GeographySection() {
  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Работаем во Владивостоке и по всему Приморью
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light">
            Собственные офисы и монтажные службы во Владивостоке и Уссурийске, регулярные выезды в пригороды и отправка по ДФО
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {COMPANY_INFO.offices.map((office) => (
            <div
              key={office.city}
              className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-slate-900">{office.city}</span>
                  <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono font-semibold">
                    {office.isMain ? "Главный офис" : "Филиал"}
                  </span>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">График: {office.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${office.phoneRaw}`}
                  className="text-base font-bold text-slate-950 font-mono hover:text-cyan-600 transition-colors"
                >
                  {office.phone}
                </a>
                <a
                  href="/contacts"
                  className="text-xs uppercase font-mono text-slate-500 hover:text-slate-900 font-semibold transition-colors"
                >
                  Схема проезда →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600">
            <Truck className="w-6 h-6 text-cyan-600 flex-shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 block">Доставка и монтаж по Приморскому краю:</span>
              <span className="text-slate-500">Владивосток, Уссурийск, Артем, Надеждинск, Находка, Большой Камень. Отправка окон на Сахалин, Камчатку, Магадан, Чукотку.</span>
            </div>
          </div>
          <a
            href="/zaiavka_na_uslughi_kompanii_oknatsientr"
            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors shadow-sm"
          >
            Заказать доставку
          </a>
        </div>
      </div>
    </section>
  );
}
