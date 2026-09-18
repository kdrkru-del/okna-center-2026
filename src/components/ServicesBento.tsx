import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { BENTO_SERVICES } from "@/data/home";
import { asset } from "@/lib/assetPath";

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 bg-[#03060B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Направления производства</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Архитектурные решения для дома и бизнеса
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            От стандартных окон ПВХ до сложных стоечно-ригельных витражей и капитального ремонта балконов с расширением.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BENTO_SERVICES.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative rounded-3xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 flex flex-col justify-between ${item.cols} min-h-[360px] hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]`}
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-slate-950">
                <Image
                  src={asset(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />
              </div>

              {/* Top tag */}
              <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-mono text-cyan-300 uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-white font-mono bg-cyan-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30">
                  {item.price}
                </span>
              </div>

              {/* Bottom content */}
              <div className="relative z-10 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6 max-w-xl">
                  {item.tagline}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
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
