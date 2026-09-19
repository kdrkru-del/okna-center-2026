"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems, GalleryItem } from "@/data/gallery_data";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { asset } from "@/lib/assetPath";

export default function ProjectsGallery({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-3">
              Портфолио выполненных работ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Наши работы в Приморском крае
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-light mt-2 max-w-2xl">
              Только реальные фотографии объектов компании «Окна Центр». Установка окон, остекление и отделка балконов, фасадные работы во Владивостоке и Уссурийске.
            </p>
          </div>

          <Link
            href="/zaiavka_na_uslughi_kompanii_oknatsientr"
            className="px-5 py-2.5 bg-slate-950 hover:bg-cyan-600 text-white rounded-full text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start md:self-auto shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Рассчитать аналогичный проект</span>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-200">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer aspect-4/3 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-slate-900/10"
            >
              <Image
                src={asset(item.src)}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-white line-clamp-2">{item.title}</span>
                <span className="text-[10px] text-cyan-300 font-mono mt-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Увеличить фото
                </span>
              </div>
            </div>
          ))}
        </div>

        {limit && galleryItems.length > limit && (
          <div className="text-center mt-12">
            <Link
              href="/ghalierieia_rabot"
              className="px-8 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white rounded-2xl text-xs uppercase font-mono tracking-wider transition-colors inline-block shadow-md shadow-slate-900/10"
            >
              Посмотреть все работы в галерее →
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveItem(null)}
        >
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden">
              <Image
                src={asset(activeItem.src)}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center max-w-xl">
              <div className="text-sm sm:text-base font-semibold text-white">{activeItem.title}</div>
              <div className="text-xs text-cyan-400 font-mono mt-1">{activeItem.location}</div>
              <div className="mt-3">
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-block"
                >
                  Заказать такой же проект
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
