import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { BENTO_SERVICES } from "@/data/home";
import { asset } from "@/lib/assetPath";

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Направления производства</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Архитектурные решения для дома и бизнеса
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-md leading-relaxed">
            От энергоэффективных пластиковых окон до панорамных раздвижных порталов и комплексного остекления балконов под ключ.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BENTO_SERVICES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 hover:border-cyan-500/50 transition-all duration-500 flex flex-col justify-between ${item.cols} min-h-[360px] shadow-md hover:shadow-2xl`}
            >
              {/* Background image with high clarity and contrast gradient */}
              <div className="absolute inset-0">
                <Image
                  src={asset(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
              </div>

              {/* Top tag & Price */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-900 uppercase tracking-wider bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-200 shadow-sm font-semibold">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-white font-mono bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                  {item.price}
                </span>
              </div>

              {/* Bottom content */}
              <div className="relative z-10 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed mb-6 max-w-xl">
                  {item.tagline}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold group-hover:text-white transition-colors">
                  <span>Перейти в раздел</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
