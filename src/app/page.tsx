import type { Metadata } from "next";
import HeroArchitectural from "@/components/HeroArchitectural";
import TrustSection from "@/components/TrustSection";
import ServicesBento from "@/components/ServicesBento";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import ProjectsGallery from "@/components/ProjectsGallery";
import PricingTable from "@/components/PricingTable";
import ProcessSection from "@/components/ProcessSection";
import GeographySection from "@/components/GeographySection";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Ruler, Award, Wrench, Factory, Truck } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export const metadata: Metadata = {
  title: "Пластиковые окна, балконы и остекление во Владивостоке — компания «Окна Центр»",
  description: "Производство, продажа и установка пластиковых окон, остекление балконов и лоджий под ключ во Владивостоке, Уссурийске и Приморском крае. Работаем с 2004 года. Точный замер и официальный договор.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/`,
  },
  openGraph: {
    title: "Пластиковые окна и балконы во Владивостоке — компания «Окна Центр»",
    description: "Собственное производство и качественный монтаж с 2004 года. Официальный договор и гарантия качества.",
    url: `${COMPANY_INFO.domain}/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="bg-[#020509] text-white">
      {/* 1. WOW Hero Screen */}
      <HeroArchitectural />

      {/* 2. Editorial Statement & Verified Metrics */}
      <TrustSection />

      {/* 3. Architectural Services Bento Grid */}
      <ServicesBento />

      {/* 4. Interactive Calculator */}
      <InteractiveCalculator />

      {/* 5. Pricing Catalog Table */}
      <PricingTable />

      {/* 6. Authentic Gallery (100 Photos) */}
      <ProjectsGallery limit={8} />

      {/* 7. Process Section */}
      <ProcessSection />

      {/* 8. Materials Showcase */}
      <section className="py-20 bg-[#060B12] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              Технологии и материалы
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Только надежные комплектующие для приморского климата
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Мы используем сертифицированные материалы, устойчивые к 100% влажности, штормовым ветрам и соленому воздуху Японского моря.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Утеплитель Изопинк",
                desc: "Экструдированный пенополистирол с пазогребневым замком. Не впитывает влагу, морозостойкость более 500 циклов.",
                tag: "Для лоджий и полов",
                href: "/uteplenie_lodgiy_vladivostok"
              },
              {
                name: "Фасадные панели Ханьи",
                desc: "Стальной формованный лист с полиуретановым утеплителем 16мм. Фактуры дикого камня и керамического кирпича.",
                tag: "Наружная отделка",
                href: "/panieli_khani"
              },
              {
                name: "Профили Rehau, KBE, Funke",
                desc: "Оригинальные немецкие 3-5 камерные системы класса А с оцинкованным стальным армированием 1.5мм.",
                tag: "Оконные системы",
                href: "/profil_dlya_okon"
              },
              {
                name: "Виниловый сайдинг",
                desc: "Легкий эластичный материал для парапетов. 100% защита от дождя и тайфунов без перегрузки плиты.",
                tag: "Ветрозащита",
                href: "/vinilovyi_saidingh"
              }
            ].map((mat, i) => (
              <Link
                key={i}
                href={mat.href}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-2">{mat.tag}</span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{mat.name}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">{mat.desc}</p>
                </div>
                <span className="text-xs text-cyan-300 font-mono font-semibold flex items-center gap-1">
                  Подробнее о материале →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Geography & Branch Offices */}
      <GeographySection />

      {/* 10. FAQ Accordion */}
      <FAQSection />

      {/* 11. Final CTA Form Banner */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-[#040810] to-[#010307] border-t border-white/10 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            Бесплатный выезд инженера-замерщика
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Готовы преобразить ваш дом или балкон?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto mb-8">
            Оставьте заявку — выполним замер, привезем каталоги профилей и рассчитаем точную смету под ваш бюджет.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              Вызвать мастера на замер
            </Link>

            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs sm:text-sm uppercase tracking-wider border border-white/10 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm uppercase tracking-wider border border-emerald-500/30 transition-colors"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
