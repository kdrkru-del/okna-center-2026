import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, CheckCircle2, Phone, MessageCircle, Ruler } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import PricingTable from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "Цены на пластиковые окна, остекление балконов и ремонт во Владивостоке — компания «Окна Центр»",
  description: "Официальный прайс-лист на пластиковые окна, установку под ключ, остекление балконов, лоджий и ремонт окон во Владивостоке и Уссурийске. Цены от завода-изготовителя с 2004 года. Замер 0 ₽.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/ceny/`,
  },
  openGraph: {
    title: "Цены на окна, балконы и ремонт во Владивостоке — «Окна Центр»",
    description: "Честные цены напрямую от производителя. Без скрытых наценок, фиксация сметы в договоре.",
    url: `${COMPANY_INFO.domain}/ceny/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function CenyPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-24 pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Цены</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-4">
            <span>Цены от завода-изготовителя · с 2004 года</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight mb-6">
            Цены на окна, балконы и ремонт во Владивостоке
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed mb-8">
            Честные цены напрямую от производителя в Приморье. Без посреднических наценок. Итоговая смета рассчитывается на месте и фиксируется в официальном договоре по ГОСТ.
          </p>

          {/* Quick Advantages Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Фиксация сметы</span>
                <span className="text-slate-500">Цена в договоре не растет</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <Ruler className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Замер 0 ₽</span>
                <span className="text-slate-500">Владивосток и Уссурийск</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Срок от 3 дней</span>
                <span className="text-slate-500">Собственный цех</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Pricing Catalog Component */}
      <PricingTable />

      {/* Pricing Clarification Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Что входит в стоимость установки пластикового окна под ключ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed font-light">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Бесплатный точный замер</strong> — лазерное сканирование проема инженером с учетом четвертей и ветровых нагрузок.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Заводское изготовление</strong> — оригинальный профиль Rehau, KBE или Funke, армирование 1.5 мм, фурнитура Siegenia/Roto.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Бережная доставка и подъем</strong> — специализированным транспортом со стойками-пирамидами прямо в квартиру.</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Демонтаж старого окна</strong> — аккуратное снятие старых рам с выносом на лестничную площадку.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Монтаж по ГОСТ</strong> — 3-слойный монтажный шов (ПСУЛ, пена, пароизоляционная лента) против продуваний.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-1" />
                <span><strong className="font-semibold text-slate-900">Комплектующие и отделка</strong> — подоконник, отлив, пластиковые утепленные откосы с уголками.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Нужен расчет стоимости под ваши размеры?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl">
              Вызовите инженера-замерщика бесплатно: мастер привезет каталоги профилей и рассчитает точную смету на месте за 20 минут.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Вызвать замерщика 0 ₽
            </Link>

            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-colors border border-white/20 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
