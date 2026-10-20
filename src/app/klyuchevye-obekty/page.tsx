import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  Layers,
  ShieldCheck,
  Camera,
  Phone,
} from "lucide-react";
import { KEY_OBJECTS } from "@/data/gallery_data";
import { COMPANY_INFO } from "@/data/company_info";
import { CopyObjectLinkButton } from "@/components/KeyObjectDetailClient";
import LeadForm from "@/components/LeadForm";
import { asset } from "@/lib/assetPath";

export const metadata: Metadata = {
  title: "Ключевые объекты компании «Окна Центр» — остекление ЖК и крупных зданий",
  description:
    "Крупные реализованные проекты компании «Окна Центр» во Владивостоке, Уссурийске и Приморском крае: ЖК «Архитектор» (6 500 м²), ЖД на Каплунова 10 (4 100 м²), ЖК «Каштановый двор», ЖК «Радужный» и объекты Минобороны РФ.",
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

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Крупные строительные проекты · Приморский край</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
                Ключевые объекты компании «Окна Центр»
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
                С 2004 года выполняем комплексное остекление многоэтажных жилых комплексов,
                многоквартирных домов, коммерческих зданий и государственных объектов по всему
                Приморскому краю. У каждого объекта есть постоянная прямая ссылка для удобной
                отправки заказчикам и партнёрам.
              </p>

              {/* Key Stats Pills */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Флагманский проект:
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-950">
                    ЖК «Архитектор» — 6 500 м²
                  </span>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Высотное строительство:
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-950">
                    Дома до 25 этажей по ГОСТ
                  </span>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Партнёры и заказчики:
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-950">
                    Девелопмент-Юг, СЗ Ремстройцентр, Минобороны РФ
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                className="px-6 py-4 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-md"
              >
                <span>Запросить расчёт / замер</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
              <Link
                href="/ghalierieia_rabot"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Общая галерея работ</span>
                <ArrowRight className="w-4 h-4 text-cyan-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Key Objects List (Large Presentation Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {KEY_OBJECTS.map((obj, index) => {
          const photos =
            obj.photos && obj.photos.length > 0 ? obj.photos : [obj.src];
          const isFeatured = index === 0;

          return (
            <article
              key={obj.id}
              id={obj.id}
              className={`rounded-3xl border overflow-hidden transition-all shadow-lg ${
                isFeatured
                  ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-cyan-500/40 shadow-2xl"
                  : "bg-white text-slate-900 border-slate-200/90 hover:border-cyan-500/50"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: High-Quality Visuals */}
                <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col gap-3">
                  <Link
                    href={`/klyuchevye-obekty/${obj.id}`}
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 group block"
                  >
                    <Image
                      src={asset(photos[0])}
                      alt={`${obj.title} — ${obj.location}, ${obj.scope || obj.specs || ""}`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-70" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                        {obj.badge || "Ключевой объект"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-950 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                        <Camera className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{photos.length} фото</span>
                      </span>
                    </div>

                    {/* Bottom Location */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{obj.location}</span>
                      </div>
                      <span className="text-xs font-semibold text-cyan-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>Смотреть проект</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Sub-photos preview strip if object has multiple photos */}
                  {photos.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {photos.slice(0, 3).map((pSrc, pIdx) => (
                        <Link
                          key={pSrc}
                          href={`/klyuchevye-obekty/${obj.id}`}
                          className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-500/20 group block"
                        >
                          <Image
                            src={asset(pSrc)}
                            alt={`${obj.title} — ракурс ${pIdx + 1}`}
                            fill
                            sizes="(max-width: 768px) 33vw, 18vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Project Passport & Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider font-bold ${
                          isFeatured ? "text-cyan-400" : "text-cyan-700"
                        }`}
                      >
                        Реализованный проект #{index + 1}
                      </span>
                      {obj.year && (
                        <span
                          className={`text-xs font-mono px-2.5 py-0.5 rounded-md ${
                            isFeatured
                              ? "bg-white/10 text-slate-300"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {obj.year}
                        </span>
                      )}
                    </div>

                    <h2
                      className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug ${
                        isFeatured ? "text-white" : "text-slate-950"
                      }`}
                    >
                      <Link
                        href={`/klyuchevye-obekty/${obj.id}`}
                        className="hover:text-cyan-500 transition-colors"
                      >
                        {obj.title}
                      </Link>
                    </h2>

                    {/* Structured Specifications Card */}
                    <div
                      className={`p-4 rounded-2xl border space-y-3 text-xs sm:text-sm ${
                        isFeatured
                          ? "bg-white/5 border-white/10 text-slate-200"
                          : "bg-slate-50 border-slate-200/80 text-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-current/10">
                        <span className={isFeatured ? "text-slate-400" : "text-slate-500"}>
                          Локация:
                        </span>
                        <span className="font-bold text-right">{obj.location}</span>
                      </div>

                      {obj.client && (
                        <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-current/10">
                          <span className={isFeatured ? "text-slate-400" : "text-slate-500"}>
                            Заказчик:
                          </span>
                          <span className="font-bold text-right">{obj.client}</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <span className={isFeatured ? "text-slate-400" : "text-slate-500"}>
                          Выполненные работы:
                        </span>
                        <span
                          className={`font-extrabold text-right ${
                            isFeatured ? "text-cyan-300" : "text-cyan-800"
                          }`}
                        >
                          {obj.scope || obj.specs}
                        </span>
                      </div>
                    </div>

                    {obj.description && (
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isFeatured ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {obj.description}
                      </p>
                    )}

                    {obj.highlights && obj.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {obj.highlights.map((h, hIdx) => (
                          <li
                            key={hIdx}
                            className={`flex items-start gap-2 text-xs ${
                              isFeatured ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isFeatured ? "text-cyan-400" : "text-cyan-600"
                              }`}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="pt-6 mt-6 border-t border-current/10 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/klyuchevye-obekty/${obj.id}`}
                      className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm ${
                        isFeatured
                          ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                          : "bg-slate-950 hover:bg-cyan-700 text-white"
                      }`}
                    >
                      <span>Страница объекта</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <CopyObjectLinkButton slug={obj.id} compact />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* B2B / Corporate & Private CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Приглашаем к сотрудничеству застройщиков и частных заказчиков
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Нужен расчёт остекления объекта или квартиры?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Собственное автоматизированное производство с 2004 года, соблюдение графиков
              поставок, работа по ГОСТ и официальная гарантия 5 лет по договору.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="py-4 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-600/20 inline-flex items-center gap-2"
            >
              <span>Вызвать мастера на замер</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />
    </div>
  );
}
