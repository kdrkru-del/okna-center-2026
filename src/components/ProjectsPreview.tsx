"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery_data";
import { asset } from "@/lib/assetPath";

export default function ProjectsPreview() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", label: "Все проекты" },
    { id: "windows", label: "Окна" },
    { id: "balconies", label: "Балконы" },
    { id: "finishing", label: "Отделка" },
    { id: "facades", label: "Алюминий" },
  ];

  const filtered = galleryItems
    .filter((item) => activeTab === "all" || item.category === activeTab)
    .slice(0, 6);

  return (
    <section className="py-24 bg-[#05080E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Не обещаем на словах.
              <br />
              <span className="text-slate-400 font-light">Показываем в работах.</span>
            </h2>
          </div>

          <Link
            href="/ghalierieia_rabot"
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>Смотреть всю галерею выполненных работ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filtered.map((item, idx) => {
            // Asymmetric layout: 1st card 7 cols, 2nd card 5 cols, then 4, 4, 4
            let colSpan = "md:col-span-4";
            if (idx === 0) colSpan = "md:col-span-7";
            if (idx === 1) colSpan = "md:col-span-5";

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 aspect-4/3 md:aspect-auto min-h-[300px] ${colSpan} hover:border-cyan-400/50 transition-all hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]`}
              >
                <Image
                  src={asset(item.src)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    {item.location}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
