"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Share2,
  Check,
  Ruler,
  Phone,
} from "lucide-react";
import { GalleryItem } from "@/data/gallery_data";
import { COMPANY_INFO } from "@/data/company_info";
import { useMeasurementModal } from "@/context/ModalContext";
import { asset } from "@/lib/assetPath";

export function CopyObjectLinkButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/klyuchevye-obekty/${slug}/`
        : `https://окнацентр.рф/klyuchevye-obekty/${slug}/`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Скопировать прямую ссылку на этот объект для отправки заказчику"
      className={
        compact
          ? "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          : "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 text-xs font-semibold transition-colors cursor-pointer"
      }
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700">Ссылка скопирована</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-cyan-600" />
          <span>Скопировать ссылку</span>
        </>
      )}
    </button>
  );
}

export default function KeyObjectDetailClient({ item }: { item: GalleryItem }) {
  const { openMeasurementModal } = useMeasurementModal();
  const photos =
    item.photos && item.photos.length > 0 ? item.photos : [item.src];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevPhoto = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const nextPhoto = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowLeft") prevPhoto();
      else if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, prevPhoto, nextPhoto]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) prevPhoto();
      else nextPhoto();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-8">
      {/* Main Interactive Photo Showcase */}
      <div className="space-y-4">
        <div
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl group cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={asset(photos[activeIndex])}
            alt={`${item.title} — фото ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Top Right Zoom Pill */}
          <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/15 shadow-sm">
            <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>На весь экран ({activeIndex + 1}/{photos.length})</span>
          </div>

          {/* Prev/Next Controls if multi-photo */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                aria-label="Предыдущее фото"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                aria-label="Следующее фото"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails Grid */}
        {photos.length > 1 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((photoSrc, idx) => (
              <button
                key={photoSrc}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "border-cyan-600 ring-2 ring-cyan-500/30 shadow-md"
                    : "border-slate-200 opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={asset(photoSrc)}
                  alt={`${item.title} — ракурс ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Bar: Contact & Share */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Обсудить аналогичный проект или заказать расчёт
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Работаем с застройщиками, генподрядчиками, государственными заказчиками и частными лицами
            </p>
          </div>
          <CopyObjectLinkButton slug={item.id} />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => openMeasurementModal(`Объект: ${item.title}`)}
            className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Ruler className="w-4 h-4 text-cyan-400" />
            <span>Запросить расчёт / замер</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
            className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs font-mono tracking-wide transition-colors inline-flex items-center gap-2 shadow-2xs"
          >
            <Phone className="w-4 h-4 text-cyan-600" />
            <span>{COMPANY_INFO.mainPhone}</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white mb-4 z-10">
            <div className="truncate pr-4">
              <span className="text-sm sm:text-base font-bold">{item.title}</span>
              <span className="text-xs text-slate-400 font-mono ml-3">
                Фото {activeIndex + 1} из {photos.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Закрыть полноэкранный просмотр"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Area */}
          <div
            className="relative w-full max-w-5xl h-[72vh] sm:h-[78vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={asset(photos[activeIndex])}
              alt={`${item.title} — фото ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Предыдущее фото"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Следующее фото"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
