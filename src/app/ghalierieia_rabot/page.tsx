import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Camera, Sparkles, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import ProjectsGallery from "@/components/ProjectsGallery";

export const metadata: Metadata = {
  title: "Галерея выполненных работ компании «Окна Центр» — фото окон, балконов и фасадов",
  description: "Реальные фотографии объектов «Окна Центр» во Владивостоке и Приморье: остекление и отделка балконов, пластиковые окна Rehau и KBE, витражи, коттеджи. Более 100 фото с 2004 года.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/ghalierieia_rabot/`,
  },
  openGraph: {
    title: "Галерея работ компании «Окна Центр» — Владивосток",
    description: "Более 100 реальных фото выполненных объектов: балконы, лоджии, окна, фасады.",
    url: `${COMPANY_INFO.domain}/ghalierieia_rabot/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#03070D] text-white min-h-screen pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-cyan-300 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-200">Галерея работ</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>100+ реальных объектов</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Галерея наших работ
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-6">
            В этом разделе собраны подлинные фотографии объектов, выполненных специалистами компании «Окна Центр» во Владивостоке, Уссурийске, Артёме и пригороде. Никаких чужих 3D-рендеров — только фактические результаты нашей работы.
          </p>
        </div>
      </section>

      {/* Full Gallery (without limit so all 100+ photos display) */}
      <ProjectsGallery />

      {/* Pre-footer CTA */}
      <section className="py-20 bg-slate-950 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Хотите такой же балкон или теплые окна?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Вызовите инженера-замерщика бесплатно: мастер приедет с образцами материалов, выполнит лазерный замер проемов и рассчитает итоговую смету.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Вызвать замерщика 0 ₽
            </Link>
            <a
              href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{COMPANY_INFO.mainPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
