"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  ChevronDown, 
  Camera,
  Layers,
  ExternalLink
} from "lucide-react";
import { PageDefinition } from "@/data/pages";
import { COMPANY_INFO } from "@/data/company_info";
import { getPricesBySourcePage, getPricesByCategory, PriceItem } from "@/data/prices";
import InstallationDiagram from "@/components/specialized/InstallationDiagram";
import WindowDiagnosticBlock from "@/components/specialized/WindowDiagnosticBlock";
import MaterialsComparisonTable from "@/components/specialized/MaterialsComparisonTable";
import BalconyStepsSequence from "@/components/specialized/BalconyStepsSequence";
import WindowTypesShowcase from "@/components/specialized/WindowTypesShowcase";
import CompanyTimeline from "@/components/specialized/CompanyTimeline";
import { asset } from "@/lib/assetPath";

// Gallery image mapping by variant
const GALLERY_BY_VARIANT: Record<string, { src: string; caption: string }[]> = {
  windows: [
    { src: "/images/bento/bento-rehau-windows.jpg", caption: "Панорамное остекление гостиной окнами Rehau" },
    { src: "/images/legacy/fa88e5ce2640e3d853524a7973ba151a.jpg", caption: "Эркерные окна с ламинацией и золотыми шпросами" },
    { src: "/images/legacy/6ee31abf7022c6bd8a05b535a0fdbceb.jpg", caption: "Трехстворчатое окно со встроенными жалюзи" },
    { src: "/images/legacy/5d62a55290edb5a644e685a8eff0b6a0.jpg", caption: "Двухстворчатое пластиковое окно с отделкой откосов" }
  ],
  balcony: [
    { src: "/images/bento/bento-balconies-turnkey.jpg", caption: "Теплая лоджия-кабинет с панорамным остеклением" },
    { src: "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg", caption: "Лоджия под ключ: чистовая отделка и встроенный свет" },
    { src: "/images/legacy/1dfc145b98c74e9896680cc9ec397d6b.jpg", caption: "Обшивка балкона евровагонкой с зоной хранения" },
    { src: "/images/legacy/Ns8vYDcL.jpg", caption: "Капитальный ремонт парапета со сваркой, крышей и сайдингом" }
  ],
  repair: [
    { src: "/images/legacy/db7eeb03b34b1d5a8cb1d52243b0e21f.jpg", caption: "Оконная створка Rehau с австрийской фурнитурой Roto" },
    { src: "/images/legacy/7572a65a5821c2fc33ca30a7abf94824.jpg", caption: "Регулировка и настройка плавности хода створки" },
    { src: "/images/legacy/670d18c69dd29e4036c09b9e6de54e25.jpg", caption: "Установка рулонных жалюзи и москитных сеток" },
    { src: "/images/legacy/full_7sqeCo56.jpg", caption: "Замена уплотнителей и регулировка зимнего прижима" }
  ],
  aluminium: [
    { src: "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg", caption: "Витражный фасад и входная группа павильона" },
    { src: "/images/legacy/Al2fspIs.jpg", caption: "Панорамные теплые раздвижные алюминиевые порталы" },
    { src: "/images/legacy/e25a0f77cfde45e3c6be345e2ffea560.jpg", caption: "Двухэтажный фасадный витраж коммерческого здания" },
    { src: "/images/legacy/697a6195a6d1109ce8ea9e8ee3c192e9.jpg", caption: "Архитектурное фасадное остекление с терморазрывом" }
  ],
  materials: [
    { src: "/images/legacy/f270d6f307895b915815537be47eacf2.jpg", caption: "Внутренняя отделка натуральной вагонкой со столиком" },
    { src: "/images/legacy/e2a1410ba6597ca740d16822a98d1bd4.jpg", caption: "Наружная облицовка балкона термопанелями под камень" },
    { src: "/images/legacy/full_Bx5dmJ34.jpg", caption: "Отделка декоративным кирпичом и установка теплого подоконника" },
    { src: "/images/legacy/ef03b9561fddcafaf4657793ca76d6f0.jpg", caption: "Обшивка морозостойким виниловым сайдингом" }
  ],
  about: [
    { src: "/images/hero/hero-daylight-villa.jpg", caption: "Панорамное фасадное остекление загородной виллы" },
    { src: "/images/hero/hero-daylight-patio.jpg", caption: "Остекление террасы с раздвижными порталами" },
    { src: "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg", caption: "Двухэтажные витражные французские окна коттеджа" },
    { src: "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg", caption: "Сданный объект архитектурного остекления во Владивостоке" }
  ]
};

export default function ServicePageLayout({ page }: { page: PageDefinition }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Prices relevant for this specific page
  let pagePrices = getPricesBySourcePage(page.slug);
  if (pagePrices.length === 0) {
    // Fallback to category
    const catMap: Record<string, string> = {
      windows: "windows",
      balcony: "balconies",
      repair: "repairs",
      aluminium: "aluminum",
      materials: "materials",
      about: "windows"
    };
    pagePrices = getPricesByCategory(catMap[page.variant] || "windows").slice(0, 6);
  }

  // Schema.org Microdata
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": page.schemaType || "Service",
    "name": page.h1,
    "description": page.description,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": COMPANY_INFO.name,
      "legalName": COMPANY_INFO.legalName,
      "telephone": COMPANY_INFO.mainPhone,
      "url": COMPANY_INFO.domain,
      "foundingDate": "2004",
      "address": COMPANY_INFO.offices.map((o) => ({
        "@type": "PostalAddress",
        "streetAddress": o.address,
        "addressLocality": o.city,
        "addressRegion": "Приморский край",
        "addressCountry": "RU"
      }))
    },
    "areaServed": [
      { "@type": "City", "name": "Владивосток" },
      { "@type": "City", "name": "Уссурийск" },
      { "@type": "City", "name": "Артём" },
      { "@type": "AdministrativeArea", "name": "Приморский край" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "RUB",
      "lowPrice": page.priceFrom.replace(/[^0-9]/g, "") || "1000",
      "offerCount": pagePrices.length || 1
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": COMPANY_INFO.domain
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.categoryLabel,
        "item": `${COMPANY_INFO.domain}${page.categoryUrl}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.h1,
        "item": `${COMPANY_INFO.domain}/${page.slug}`
      }
    ]
  };

  const faqSchema = page.faq && page.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const gallery = GALLERY_BY_VARIANT[page.variant] || GALLERY_BY_VARIANT.windows;

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-16 sm:pt-20 selection:bg-cyan-500 selection:text-white">
      {/* Schema.org scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
          <span className="text-slate-900 font-medium truncate">{page.categoryLabel}</span>
        </nav>
      </div>

      {/* COMPACT HERO SECTION (60-75vh) */}
      <section className="relative overflow-hidden pt-4 pb-12 lg:pt-6 lg:pb-16 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 font-heading">
                {page.h1}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
                {page.intro}
              </p>

              {/* Price & Fact Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200">
                  <span className="text-[10px] uppercase font-bold text-cyan-800 block tracking-wide">
                    {page.priceLabel || (page.variant === "about" ? "На рынке:" : "Стоимость:")}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight">{page.priceFrom}</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wide">Монтаж:</span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900">по ГОСТ</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wide">Гарантия:</span>
                  <span className="text-sm sm:text-base font-semibold text-emerald-700">по договору</span>
                </div>
              </div>

              {/* Verified Facts Checkmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-700">
                {page.verifiedFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 hover:shadow-cyan-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Записаться на замер</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/79940100300?text=${encodeURIComponent(
                    `Здравствуйте! Интересует услуга: ${page.h1}. Подскажите стоимость и проконсультируйте.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp консультация</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <Image
                  src={asset(page.heroImage)}
                  alt={page.h1}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Реальный объект Окна Центр</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wide">Статус:</span>
                      <span className="text-xs font-semibold text-slate-900">Выезд инженера бесплатно</span>
                    </div>
                    <span className="text-xs text-cyan-700 font-bold">Владивосток и край</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SPECIALIZED INTERACTIVE BLOCK BY VARIANT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {page.variant === "windows" && (
          <div className="space-y-12">
            <WindowTypesShowcase />
            {page.slug.includes("ustanovka") || page.slug.includes("zamena") ? (
              <InstallationDiagram />
            ) : null}
          </div>
        )}

        {page.variant === "balcony" && (
          <div className="space-y-12">
            <BalconyStepsSequence />
            <MaterialsComparisonTable />
          </div>
        )}

        {page.variant === "repair" && (
          <div className="space-y-12">
            <WindowDiagnosticBlock />
          </div>
        )}

        {page.variant === "aluminium" && (
          <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Алюминиевые светопрозрачные конструкции высокой несущей способности
            </h3>
            <p className="text-slate-600 text-sm max-w-3xl mb-8 leading-relaxed">
              Алюминиевые профили с терморазрывом из полиамида выдерживают колоссальные ветровые нагрузки побережья Приморского края и обеспечивают максимальное панорамное остекление без массивных пластиковых перемычек.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-cyan-700 font-bold text-xs uppercase block mb-1">Стоечно-ригельный фасад</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">ALT F50</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Классическая система фасадного остекления с видимой шириной профилей 50 мм. Максимальная теплоизоляция и светопропускание для автосалонов, ТЦ и коттеджей.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-cyan-700 font-bold text-xs uppercase block mb-1">Вентилируемые фасады</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">ALT 150</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Навесная вентилируемая фасадная система для облицовки керамогранитом, композитными панелями и фиброцементными плитами.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-cyan-700 font-bold text-xs uppercase block mb-1">Теплые двери</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Входные группы</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Двери с терморазрывом, усиленными петлями на 500 000 циклов открывания, доводчиками и многозапорными замками для высокой проходимости.
                </p>
              </div>
            </div>
          </div>
        )}

        {page.variant === "materials" && (
          <MaterialsComparisonTable />
        )}

        {page.variant === "about" && (
          <CompanyTimeline />
        )}
      </section>

      {/* DETAILED CONTENT SECTIONS */}
      {page.sections && page.sections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/80">
          <div className="space-y-16">
            {page.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-cyan-700 text-xs sm:text-sm font-semibold mt-1">
                      {sec.subtitle}
                    </p>
                  )}
                  {sec.content && (
                    <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-4xl mt-3">
                      {sec.content}
                    </p>
                  )}
                </div>

                {/* Section Items Cards */}
                {sec.items && sec.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {sec.items.map((item, itmIdx) => {
                      const cleanTitle = item.title.replace(/^\d+[\.\s:]*\s*/, "");
                      const isProcess = sec.type === "steps" || /процесс|этап|технологи/i.test(sec.title);
                      return (
                        <div
                          key={itmIdx}
                          className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-500/40 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              {item.badge ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-semibold uppercase">
                                  {item.badge}
                                </span>
                              ) : isProcess ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-semibold uppercase">
                                  Этап процесса
                                </span>
                              ) : null}
                              {isProcess && (
                                <div className="text-cyan-600 opacity-60 group-hover:opacity-100 transition-opacity">
                                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                </div>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{cleanTitle}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                          </div>

                          {item.spec && (
                            <div className="pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-cyan-700">
                              {item.spec}
                            </div>
                          )}

                          {/* Desktop Arrow Connector between cards for process steps */}
                          {isProcess && itmIdx < (sec.items?.length ?? 0) - 1 && (
                            <div
                              className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border-2 border-cyan-300 text-cyan-600 shadow-sm items-center justify-center pointer-events-none"
                              aria-hidden="true"
                            >
                              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VERIFIED PRICING BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                Стоимость услуг и конструкций
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Цены являются ориентировочными. Точная стоимость рассчитывается инженером на бесплатном замере с учетом конфигурации и параметров проема.
              </p>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-colors inline-flex items-center gap-2 self-start lg:self-center shadow-sm"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-semibold text-xs">
                  <th className="py-3 px-4">Услуга / Конструкция</th>
                  <th className="py-3 px-4">Ед. изм.</th>
                  <th className="py-3 px-4">Стоимость</th>
                  <th className="py-3 px-4 hidden md:table-cell">Примечание</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {pagePrices.map((p) => (
                  <tr key={p.id} className="hover:bg-white transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold border border-cyan-300 text-[10px]">
                          Хит
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{p.unit || "услуга"}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-950 whitespace-nowrap">
                      {p.priceFrom}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 hidden md:table-cell max-w-xs">
                      {p.note || "Монтаж по ГОСТ, выезд мастера"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* REAL WORKS GALLERY (3-4 PHOTOS FROM PHOTO-AUDIT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
              Выполненные объекты по направлению
            </h2>
          </div>

          <Link
            href="/ghalierieia_rabot"
            className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 hover:underline flex items-center gap-1.5"
          >
            <span>Вся галерея (100+ объектов)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, gIdx) => (
            <div
              key={gIdx}
              className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden group hover:border-cyan-500/40 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={asset(item.src)}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-slate-700 leading-snug">{item.caption}</p>
                <span className="text-[10px] font-medium text-slate-500 block mt-2">г. Владивосток</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LINKING BLOCK (RELATED SERVICES) */}
      {page.relatedPages && page.relatedPages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Смежные услуги и материалы
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.relatedPages.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-500/40 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-2">
                    {rel.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{rel.reason}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-cyan-700 font-semibold">
                  <span>Перейти</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ SECTION WITH ACCORDION */}
      {page.faq && page.faq.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
                Часто задаваемые вопросы
              </h2>
            </div>

            <div className="space-y-4">
              {page.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden transition-all hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-cyan-700 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-600 flex-shrink-0 transition-transform ${
                        openFaqIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CONVERSION CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200/80 text-center relative overflow-hidden text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-heading">
            Закажите точный расчет стоимости
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Инженер приедет с образцами профилей Rehau, KBE, Funke, выполнит лазерный замер проемов и рассчитает итоговую смету с гарантией по договору.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 hover:shadow-cyan-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Оставить заявку онлайн</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+74232725725"
              className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>8 (423) 2-725-725</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}