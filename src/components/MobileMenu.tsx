"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { MAIN_NAVIGATION } from "@/data/navigation";
import { CONTACTS } from "@/data/contact";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "Окна", href: "/kupit_plastikovye_okna_vladivostok" },
    { label: "Балконы и лоджии", href: "/osteklenie_balkona_vladivostok" },
    { label: "Алюминиевые конструкции", href: "/alyuminievye_okna_vladivostok" },
    { label: "Ремонт окон", href: "/remont_plastikovyh_okon_vladivostok" },
    { label: "Наши работы", href: "/ghalierieia_rabot" },
    { label: "Цены", href: "/#prices" },
    { label: "О компании", href: "/okonnaia_kompaniia_vladivostok" },
    { label: "Контакты", href: "/contacts" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-white/98 text-slate-900 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
      {/* Top bar */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200/80">
        <div className="flex flex-col">
          <span className="text-xl font-bold uppercase tracking-tight text-slate-950 font-sans">
            ОКНА<span className="text-cyan-600">-</span>ЦЕНТР
          </span>
          <span className="text-[10px] font-mono text-slate-500 tracking-wider">
            Владивосток · с 2004 года
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Закрыть меню"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main navigation links */}
      <div className="px-6 py-8 space-y-3 flex-1">
        {navLinks.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-center justify-between py-3 border-b border-slate-100"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                {item.label}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Footer contacts & quick actions */}
      <div className="p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-600 flex-shrink-0" />
            <span className="font-semibold text-slate-900">Владивосток и Уссурийск</span>
          </div>
          <p className="text-[11px] text-slate-500 pl-6">Перед визитом уточните адрес офиса по телефону</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${CONTACTS.phones.mainRaw}`}
            className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-cyan-600" />
            <span>{CONTACTS.phones.mainDisplay}</span>
          </a>

          <a
            href={CONTACTS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>

        <Link
          href="/zaiavka_na_uslughi_kompanii_oknatsientr"
          onClick={onClose}
          className="block w-full py-4 text-center rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-slate-900/10 transition-colors"
        >
          Бесплатный выезд замерщика 0 ₽
        </Link>
      </div>
    </div>
  );
}
