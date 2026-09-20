import React from "react";
import Link from "next/link";
import { PageContent } from "@/data/pages_content";
import { ChevronRight, CheckCircle2, Shield, Clock, Phone, Sparkles, MapPin } from "lucide-react";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import FAQSection from "@/components/FAQSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import { COMPANY_INFO } from "@/data/company_info";

export default function ServiceTemplate({ page }: { page: PageContent }) {
  // Schema.org Service markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.h1,
    "description": page.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_INFO.name,
      "telephone": COMPANY_INFO.mainPhone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY_INFO.offices[0].address,
        "addressLocality": "Владивосток",
        "addressRegion": "Приморский край",
        "addressCountry": "RU",
      },
    },
    "areaServed": ["Владивосток", "Уссурийск", "Артем", "Приморский край"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": COMPANY_INFO.domain,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.categoryLabel,
        "item": `${COMPANY_INFO.domain}${page.categoryUrl}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.h1,
        "item": `${COMPANY_INFO.domain}/${page.slug}`,
      },
    ],
  };

  return (
    <div className="bg-[#04080E] text-white min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-cyan-300 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link href={page.categoryUrl} className="hover:text-cyan-300 transition-colors">{page.categoryLabel}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-200 truncate max-w-[200px] sm:max-w-none">{page.h1}</span>
        </nav>
      </div>

      {/* Hero Service Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            {page.h1}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8">
            {page.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-[10px] uppercase font-mono text-cyan-300 block">Стоимость:</span>
              <span className="text-2xl font-black text-white font-mono">{page.priceFrom}</span>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Вызвать замерщика 0 ₽
            </Link>

            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>
          </div>

          {/* Key bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
            {page.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing block if exists */}
      {page.originalPrices.length > 0 && (
        <section className="py-14 bg-slate-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              Цены на услуги: {page.h1}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.originalPrices.map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{p.name}</h3>
                    <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">{p.details}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-2xl font-black text-cyan-400 font-mono">{p.price}</span>
                    <Link
                      href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main structured SEO text sections */}
      <section className="py-16 bg-[#060B12] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {page.textSections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{sec.heading}</h2>
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                {sec.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relevant Gallery Samples */}
      <ProjectsGallery limit={8} />

      {/* Interactive Calculator Section */}
      <InteractiveCalculator />

      {/* FAQs */}
      {page.faqs.length > 0 && <FAQSection items={page.faqs} />}

      {/* Interlinking Block (Перелинковка) */}
      {page.relatedLinks.length > 0 && (
        <section className="py-14 bg-slate-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-6 font-semibold">
              Смотрите также:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {page.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-colors text-xs font-semibold text-slate-200 hover:text-cyan-300 text-center flex items-center justify-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
