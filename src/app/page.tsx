import type { Metadata } from "next";
import HeroArchitectural from "@/components/HeroArchitectural";
import TrustSection from "@/components/TrustSection";
import PopularSolutions from "@/components/PopularSolutions";
import ServicesBento from "@/components/ServicesBento";
import BalconiesTurnkeySection from "@/components/BalconiesTurnkeySection";
import WindowRepairCallout from "@/components/WindowRepairCallout";
import ClimateEngineering from "@/components/ClimateEngineering";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import PricingTable from "@/components/PricingTable";
import ProjectsGallery from "@/components/ProjectsGallery";
import NonStandardSolutions from "@/components/NonStandardSolutions";
import ProcessSection from "@/components/ProcessSection";
import GeographySection from "@/components/GeographySection";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
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
    <div className="bg-white text-slate-900">
      {/* 1. Main Mass-Market Hero Screen */}
      <HeroArchitectural />

      {/* 2. Practical Needs: 'Что вам нужно?' 4 Cards */}
      <TrustSection />

      {/* 3. Popular Apartment & House Solutions (6 items including Kitchen Window & Balcony Block) */}
      <PopularSolutions />

      {/* 4. Core Services Bento Grid */}
      <ServicesBento />

      {/* 5. Balconies & Loggias Turnkey Section */}
      <BalconiesTurnkeySection />

      {/* 6. Window Repair & Service Callout */}
      <WindowRepairCallout />

      {/* 7. Climate-Verified Quality for Primorye */}
      <ClimateEngineering />

      {/* 8. Interactive Calculator */}
      <InteractiveCalculator />

      {/* 9. Pricing Catalog Table */}
      <PricingTable />

      {/* 10. Authentic Completed Projects Gallery */}
      <ProjectsGallery limit={8} />

      {/* 11. Custom & Aluminum Solutions (Secondary Focus) */}
      <NonStandardSolutions />

      {/* 12. How We Work Process Section */}
      <ProcessSection />

      {/* 13. Certified Materials Showcase */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Только надежные комплектующие для приморского климата
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-light">
              Мы используем сертифицированные материалы, устойчивые к 100% влажности, штормовым ветрам и перепадам температур.
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
                desc: "Оригинальные немецкие 3-5 камерные системы класса А с оцинкованным стальным армированием.",
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
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-700 uppercase tracking-wider block mb-2">{mat.tag}</span>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">{mat.name}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">{mat.desc}</p>
                </div>
                <span className="text-xs text-cyan-600 font-mono font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Подробнее о материале →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Geography & Service Area */}
      <GeographySection />

      {/* 15. FAQ Accordion */}
      <FAQSection />

      {/* 16. Final CTA Banner */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200/80 text-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Нужно новое окно или остекление?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-xl mx-auto mb-8">
            Оставьте размеры или номер телефона — рассчитаем подходящий вариант под ваш бюджет, привезем образцы профилей и выполним точный замер 0 ₽.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 transition-all transform hover:-translate-y-0.5"
            >
              Вызвать мастера на замер 0 ₽
            </Link>

            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-mono text-xs sm:text-sm uppercase tracking-wider border border-slate-300 shadow-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono text-xs sm:text-sm uppercase tracking-wider border border-emerald-200 transition-colors"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
