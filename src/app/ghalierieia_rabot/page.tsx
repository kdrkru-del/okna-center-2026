import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Camera, Sparkles, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import ProjectsGallery from "@/components/ProjectsGallery";

export const metadata: Metadata = {
  title: "Галерея выполненных работ компании «Окна Центр» — фото окон, балконов и фасадов",
  description: "Реальные фотографии объектов «Окна Центр» во Владивостоке и Приморье: остекление и отделка балконов, пластиковые окна Rehau и KBE, витражи, загородные резиденции.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/ghalierieia_rabot/`,
  },
  openGraph: {
    title: "Галерея работ компании «Окна Центр» — Владивосток",
    description: "Реальные фото выполненных объектов: балконы, лоджии, окна, фасады.",
    url: `${COMPANY_INFO.domain}/ghalierieia_rabot/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Галерея работ</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>Реальные выполненные объекты</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
              Галерея наших работ
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
              В этом разделе собраны подлинные фотографии объектов, выполненных специалистами компании «Окна Центр» во Владивостоке, Уссурийске, Артёме и пригороде. Никаких чужих 3D-рендеров — только фактические результаты нашей работы.
            </p>
          </div>

          <Link
            href="/zaiavka_na_uslughi_kompanii_oknatsientr"
            className="px-6 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white rounded-2xl text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start md:self-auto shadow-sm flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Рассчитать аналогичный проект</span>
          </Link>
        </div>
      </section>

      {/* Full Gallery */}
      <ProjectsGallery hideHeader={true} />

      {/* Pre-footer CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Хотите такой же балкон или теплые окна?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Вызовите инженера-замерщика бесплатно: мастер приедет с образцами материалов, выполнит лазерный замер проемов и рассчитает итоговую смету.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10 transition-all transform hover:-translate-y-0.5"
            >
              Вызвать замерщика 0 ₽
            </Link>
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs uppercase tracking-wider border border-slate-300 shadow-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
