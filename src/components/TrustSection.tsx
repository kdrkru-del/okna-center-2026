import React from "react";
import Link from "next/link";
import { ArrowRight, AppWindow, Wrench, Home as HomeIcon, PenTool, CheckCircle2 } from "lucide-react";
import { HOME_PRACTICAL_NEEDS } from "@/data/home";

const ICON_MAP: Record<string, React.ElementType> = {
  Window: AppWindow,
  Wrench: Wrench,
  Home: HomeIcon,
  PenTool: PenTool,
};

export default function TrustSection() {
  return (
    <section id="needs" className="py-20 sm:py-24 bg-slate-50 text-slate-900 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-950 mb-4">
            {HOME_PRACTICAL_NEEDS.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {HOME_PRACTICAL_NEEDS.subtitle}
          </p>
        </div>



        {/* 4 Practical Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_PRACTICAL_NEEDS.cards.map((card) => {
            const Icon = ICON_MAP[card.icon] || AppWindow;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 group-hover:bg-slate-950 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold font-mono text-slate-950 px-3 py-1 rounded-full bg-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-800 transition-colors">
                      {card.price}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 group-hover:text-cyan-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700 group-hover:text-slate-950 transition-colors">
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
