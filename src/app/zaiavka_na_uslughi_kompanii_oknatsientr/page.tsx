import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Sparkles, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import LeadForm from "@/components/LeadForm";

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
    <div className="bg-white text-slate-900 min-h-screen pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Вызов замерщика</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Бесплатный выезд на замер</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Заявка на бесплатный замер и расчет
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed mb-8">
            Наш инженер приедет в удобное для вас время с каталогами оригинальных профилей Rehau, KBE, Funke, образцами ламинации и фурнитуры. Точный лазерный замер исключает ошибки при производстве.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 block">Ответ за 15 мин</span>
                <span className="text-slate-500">Перезвоним и проконсультируем</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 block">Без обязательств</span>
                <span className="text-slate-500">Замер вас ни к чему не обязывает</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 block">Скидка онлайн</span>
                <span className="text-slate-500">При заказе через форму на сайте</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <InteractiveCalculator />

      {/* Alternative Direct Form */}
      <LeadForm />
    </div>
  );
}
