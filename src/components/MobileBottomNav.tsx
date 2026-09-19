"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export default function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Быстрые действия"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 transition-colors active:scale-95"
        >
          <Phone className="w-4 h-4 text-cyan-600 mb-1" />
          <span className="text-[11px] font-semibold">Позвонить</span>
        </a>

        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors active:scale-95"
        >
          <MessageCircle className="w-4 h-4 mb-1 text-emerald-600" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <Link
          href="/zaiavka_na_uslughi_kompanii_oknatsientr"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-transform active:scale-95 shadow-md shadow-slate-900/10"
        >
          <Calculator className="w-4 h-4 mb-1 text-cyan-300" />
          <span className="text-[11px]">Расчет 0 ₽</span>
        </Link>
      </div>
    </nav>
  );
}
