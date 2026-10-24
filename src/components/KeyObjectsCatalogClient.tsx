"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  MapPin,
  Camera,
  CheckCircle2,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { GalleryItem } from "@/data/gallery_data";
import { asset } from "@/lib/assetPath";
import { useMeasurementModal } from "@/context/ModalContext";

interface LightboxState {
  item: GalleryItem;
  photoIndex: number;
}

export default function KeyObjectsCatalogClient({
  items,
}: {
  items: GalleryItem[];
}) {
  const { openMeasurementModal } = useMeasurementModal();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activePhotos = lightbox
    ? lightbox.item.photos && lightbox.item.photos.length > 0
      ? lightbox.item.photos
      : [lightbox.item.src]
    : [];

  const prevPhoto = useCallback(() => {
    if (!lightbox || activePhotos.length <= 1) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            photoIndex:
              (prev.photoIndex - 1 + activePhotos.length) % activePhotos.length,
          }
        : null
    );
  }, [lightbox, activePhotos.length]);

  const nextPhoto = useCallback(() => {
    if (!lightbox || activePhotos.length <= 1) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            photoIndex: (prev.photoIndex + 1) % activePhotos.length,
          }
        : null
    );
  }, [lightbox, activePhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowLeft") prevPhoto();
      else if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox, prevPhoto, nextPhoto]);

  // Touch swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || !lightbox) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) prevPhoto();
      else nextPhoto();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-12">
      {items.map((obj, index) => {
        const photos =
          obj.photos && obj.photos.length > 0 ? obj.photos : [obj.src];
        const isFeatured = index === 0;

        return (
          <article
            key={obj.id}
            id={obj.id}
            className={`rounded-3xl border overflow-hidden transition-all shadow-lg ${
              isFeatured
                ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-cyan-500/40 shadow-2xl"
                : "bg-white text-slate-900 border-slate-200/90 hover:border-cyan-500/50"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Visual Showcase (Click to enlarge) */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setLightbox({ item: obj, photoIndex: 0 })}
                  aria-label={`Увеличить фото: ${obj.title}`}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 group block cursor-zoom-in text-left border border-slate-800/40"
                >
                  <Image
                    src={asset(photos[0])}
                    alt={`${obj.title} — ${obj.location}, ${
                      obj.scope || obj.specs || ""
                    }`}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-75" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                      {obj.badge || "Ключевой объект"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-950 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                      <Camera className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{photos.length} фото</span>
                    </span>
                  </div>

                  {/* Bottom Bar: Location + Click to zoom prompt */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{obj.location}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md group-hover:scale-105 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Увеличить фото</span>
                    </span>
                  </div>
                </button>

                {/* Sub-photos preview strip if multiple photos */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.slice(0, 3).map((pSrc, pIdx) => (
                      <button
                        key={pSrc}
                        type="button"
                        onClick={() =>
                          setLightbox({ item: obj, photoIndex: pIdx })
                        }
                        aria-label={`Увеличить ракурс ${pIdx + 1} объекта ${
                          obj.title
                        }`}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-500/20 group block cursor-zoom-in"
                      >
                        <Image
                          src={asset(pSrc)}
                          alt={`${obj.title} — ракурс ${pIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 18vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-3 h-3 text-cyan-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Project Passport & Specifications */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-5">
                  {obj.year && (
                    <div>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-lg font-bold inline-flex items-center ${
                          isFeatured
                            ? "bg-white/10 text-cyan-300 border border-cyan-500/30"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {obj.year}
                      </span>
                    </div>
                  )}

                  <h2
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug ${
                      isFeatured ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {obj.title}
                  </h2>

                  {/* Structured Specifications Card */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 text-xs sm:text-sm ${
                      isFeatured
                        ? "bg-white/5 border-white/10 text-slate-200"
                        : "bg-slate-50 border-slate-200/80 text-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-current/10">
                      <span
                        className={
                          isFeatured ? "text-slate-400" : "text-slate-500"
                        }
                      >
                        Локация:
                      </span>
                      <span className="font-bold text-right">
                        {obj.location}
                      </span>
                    </div>

                    {obj.client && (
                      <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-current/10">
                        <span
                          className={
                            isFeatured ? "text-slate-400" : "text-slate-500"
                          }
                        >
                          Заказчик / Девелопер:
                        </span>
                        <span className="font-extrabold text-right">
                          {obj.client}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={
                          isFeatured ? "text-slate-400" : "text-slate-500"
                        }
                      >
                        Выполненные работы:
                      </span>
                      <span
                        className={`font-black text-right ${
                          isFeatured ? "text-cyan-300" : "text-cyan-800"
                        }`}
                      >
                        {obj.scope || obj.specs}
                      </span>
                    </div>
                  </div>

                  {obj.description && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isFeatured ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {obj.description}
                    </p>
                  )}

                  {obj.highlights && obj.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {obj.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className={`flex items-start gap-2 text-xs ${
                            isFeatured ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFeatured ? "text-cyan-400" : "text-cyan-600"
                            }`}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Actions (Self-contained, no external navigation) */}
                <div className="pt-6 mt-6 border-t border-current/10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLightbox({ item: obj, photoIndex: 0 })}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs border border-white/10"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Увеличить фото ({photos.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openMeasurementModal(
                        `Расчёт по аналогу: ${obj.shortTitle || obj.title}`
                      )
                    }
                    className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/15"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Запросить расчёт по аналогу</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      {/* Fullscreen Interactive Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр фото: ${lightbox.item.title}`}
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Title + Photo Counter + Close Button */}
          <div
            className="flex items-center justify-between gap-4 text-white z-10 max-w-7xl mx-auto w-full pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                {lightbox.item.client || "Ключевой объект"}
              </span>
              <h3 className="text-sm sm:text-lg font-extrabold truncate text-white">
                {lightbox.item.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activePhotos.length > 1 && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-slate-200">
                  {lightbox.photoIndex + 1} / {activePhotos.length}
                </span>
              )}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Закрыть фото"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Container with Prev/Next buttons */}
          <div
            className="relative flex-1 my-3 flex items-center justify-center max-w-6xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Предыдущее фото"
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/20 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={asset(activePhotos[lightbox.photoIndex])}
                alt={`${lightbox.item.title} — фото ${
                  lightbox.photoIndex + 1
                }`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Следующее фото"
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/20 shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Scope + Fast CTA */}
          <div
            className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 pt-2 border-t border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{lightbox.item.location}</span>
              <span className="text-slate-500">·</span>
              <span className="font-bold text-white">
                {lightbox.item.scope || lightbox.item.specs}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const label = `Заявка по объекту: ${lightbox.item.title}`;
                setLightbox(null);
                openMeasurementModal(label);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <span>Запросить смету по этому объекту</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
