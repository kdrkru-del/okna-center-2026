import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Building2,
  ArrowRight,
  Layers,
  Phone,
} from "lucide-react";
import { KEY_OBJECTS } from "@/data/gallery_data";
import { COMPANY_INFO } from "@/data/company_info";
import KeyObjectsCatalogClient from "@/components/KeyObjectsCatalogClient";
import LeadForm from "@/components/LeadForm";
import { asset } from "@/lib/assetPath";

export const metadata: Metadata = {
  title: "Ключевые объекты компании «Окна Центр» — остекление ЖК и крупных зданий",
  description:
    "Крупные реализованные проекты компании «Окна Центр» во Владивостоке, Уссурийске и Приморском крае: ЖК «Архитектор» (6 500 м²), ЖК «Тухачевского 80» (2 500 м² для СЗ «ГЛОРАКС»), ЖД на Каплунова 10 (4 100 м²), проекты для ПИК, GloraX, Девелопмент-Юг и Минобороны РФ.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/klyuchevye-obekty/`,
  },
  openGraph: {
    title: "Ключевые объекты «Окна Центр» — масштабные проекты остекления в Приморье",
    description:
      "Производство, поставка и монтаж светопрозрачных конструкций ПВХ и алюминия для жилых комплексов, многоквартирных домов и государственных объектов с 2004 года.",
    url: `${COMPANY_INFO.domain}/klyuchevye-obekty/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${COMPANY_INFO.domain}/images/portfolio/key-objects/zhk-arhitektor-1.jpg`,
        width: 768,
        height: 1024,
        alt: "ЖК «Архитектор» г. Владивосток — остекление 6 500 м², компания «Окна Центр»",
      },
    ],
  },
};

const keyObjectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ключевые объекты остекления компании «Окна Центр»",
  description:
    "Реализованные проекты комплексного остекления жилых комплексов и зданий в Приморском крае.",
  url: `${COMPANY_INFO.domain}/klyuchevye-obekty/`,
  numberOfItems: KEY_OBJECTS.length,
  itemListElement: KEY_OBJECTS.map((obj, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${COMPANY_INFO.domain}/klyuchevye-obekty/${obj.id}/`,
    name: obj.title,
    description: `${obj.location}. Заказчик: ${obj.client || "Застройщик"}. Работы: ${
      obj.scope || obj.specs || ""
    }`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: `${COMPANY_INFO.domain}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ключевые объекты",
      item: `${COMPANY_INFO.domain}/klyuchevye-obekty/`,
    },
  ],
};

export default function KeyObjectsPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(keyObjectsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav
          className="flex items-center gap-2 text-xs text-slate-500 font-mono"
          aria-label="Хлебные крошки"
        >
          <Link href="/" className="hover:text-cyan-700 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Ключевые объекты</span>
        </nav>
      </div>

      {/* Hero Section: Executive B2B Presentation */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-18">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Производственно-монтажный комплекс с 2004 года · Приморский край</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Остекление жилых комплексов и высотных объектов до 25 этажей
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              Собственное автоматизированное производство светопрозрачных конструкций ПВХ и алюминия в Приморье.
              Инженерный расчёт ветровых нагрузок, закрытие теплового контура в утверждённый график генподрядчика и сдача технадзору по ГОСТ.
            </p>

            {/* 4 Core B2B Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">
                  6 500+ м²
                </span>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  Объём крупнейшего сданного ЖК
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">
                  до 25 эт.
                </span>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  Высотный монтаж с допуском
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">
                  с 2004 г.
                </span>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  20+ лет производственной базы
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">
                  с НДС
                </span>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  Акты КС-2 / КС-3 по ГОСТ
                </span>
              </div>
            </div>

            {/* Primary B2B Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#tender-calc"
                className="px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Отправить проект на расчёт</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#portfolio-list"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Смотреть сданные объекты ({KEY_OBJECTS.length})</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                className="px-5 py-4 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-mono text-xs font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{COMPANY_INFO.mainPhone} (ПТО / Тендерный отдел)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Line: Federal Developers & Partners (Clean Bar instead of text walls) */}
      <section className="border-b border-slate-200/90 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Доверие лидеров строительной отрасли:
              </span>
              <span className="text-xs font-semibold text-slate-900">
                Генеральные подрядчики и девелоперы
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 flex-1 lg:max-w-4xl">
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                <span className="text-xs font-extrabold text-slate-950">ПИК</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-cyan-100 text-cyan-900 font-bold">№1 в РФ</span>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                <span className="text-xs font-extrabold text-slate-950">GloraX</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 font-bold">КРТ</span>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                <span className="text-xs font-extrabold text-slate-950">Девелопмент-Юг</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-900 font-bold">30+ лет</span>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
                <span className="text-xs font-extrabold text-slate-950">Ремстройцентр</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 font-bold">25 эт.</span>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-xs font-extrabold text-slate-950">Минобороны РФ</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-red-100 text-red-900 font-bold">Госзаказ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Key Objects List (Large Presentation Cards - Right at the Top!) */}
      <section id="portfolio-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Реализованные объекты и жилые комплексы
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {KEY_OBJECTS.length} ключевых строительных проектов
          </span>
        </div>
        <KeyObjectsCatalogClient items={KEY_OBJECTS} />
      </section>

      {/* B2B Value Proposition for Developers & General Contractors */}
      <section className="border-t border-slate-200/90 bg-slate-50/70 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-3">
              Почему девелоперы и генподрядчики выбирают «Окна Центр»
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Закрываем потребности строительных компаний полного цикла: от согласования рабочей документации и ветровых расчётов до сдачи фасадного контура Госстройнадзору.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base font-extrabold text-slate-950 mb-2">
                Собственный завод в Приморье
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Автоматизированные линии резки, пайки и остекления. Отсутствие посредников гарантирует прямое ценообразование и бесперебойную ритмичность поставок на объект.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base font-extrabold text-slate-950 mb-2">
                ПТО и ветровые расчёты
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Собственный инженерный отдел разрабатывает узлы примыканий, рассчитывает статику и ветровые нагрузки побережья Владивостока для высотных домов до 25 этажей.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base font-extrabold text-slate-950 mb-2">
                Штатные звенья высотного монтажа
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Аттестованные монтажники с допусками на высотные работы. Поэтапный монтаж по этажным захваткам в строгом соответствии с утверждённым графиком генподрядчика.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base font-extrabold text-slate-950 mb-2">
                Сдача технадзору по ГОСТ и НДС
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Полный комплект исполнительной документации: сертификаты, паспорта качества на каждое изделие, акты скрытых работ и подписание КС-2 / КС-3 в срок.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tender & Project Documentation Intake (id="tender-calc") */}
      <section id="tender-calc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Требуется расчёт светопрозрачных конструкций по проекту?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Отправьте спецификации проёмов (разделы АР / КР) или техническое задание.
                Инженерно-сметный отдел компании подготовит детальный расчёт сметы, технические узлы примыканий и проект графика поставок в течение 48 часов.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                  className="px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
                </a>
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Форма отправки проектной документации</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3.5 backdrop-blur-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold block">
                Прямой контакт для девелоперов:
              </span>
              <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Формат работы:</span>
                  <span className="font-bold text-white">Генподряд / Субподряд</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Налогообложение:</span>
                  <span className="font-bold text-white">Общая система (с НДС)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Срок подготовки КП:</span>
                  <span className="font-bold text-cyan-300">до 48 часов</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">География:</span>
                  <span className="font-bold text-white">Владивосток и весь Приморский край</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />
    </div>
  );
}
