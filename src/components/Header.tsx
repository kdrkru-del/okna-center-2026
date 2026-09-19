"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, Menu, X, Clock, ShieldCheck, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navSections = [
    {
      id: "windows",
      label: "Окна",
      href: "/kupit_plastikovye_okna_vladivostok",
      items: [
        { label: "Пластиковые окна (купить)", href: "/kupit_plastikovye_okna_vladivostok", desc: "Окна от завода с установкой и без" },
        { label: "Установка пластиковых окон", href: "/ustanovka_plastikovykh_okon_vo_vladivostokie", desc: "Монтаж по ГОСТ с гарантией по договору" },
        { label: "Замена старых окон", href: "/zamena_plastic_okon_vladivostok", desc: "Демонтаж и замена холодных рам" },
        { label: "Окна под дерево (ламинация)", href: "/okna_pod_derevo_vladivostok", desc: "Более 40 фактур дуба и ореха" },
        { label: "Окна для дачи", href: "/okna_dlya_dachi_vladivostok", desc: "Экономичные готовые решения от 4 000 ₽" },
        { label: "Профили Rehau, KBE, Funke", href: "/profil_dlya_okon", desc: "Обзор оригинальных немецких систем" },
        { label: "Жалюзи и рулонные шторы", href: "/ievro_zhaliuzi", desc: "Зебра, еврожалюзи точно в размер" },
      ],
    },
    {
      id: "balconies",
      label: "Балконы и лоджии",
      href: "/osteklenie_balkona_vladivostok",
      items: [
        { label: "Остекление балконов", href: "/osteklenie_balkona_vladivostok", desc: "Теплый ПВХ и раздвижной алюминий" },
        { label: "Лоджия под ключ", href: "/lodgia_pod_klyuch_vladivostok", desc: "Остекление, утепление и отделка" },
        { label: "Ремонт балконов (сварка/вынос)", href: "/riemont_balkonov_vo_vladivostokie", desc: "Усиление плиты, сварка парапета" },
        { label: "Ремонт лоджий (в комнату)", href: "/riemont_lodzhii_vo_vladivostokie", desc: "Трансформация в жилой кабинет" },
        { label: "Утепление лоджий и балконов", href: "/uteplenie_lodgiy_vladivostok", desc: "Изопинк, ПСБС, теплый пол" },
        { label: "Отделочные материалы", href: "/otdielochnyie_matierialy", desc: "МДФ, ПВХ-панели, утеплители" },
        { label: "Фасадные панели Ханьи", href: "/panieli_khani", desc: "Премиальная отделка камнем и кирпичом" },
        { label: "Виниловый сайдинг", href: "/vinilovyi_saidingh", desc: "Легкая ветрозащитная обшивка парапета" },
      ],
    },
    {
      id: "aluminum",
      label: "Алюминий",
      href: "/alyuminievye_okna_vladivostok",
      items: [
        { label: "Алюминиевые окна", href: "/alyuminievye_okna_vladivostok", desc: "Теплый и холодный профиль, RAL" },
        { label: "Двери и фасады ALT F50 / 150", href: "/aliuminiievyie_okna_i_dvieri", desc: "Входные группы, витражи, вентфасады" },
      ],
    },
    {
      id: "repairs",
      label: "Ремонт окон",
      href: "/remont_plastikovyh_okon_vladivostok",
      items: [
        { label: "Ремонт пластиковых окон", href: "/remont_plastikovyh_okon_vladivostok", desc: "Прайс-лист, замена уплотнителя и ручек" },
        { label: "Регулировка окон", href: "/regulirovka_plastikovykh_okon_vladivostok", desc: "Устранение продуваний, зимний прижим" },
      ],
    },
    { id: "projects", label: "Наши работы", href: "/ghalierieia_rabot" },
    { id: "prices", label: "Цены", href: "/#prices" },
    { id: "about", label: "О компании", href: "/okonnaia_kompaniia_vladivostok" },
    { id: "contacts", label: "Контакты", href: "/contacts" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2.5 sm:py-3"
            : "bg-white/30 backdrop-blur-2xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Architectural Emblem & Brand */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center p-2.5 shadow-sm text-white flex-shrink-0 group-hover:scale-105 transition-transform ring-1 ring-red-500/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <rect x="3" y="3" width="18" height="18" rx="2.5" />
                  <line x1="12" y1="3" x2="12" y2="21" strokeWidth="2" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 uppercase leading-none group-hover:text-cyan-700 transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  ОКНА<span className="text-red-600">-</span>ЦЕНТР
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-700 font-medium tracking-wide mt-1 flex items-center gap-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Владивосток · с 2004 года
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {navSections.map((sec) =>
                sec.items ? (
                  <div
                    key={sec.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(sec.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={sec.href}
                      className="px-2.5 xl:px-3 py-2 text-[13px] font-semibold text-slate-900 hover:text-cyan-700 hover:bg-white/40 transition-colors flex items-center gap-1 rounded-xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                    >
                      <span>{sec.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {openDropdown === sec.id && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 space-y-1">
                          {sec.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="text-xs font-bold text-slate-950 group-hover/item:text-cyan-700 transition-colors">
                                {item.label}
                              </div>
                              {item.desc && (
                                <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                                  {item.desc}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={sec.id}
                    href={sec.href}
                    className="px-2.5 xl:px-3 py-2 text-[13px] font-semibold text-slate-900 hover:text-cyan-700 hover:bg-white/40 transition-colors rounded-xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                  >
                    {sec.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions: Phone & CTA */}
            <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
              <div className="hidden lg:flex flex-col text-right">
                <a
                  href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                  className="text-sm sm:text-base font-bold text-slate-950 hover:text-cyan-700 transition-colors font-mono tracking-tight flex items-center gap-1.5 justify-end whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-600" />
                  {COMPANY_INFO.mainPhone}
                </a>
                <span className="text-[10px] text-slate-600 font-medium flex items-center gap-1 justify-end drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  Пн–Сб 9:00–18:00
                </span>
              </div>

              <Link
                href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-950 hover:bg-cyan-700 text-white font-bold rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-700/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Заявка на замер
              </Link>

              {/* Mobile Burger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/40 hover:bg-white/60 text-slate-900 border border-white/50 backdrop-blur-md transition-colors"
                aria-label="Открыть меню"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-2xl border-b border-slate-200 max-h-[85vh] overflow-y-auto p-6 animate-in slide-in-from-top-2 duration-300 shadow-xl">
            <div className="space-y-6">
              {navSections.map((sec) => (
                <div key={sec.id} className="border-b border-slate-100 pb-4">
                  <Link
                    href={sec.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-bold text-slate-900 uppercase tracking-wider block mb-2"
                  >
                    {sec.label}
                  </Link>
                  {sec.items && (
                    <div className="grid grid-cols-1 gap-2 pl-3">
                      {sec.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-slate-600 hover:text-cyan-600 py-1 block"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                  className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white hover:bg-cyan-600 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Позвонить: {COMPANY_INFO.mainPhone}
                </a>
                <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">Владивосток и Приморский край · с 2004 года</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
