"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NavSection } from "@/data/navigation";
import { asset } from "@/lib/assetPath";

interface MegaMenuProps {
  section: NavSection;
  onClose: () => void;
}

export default function MegaMenu({ section, onClose }: MegaMenuProps) {
  if (!section.megaMenu) return null;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-[92vw] max-w-5xl pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="bg-[#050A12]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.8)] grid grid-cols-12 gap-8 text-white">
        
        {/* Left Columns: Categories & Links */}
        <div className="col-span-8 grid grid-cols-2 gap-8 border-r border-white/10 pr-6">
          {section.megaMenu.categories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
                {cat.title}
              </span>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/link block p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover/link:text-cyan-300 transition-colors flex items-center justify-between">
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-cyan-400" />
                      </div>
                      {item.desc && (
                        <p className="text-xs text-slate-400 font-light leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 pt-2 border-t border-white/5 flex items-center justify-between">
            <Link
              href={section.href}
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-wider text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Смотреть все решения раздела «{section.label}»</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Preview */}
        <div className="col-span-4 flex flex-col justify-between">
          <div className="group relative rounded-2xl overflow-hidden aspect-4/3 border border-white/10 mb-4 bg-slate-900">
            <Image
              src={asset(section.megaMenu.featuredImage)}
              alt={section.megaMenu.featuredTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block mb-1">
                Флагманская серия
              </span>
              <h4 className="text-xs font-bold text-white leading-tight">
                {section.megaMenu.featuredTitle}
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
            {section.megaMenu.featuredDesc}
          </p>

          <Link
            href={section.megaMenu.featuredLink}
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono uppercase tracking-wider text-center transition-colors"
          >
            Подробнее о профиле →
          </Link>
        </div>

      </div>
    </div>
  );
}
