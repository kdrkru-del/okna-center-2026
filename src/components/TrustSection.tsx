import React from "react";
import { HOME_STATEMENT } from "@/data/home";

export default function TrustSection() {
  return (
    <section id="statement" className="py-24 bg-slate-50 text-slate-900 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-950 mb-6">
            {HOME_STATEMENT.headline}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {HOME_STATEMENT.subtext}
          </p>
        </div>

        {/* Tags line */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-16">
          {HOME_STATEMENT.tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-cyan-500/50 hover:shadow-md transition-all flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-900">
                {tag.label}
              </span>
              <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
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
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-tight mb-1">
                {st.value}
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">{st.label}</div>
              <div className="text-xs text-slate-500">{st.note}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
