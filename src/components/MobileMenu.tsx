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

  const numberedNav = [
    { num: "01", label: "Окна", href: "/kupit_plastikovye_okna_vladivostok" },
    { num: "02", label: "Балконы и лоджии", href: "/osteklenie_balkona_vladivostok" },
    { num: "03", label: "Алюминиевые конструкции", href: "/alyuminievye_okna_vladivostok" },
    { num: "04", label: "Ремонт окон", href: "/remont_plastikovyh_okon_vladivostok" },
    { num: "05", label: "Наши работы", href: "/ghalierieia_rabot" },
    { num: "06", label: "Цены", href: "/#prices" },
    { num: "07", label: "О компании", href: "/okonnaia_kompaniia_vladivostok" },
    { num: "08", label: "Контакты", href: "/contacts" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#03070E] text-white flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
      {/* Top bar */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex flex-col">
          <span className="text-xl font-bold uppercase tracking-tight text-white font-sans">
            ОКНА<span className="text-cyan-400">-</span>ЦЕНТР
          </span>
          <span className="text-[10px] font-mono text-slate-400 tracking-wider">
            Владивосток · с 2004 года
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Закрыть меню"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main numbered navigation links */}
      <div className="px-6 py-8 space-y-3 flex-1">
        {numberedNav.map((item, idx) => (
          <Link
            key={item.num}
            href={item.href}
            onClick={onClose}
            className="group flex items-center justify-between py-3 border-b border-white/5"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-cyan-400">{item.num}</span>
              <span className="text-2xl font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                {item.label}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Footer contacts & quick actions */}
      <div className="p-6 bg-slate-950/80 border-t border-white/10 space-y-4">
        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="font-medium text-white">Владивосток и Уссурийск</span>
          </div>
          <p className="text-[11px] text-slate-400 pl-6">Перед визитом уточните адрес офиса по телефону</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${CONTACTS.phones.mainRaw}`}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>{CONTACTS.phones.mainDisplay}</span>
          </a>

          <a
            href={CONTACTS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        <Link
          href="/zaiavka_na_uslughi_kompanii_oknatsientr"
          onClick={onClose}
          className="block w-full py-4 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30"
        >
          Бесплатный выезд замерщика 0 ₽
        </Link>
      </div>
    </div>
  );
}
