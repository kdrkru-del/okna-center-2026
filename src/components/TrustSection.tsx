import React from "react";
import { HOME_STATEMENT } from "@/data/home";
import { Award, ShieldCheck, Ruler, CheckCircle2 } from "lucide-react";

export default function TrustSection() {
  return (
    <section id="statement" className="py-24 bg-[#050910] text-white border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 block">
            {HOME_STATEMENT.yearsActive}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-slate-50 mb-6">
            {HOME_STATEMENT.headline}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            {HOME_STATEMENT.subtext}
          </p>
        </div>

        {/* Tags line */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-16">
          {HOME_STATEMENT.tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                {tag.label}
              </span>
              <span className="text-[11px] text-slate-400 font-light hidden sm:inline">
                ({tag.desc})
              </span>
            </div>
          ))}
        </div>

        {/* Verified Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HOME_STATEMENT.stats.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tracking-tight mb-1">
                {st.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{st.label}</div>
              <div className="text-xs text-slate-400 font-light">{st.note}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
