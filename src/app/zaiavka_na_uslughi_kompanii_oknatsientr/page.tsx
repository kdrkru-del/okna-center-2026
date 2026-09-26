import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, CheckCircle2, MapPin, Phone, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import SimpleMeasurementForm from "@/components/SimpleMeasurementForm";

export const metadata: Metadata = {
  title: "Онлайн-заявка на замер и расчет стоимости — компания «Окна Центр» Владивосток",
  description: "Оставьте заявку на бесплатный выезд замерщика пластиковых окон, балкона или лоджии во Владивостоке и Уссурийске. Скидка при онлайн-заявке, бесплатная консультация мастера.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/zaiavka_na_uslughi_kompanii_oknatsientr/`,
  },
  openGraph: {
    title: "Онлайн-заявка на замер — «Окна Центр»",
    description: "Бесплатный выезд инженера-замерщика по Владивостоку и Уссурийску. Официальный договор и гарантия.",
    url: `${COMPANY_INFO.domain}/zaiavka_na_uslughi_kompanii_oknatsientr/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function ZaiavkaPage() {
  return (
    <div className="bg-slate-50/50 text-slate-900 min-h-screen pt-24 pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Вызов замерщика</span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-4">
                <span>0 ₽ выезд по Владивостоку и краю</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                Заявка на бесплатный замер и расчет
              </h1>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mt-4">
                Наш инженер приедет в удобное для вас время с каталогами оригинальных профилей Rehau, KBE, Funke, образцами ламинации и фурнитуры. Точный лазерный замер исключает ошибки при производстве.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Ответ за 15 мин</span>
                  <span className="text-slate-500">Перезвоним сразу</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">0 ₽ выезд</span>
                  <span className="text-slate-500">Без обязательств</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Фиксация цены</span>
                  <span className="text-slate-500">В договоре по ГОСТ</span>
                </div>
              </div>
            </div>

            {/* Verified Office Addresses */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span>Офисы компании «Окна Центр»</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-bold text-cyan-800 block mb-1">Офис Владивосток</span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    г. Владивосток, ул. Ильичева, д. 29, оф. 8
                  </p>
                  <a
                    href="tel:+74232725725"
                    className="text-xs font-bold text-slate-900 hover:text-cyan-700 block mt-2"
                  >
                    8 (423) 2-725-725
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-bold text-cyan-800 block mb-1">Офис Уссурийск</span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    г. Уссурийск, ул. Кирова, д. 12, оф. 202
                  </p>
                  <a
                    href="tel:+79502800300"
                    className="text-xs font-bold text-slate-900 hover:text-cyan-700 block mt-2"
                  >
                    8 (950) 2-800-300
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Пн–Сб: 9:00 – 18:00
                </span>
                <a
                  href="https://wa.me/79940100300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp: +7 994 010-03-00
                </a>
              </div>
            </div>
          </div>

          {/* Right form column: Simple 2 fields, no scrolling needed! */}
          <div className="lg:col-span-5">
            <SimpleMeasurementForm initialService="Вызов замерщика" source="zaiavka_direct_page" />
          </div>

        </div>
      </section>
    </div>
  );
}
