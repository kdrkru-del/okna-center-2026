import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, MapPin, Eye, Sparkles } from "lucide-react";
import { KEY_OBJECTS, galleryItems } from "@/data/gallery_data";
import { asset } from "@/lib/assetPath";

export default function KeyObjectsShowcase() {
  // 4 flagship large construction projects
  const flagshipObjects = KEY_OBJECTS.slice(0, 4);

  // 6 diverse real residential & commercial projects
  const previewWorks = galleryItems
    .filter((item) => !item.isKeyObject)
    .slice(0, 6);

  return (
    <section id="portfolio-showcase" className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Фактические результаты с 2004 года</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Ключевые объекты и выполненные работы
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              Остекляем как типовые квартиры и теплые лоджии, так и масштабные 25-этажные жилые комплексы и объекты Министерства обороны в Приморском крае.
            </p>
          </div>

          <Link
            href="/ghalierieia_rabot"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider border border-white/20 hover:border-white transition-all shadow-sm group self-start md:self-auto"
          >
            <span>Вся фотогалерея (40+ работ)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1. Flagship Construction Projects Grid (4 Large Cards) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Крупные объекты остекления домов и ЖК
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Собственное производство и монтаж по ГОСТ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flagshipObjects.map((obj) => (
              <div
                key={obj.id}
                className="group rounded-3xl overflow-hidden bg-slate-800/80 border border-slate-700/70 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-cyan-950/40"
              >
                {/* Photo container */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={asset(obj.src)}
                    alt={obj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-800/50">
                      {obj.badge}
                    </span>
                  </div>

                  {/* Location strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate font-medium">{obj.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                      {obj.title}
                    </h3>
                    <div className="space-y-1 text-xs text-slate-400">
                      {obj.client && (
                        <div>
                          <span className="text-slate-500">Заказчик:</span>{" "}
                          <span className="text-slate-300 font-medium">{obj.client}</span>
                        </div>
                      )}
                      {obj.specs && (
                        <div>
                          <span className="text-slate-500">Объем:</span>{" "}
                          <span className="text-slate-300 font-medium">{obj.specs}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Residential & Commercial Works Grid (6 Diverse Cards) */}
        <div>
          <div className="flex items-center justify-between mb-6 pt-8 border-t border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Примеры работ для квартир, коттеджей и лоджий
            </span>
            <Link
              href="/ghalierieia_rabot"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center gap-1 group"
            >
              <span>Смотреть все работы</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {previewWorks.map((work) => (
              <Link
                key={work.id}
                href="/ghalierieia_rabot"
                className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 aspect-square hover:border-cyan-400/60 transition-all shadow-md block"
              >
                <Image
                  src={asset(work.src)}
                  alt={work.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                    {work.title}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-300 mt-1 flex items-center gap-1">
                    <Eye className="w-2.5 h-2.5" />
                    Подробнее
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Нужен индивидуальный расчет окон или остекления?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Рассчитаем стоимость по вашим размерам или организуем бесплатный выезд инженера на замер.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="w-full sm:w-auto px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all text-center whitespace-nowrap shadow-lg shadow-cyan-600/30"
            >
              Вызвать замерщика 0 ₽
            </Link>
            <Link
              href="/ghalierieia_rabot"
              className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl text-xs uppercase tracking-wider transition-all text-center whitespace-nowrap border border-white/20"
            >
              Все объекты →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
