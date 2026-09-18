import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, Ruler } from "lucide-react";
import { CONTACTS } from "@/data/contact";

export default function FinalCTA() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#03060B] to-[#010307] text-white relative border-t border-white/10 overflow-hidden">
      {/* Subtle backdrop overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
          <Ruler className="w-3.5 h-3.5" />
          <span>Бесплатный инженерный замер</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-slate-50">
          Ваш проект начинается
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-cyan-300 to-blue-400">
            с правильного замера.
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12">
          Инженер компании «Окна Центр» бесплатно приедет во Владивостоке или Уссурийске, привезет каталоги профилей и рассчитает смету без скрытых доплат.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/zaiavka_na_uslughi_kompanii_oknatsientr"
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all transform active:scale-98 flex items-center gap-2"
          >
            <span>Записаться на замер</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`tel:${CONTACTS.phones.mainRaw}`}
            className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs sm:text-sm uppercase tracking-wider border border-white/10 flex items-center gap-2 transition-colors active:scale-98"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>{CONTACTS.phones.mainDisplay}</span>
          </a>

          <a
            href={CONTACTS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs sm:text-sm uppercase tracking-wider border border-emerald-500/30 flex items-center gap-2 transition-colors active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Работаем с 2004 года · Владивосток · Уссурийск · Приморский край
        </div>
      </div>
    </section>
  );
}
