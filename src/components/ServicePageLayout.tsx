"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  Tag, 
  Camera,
  Layers,
  Compass,
  FileCheck2,
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
    { src: "/images/legacy/8a5eaf9e54230a487b7b6d054d07a6f0.jpg", caption: "Монтаж 5-камерного окна Rehau под ключ" },
    { src: "/images/legacy/54a23164a3970dd0f09d0e561ea53674.jpg", caption: "2-створчатое окно с отделкой откосов" },
    { src: "/images/legacy/9a0f1bcf4793bbba54ee52cfd2caaf37.jpg", caption: "Замена старого остекления на теплое ПВХ" },
    { src: "/images/legacy/8dfab624d3be3abdf4bd567d33074e74.jpg", caption: "Балконный блок с поворотно-откидной дверью" }
  ],
  balcony: [
    { src: "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg", caption: "Остекление балкона с выносом и сайдингом" },
    { src: "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg", caption: "Лоджия под ключ: утепление Изопинком и МДФ" },
    { src: "/images/legacy/bc27c75e17dbf6fddfca54aa15041ac3.jpg", caption: "Французское панорамное остекление от пола до потолка" },
    { src: "/images/legacy/4e9864818496da13fc2a00f80cab08d5.jpg", caption: "Капитальный ремонт парапета со сваркой" }
  ],
  repair: [
    { src: "/images/legacy/76a8fc6188eeb3ab4ffd8716840a897d.jpg", caption: "Замена уплотнителя и регулировка створки" },
    { src: "/images/legacy/9016ec6d8113c6bbe3a412fc5ca8d248.jpg", caption: "Ремонт фурнитурной обвязки Roto" },
    { src: "/images/legacy/bfc6e5150df44920b5b67fbc4411c1bb.jpg", caption: "Замена разбитого 2-камерного стеклопакета" },
    { src: "/images/legacy/a520945140f656caf5c8752cb9a70e02.jpg", caption: "Устранение продувания и зимний прижим" }
  ],
  aluminium: [
    { src: "/images/legacy/7bacd600b5337e3d9ec2d663ba87bbbd.jpg", caption: "Алюминиевая теплая входная группа" },
    { src: "/images/legacy/c98ac3a796213e2049d480f2d81fd3e8.jpg", caption: "Стоечно-ригельный фасад ALT F50" },
    { src: "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg", caption: "Раздвижные алюминиевые конструкции" },
    { src: "/images/legacy/c40edb113acdd0f9dd1abc7874e9a218.jpg", caption: "Панорамный витраж в частном коттедже" }
  ],
  materials: [
    { src: "/images/legacy/36c9e0b66c561160ca46ea78ed441f28.jpg", caption: "Фасадные панели Ханьи под кирпич" },
    { src: "/images/legacy/49d6fda5234f00ba8013574d4c808d06.jpg", caption: "Пластиковые ламинированные панели ПВХ" },
    { src: "/images/legacy/b6863894b0fe7c7f6b123b378d29d52c.jpg", caption: "Образцы стеновых панелей МДФ" },
    { src: "/images/legacy/710981c6630ca8d729836b82b170bf83.jpg", caption: "Утеплитель Изопинк и пароизоляция" }
  ],
  about: [
    { src: "/images/legacy/7dba6f0be5058fae4ae8bb0f43b6aa67.jpg", caption: "Офис и производственный склад «Окна Центр»" },
    { src: "/images/legacy/a1cc92771b8211de061c1034906b88fc.jpg", caption: "Готовая продукция перед отправкой клиентам" },
    { src: "/images/legacy/62a6b0f7601b893511e85b92207d2237.jpg", caption: "Монтажная бригада на объекте во Владивостоке" },
    { src: "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg", caption: "Сданный объект остекления в Приморском крае" }
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
    <div className="bg-[#03070D] text-white min-h-screen pt-24 selection:bg-cyan-500 selection:text-slate-950">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-cyan-300 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
          <Link href={page.categoryUrl} className="hover:text-cyan-300 transition-colors">{page.categoryLabel}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
          <span className="text-slate-200 truncate">{page.h1}</span>
        </nav>
      </div>

      {/* COMPACT HERO SECTION (60-75vh) */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{page.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                {page.h1}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                {page.intro}
              </p>

              {/* Price & Fact Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                  <span className="text-[10px] uppercase font-mono text-cyan-300 block">Стоимость:</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">{page.priceFrom}</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Монтаж:</span>
                  <span className="text-sm sm:text-base font-semibold text-white">по ГОСТ</span>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Гарантия:</span>
                  <span className="text-sm sm:text-base font-semibold text-emerald-400">по договору</span>
                </div>
              </div>

              {/* Verified Facts Checkmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                {page.verifiedFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
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
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-300" />
                  <span>WhatsApp консультация</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src={asset(page.heroImage)}
                  alt={page.h1}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070D] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Реальный объект Окна Центр</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#080E17]/90 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Статус:</span>
                      <span className="text-xs font-semibold text-white">Выезд инженера бесплатно</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">Владивосток и край</span>
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
          <div className="rounded-3xl bg-[#070D18] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Архитектурный инжиниринг · ALT F50 / ALT 150</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Алюминиевые светопрозрачные конструкции высокой несущей способности
            </h3>
            <p className="text-slate-300 text-sm max-w-3xl mb-8 leading-relaxed">
              Алюминиевые профили с терморазрывом из полиамида выдерживают колоссальные ветровые нагрузки побережья Приморского края и обеспечивают максимальное панорамное остекление без массивных пластиковых перемычек.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#03060B] border border-white/10">
                <span className="text-cyan-400 font-mono text-xs uppercase block mb-1">Стоечно-ригельный фасад</span>
                <h4 className="text-lg font-bold text-white mb-2">ALT F50</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Классическая система фасадного остекления с видимой шириной профилей 50 мм. Максимальная теплоизоляция и светопропускание для автосалонов, ТЦ и коттеджей.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#03060B] border border-white/10">
                <span className="text-cyan-400 font-mono text-xs uppercase block mb-1">Вентилируемые фасады</span>
                <h4 className="text-lg font-bold text-white mb-2">ALT 150</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Навесная вентилируемая фасадная система для облицовки керамогранитом, композитными панелями и фиброцементными плитами.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#03060B] border border-white/10">
                <span className="text-cyan-400 font-mono text-xs uppercase block mb-1">Теплые двери</span>
                <h4 className="text-lg font-bold text-white mb-2">Входные группы</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
          <div className="space-y-16">
            {page.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-cyan-400 text-xs sm:text-sm font-mono mt-1">
                      {sec.subtitle}
                    </p>
                  )}
                  {sec.content && (
                    <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-4xl mt-3">
                      {sec.content}
                    </p>
                  )}
                </div>

                {/* Section Items Cards */}
                {sec.items && sec.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sec.items.map((item, itmIdx) => (
                      <div
                        key={itmIdx}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          {item.badge && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono uppercase mb-2">
                              {item.badge}
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                        </div>
                        {item.spec && (
                          <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-300">
                            {item.spec}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VERIFIED PRICING BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="rounded-3xl bg-[#080E17] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Официальный прайс-лист</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Стоимость услуг и конструкций
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Цены являются ориентировочными. Точная стоимость рассчитывается инженером на бесплатном замере с учетом конфигурации и параметров проема.
              </p>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start lg:self-center"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-xs">
                  <th className="py-3 px-4">Услуга / Конструкция</th>
                  <th className="py-3 px-4">Ед. изм.</th>
                  <th className="py-3 px-4">Стоимость</th>
                  <th className="py-3 px-4 hidden md:table-cell">Примечание</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pagePrices.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                          Хит
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{p.unit || "услуга"}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300 whitespace-nowrap">
                      {p.priceFrom}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 hidden md:table-cell max-w-xs">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Подлинные фотографии</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Выполненные объекты по направлению
            </h2>
          </div>

          <Link
            href="/ghalierieia_rabot"
            className="text-xs font-mono text-cyan-300 hover:underline flex items-center gap-1.5"
          >
            <span>Вся галерея (100+ объектов)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, gIdx) => (
            <div
              key={gIdx}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden group hover:border-cyan-500/40 transition-all"
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
                <p className="text-xs text-slate-300 leading-snug">{item.caption}</p>
                <span className="text-[10px] font-mono text-slate-500 block mt-2">г. Владивосток</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LINKING BLOCK (RELATED SERVICES) */}
      {page.relatedPages && page.relatedPages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              Рекомендуемые разделы
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Смежные услуги и материалы
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.relatedPages.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {rel.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{rel.reason}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-mono">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Вопросы и ответы</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Часто задаваемые вопросы
              </h2>
            </div>

            <div className="space-y-4">
              {page.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${
                        openFaqIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
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
      <section className="py-20 bg-slate-950 border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Бесплатный выезд замерщика</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Закажите точный расчет стоимости
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Инженер приедет с образцами профилей Rehau, KBE, Funke, выполнит лазерный замер проемов и рассчитает итоговую смету с гарантией по договору.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>Оставить заявку онлайн</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+74232725725"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>8 (423) 2-725-725</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}