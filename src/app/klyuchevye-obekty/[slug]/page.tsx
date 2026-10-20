import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowLeft,
  MapPin,
  Building2,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { KEY_OBJECTS } from "@/data/gallery_data";
import { COMPANY_INFO } from "@/data/company_info";
import KeyObjectDetailClient from "@/components/KeyObjectDetailClient";
import LeadForm from "@/components/LeadForm";
import { asset } from "@/lib/assetPath";

export function generateStaticParams() {
  return KEY_OBJECTS.map((obj) => ({
    slug: obj.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = KEY_OBJECTS.find((o) => o.id === slug);

  if (!item) {
    return {
      title: "Объект не найден",
    };
  }

  const title = `${item.title} (${item.location}) — Ключевые объекты «Окна Центр»`;
  const description = `${item.title}, ${item.location}. Заказчик: ${
    item.client || "Застройщик"
  }. Выполненные работы: ${
    item.scope || item.specs || "Комплексное остекление"
  }. Реализованный проект компании «Окна Центр».`;

  return {
    title,
    description,
    alternates: {
      canonical: `${COMPANY_INFO.domain}/klyuchevye-obekty/${item.id}/`,
    },
    openGraph: {
      title,
      description,
      url: `${COMPANY_INFO.domain}/klyuchevye-obekty/${item.id}/`,
      siteName: COMPANY_INFO.name,
      locale: "ru_RU",
      type: "article",
      images: [
        {
          url: `${COMPANY_INFO.domain}${item.src}`,
          alt: `${item.title} — ${item.location}`,
        },
      ],
    },
  };
}

export default async function KeyObjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = KEY_OBJECTS.find((o) => o.id === slug);

  if (!item) {
    notFound();
  }

  const otherObjects = KEY_OBJECTS.filter((o) => o.id !== item.id).slice(0, 4);
  const photos = item.photos && item.photos.length > 0 ? item.photos : [item.src];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description:
      item.description ||
      `${item.title} (${item.location}) — ${item.scope || item.specs}`,
    url: `${COMPANY_INFO.domain}/klyuchevye-obekty/${item.id}/`,
    image: photos.map((p) => `${COMPANY_INFO.domain}${p}`),
    creator: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.domain,
      telephone: COMPANY_INFO.mainPhone,
    },
    locationCreated: {
      "@type": "Place",
      name: item.location,
    },
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
      {
        "@type": "ListItem",
        position: 3,
        name: item.shortTitle || item.title,
        item: `${COMPANY_INFO.domain}/klyuchevye-obekty/${item.id}/`,
      },
    ],
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-20 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav
          className="flex items-center gap-2 text-xs text-slate-500 font-mono overflow-x-auto whitespace-nowrap"
          aria-label="Хлебные крошки"
        >
          <Link href="/" className="hover:text-cyan-700 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
          <Link
            href="/klyuchevye-obekty"
            className="hover:text-cyan-700 transition-colors"
          >
            Ключевые объекты
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">
            {item.shortTitle || item.title}
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6">
          <Link
            href="/klyuchevye-obekty"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700 hover:text-cyan-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Все ключевые объекты</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            {item.badge && (
              <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-mono font-bold">
                {item.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              {item.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {item.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Gallery & Lightbox + Contact Actions */}
          <div className="lg:col-span-8">
            <KeyObjectDetailClient item={item} />
          </div>

          {/* Right Column: Project Passport Card */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  Паспорт объекта
                </span>
                <h2 className="text-xl font-extrabold text-white">
                  Характеристики проекта
                </h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="pb-3.5 border-b border-white/10">
                  <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    Локация объекта:
                  </span>
                  <span className="font-bold text-white text-base">
                    {item.location}
                  </span>
                </div>

                {item.client && (
                  <div className="pb-3.5 border-b border-white/10">
                    <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      Заказчик / Застройщик:
                    </span>
                    <span className="font-bold text-white text-base">
                      {item.client}
                    </span>
                  </div>
                )}

                <div className="pb-3.5 border-b border-white/10">
                  <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Выполненные работы и объём:
                  </span>
                  <span className="font-extrabold text-cyan-300 text-base">
                    {item.scope || item.specs}
                  </span>
                </div>

                {item.year && (
                  <div className="pb-3.5 border-b border-white/10">
                    <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Период реализации:
                    </span>
                    <span className="font-bold text-white">{item.year}</span>
                  </div>
                )}
              </div>

              {item.description && (
                <div className="space-y-2 pt-1">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    О проекте
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              )}

              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Ключевые параметры
                  </h3>
                  <ul className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Other Key Objects Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Другие ключевые объекты компании
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Посмотрите другие реализованные проекты остекления жилых комплексов и зданий
            </p>
          </div>
          <Link
            href="/klyuchevye-obekty"
            className="text-xs font-bold uppercase tracking-wider text-cyan-700 hover:text-cyan-900 inline-flex items-center gap-1.5"
          >
            <span>Все ключевые объекты ({KEY_OBJECTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherObjects.map((obj) => (
            <Link
              key={obj.id}
              href={`/klyuchevye-obekty/${obj.id}`}
              className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-cyan-500/50 hover:bg-white shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <Image
                  src={asset(obj.src)}
                  alt={obj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 right-3 text-[11px] text-white font-medium flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{obj.location}</span>
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {obj.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {obj.scope || obj.specs}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-cyan-700">
                  <span>Открыть объект</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />
    </div>
  );
}
