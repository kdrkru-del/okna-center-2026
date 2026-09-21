"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems, GalleryItem } from "@/data/gallery_data";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, MapPin, Building2, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { asset } from "@/lib/assetPath";

export default function ProjectsGallery({ limit, hideHeader = false }: { limit?: number; hideHeader?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  }, [activeItem, filteredItems]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handleNext, handlePrev]);

  // Calculate counts for each category
  const getCategoryCount = (catId: string) => {
    if (catId === "all") return galleryItems.length;
    return galleryItems.filter((item) => item.category === catId).length;
  };

  return (
    <section id="projects" className={`${hideHeader ? "pb-24 bg-slate-50 text-slate-900" : "py-20 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-200/80"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Фактические объекты компании</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
                Галерея наших выполненных работ
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-light mt-2 max-w-2xl leading-relaxed">
                Подлинные фотографии остекленных объектов во Владивостоке, Уссурийске и по Приморью: от масштабных жилых комплексов до типовых квартир и теплых балконов.
              </p>
            </div>

            <Link
              href="/zaiavka_na_uslughi_kompanii_oknatsientr"
              className="px-6 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white rounded-2xl text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start md:self-auto shadow-sm flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Рассчитать свой проект 0 ₽</span>
            </Link>
          </div>
        )}

        {/* Category Filters with Counts */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-slate-200">
          {galleryCategories.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200/80 shadow-2xs"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? "bg-cyan-500 text-slate-950 font-extrabold" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid of photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer flex flex-col justify-between hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-slate-900/10"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <Image
                  src={asset(item.src)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Top Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 z-20">
                  <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    Нажмите для увеличения
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug mb-2">
                  {item.title}
                </h3>
                <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  {item.client && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-700 font-medium truncate">
                      <Building2 className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                      <span className="truncate">{item.client}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {limit && filteredItems.length > limit && (
          <div className="text-center mt-12">
            <Link
              href="/ghalierieia_rabot"
              className="px-8 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white rounded-2xl text-xs uppercase font-mono tracking-wider transition-colors inline-block shadow-md shadow-slate-900/10"
            >
              Посмотреть все {filteredItems.length} работ в галерее →
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-50 cursor-pointer"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-50 cursor-pointer"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Box */}
          <div
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative w-full h-[62vh] sm:h-[72vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <Image
                src={asset(activeItem.src)}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom details */}
            <div className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 max-w-2xl w-full text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm sm:text-base font-bold text-white leading-snug">
                  {activeItem.title}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <MapPin className="w-3 h-3" />
                    {activeItem.location}
                  </span>
                  {activeItem.client && (
                    <span className="text-slate-400">
                      · Заказчик: <strong className="text-white">{activeItem.client}</strong>
                    </span>
                  )}
                  {activeItem.specs && (
                    <span className="text-slate-400">
                      · {activeItem.specs}
                    </span>
                  )}
                </div>
              </div>

              <Link
                href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md transition-colors"
              >
                Рассчитать такой же проект
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
