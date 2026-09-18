"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export default function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 pb-safe"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Быстрые действия"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors active:scale-95"
        >
          <Phone className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[11px] font-semibold">Позвонить</span>
        </a>

        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors active:scale-95"
        >
          <MessageCircle className="w-4 h-4 mb-1" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <Link
          href="/zaiavka_na_uslughi_kompanii_oknatsientr"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold transition-transform active:scale-95 shadow-md shadow-cyan-500/20"
        >
          <Calculator className="w-4 h-4 mb-1" />
          <span className="text-[11px]">Расчет 0 ₽</span>
        </Link>
      </div>
    </nav>
  );
}
