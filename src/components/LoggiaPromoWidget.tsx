"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, CheckCircle2, Sparkles, ArrowRight, ChevronLeft, Ruler } from "lucide-react";
import { LOGGIA_PROMO_CONFIG, PromoOption } from "@/data/promo_config";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone } from "@/lib/phoneMask";
import { reachGoal } from "@/components/YandexMetrika";
import { useMeasurementModal } from "@/context/ModalContext";
import { asset } from "@/lib/assetPath";

const SESSION_DISMISSED_KEY = "_okna_loggia_promo_dismissed_v3";

function normalizePathname(pathname: string | null): string {
  if (!pathname) return "/";
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function isPromoAllowedOnPath(pathname: string | null): boolean {
  if (!LOGGIA_PROMO_CONFIG.enabled) return false;
  const norm = normalizePathname(pathname);

  for (const excluded of LOGGIA_PROMO_CONFIG.excludedPaths) {
    if (norm === excluded || norm.startsWith(`${excluded}/`)) {
      return false;
    }
  }

  if (LOGGIA_PROMO_CONFIG.allowedDesktopPaths.includes("*")) {
    return true;
  }

  return LOGGIA_PROMO_CONFIG.allowedDesktopPaths.includes(norm);
}

/**
 * Built-in Mobile Promo Section placed right after the first Hero screen on the Homepage.
 * Hidden on tablet/desktop (md:hidden) where the desktop popup is used.
 */
export function LoggiaPromoMobileSection() {
  const { openMeasurementModal } = useMeasurementModal();
  const [selectedMeters, setSelectedMeters] = useState<"3m" | "6m">("3m");

  if (!LOGGIA_PROMO_CONFIG.enabled) return null;

  const handleOpenModal = (customLabel?: string) => {
    const label =
      customLabel ||
      (selectedMeters === "3m"
        ? "Акция: Лоджия 3 метра — 69 000 ₽"
        : "Акция: Лоджия 6 метров — 99 000 ₽");
    reachGoal("promo_loggia_mobile_click", { option: label });
    openMeasurementModal(label);
  };

  return (
    <section
      className="md:hidden px-4 pt-5 pb-2 bg-white"
      aria-label="Спецпредложение на остекление лоджии"
      data-testid="loggia-promo-mobile-section"
    >
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-5 border border-slate-700/80 shadow-xl relative overflow-hidden">
        {/* Subtle ambient accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>СПЕЦПРЕДЛОЖЕНИЕ</span>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-extrabold tracking-tight text-white leading-snug mb-4">
          Лоджия под ключ по фиксированной цене
        </h2>

        {/* Two Side-by-Side Price Cards */}
        <div className="grid grid-cols-2 gap-3 mb-3.5">
          <button
            type="button"
            onClick={() => {
              setSelectedMeters("3m");
              handleOpenModal("Акция: Лоджия 3 метра — 69 000 ₽");
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedMeters === "3m"
                ? "bg-white text-slate-950 border-cyan-400 shadow-md"
                : "bg-slate-800/90 text-white border-slate-700 hover:border-slate-600"
            }`}
          >
            <span
              className={`text-xs font-bold block ${
                selectedMeters === "3m" ? "text-slate-600" : "text-slate-300"
              }`}
            >
              3 метра
            </span>
            <span
              className={`text-xl font-black font-mono tracking-tight block mt-1 ${
                selectedMeters === "3m" ? "text-slate-950" : "text-white"
              }`}
            >
              69 000 ₽
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMeters("6m");
              handleOpenModal("Акция: Лоджия 6 метров — 99 000 ₽");
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedMeters === "6m"
                ? "bg-white text-slate-950 border-cyan-400 shadow-md"
                : "bg-slate-800/90 text-white border-slate-700 hover:border-slate-600"
            }`}
          >
            <span
              className={`text-xs font-bold block ${
                selectedMeters === "6m" ? "text-slate-600" : "text-slate-300"
              }`}
            >
              6 метров
            </span>
            <span
              className={`text-xl font-black font-mono tracking-tight block mt-1 ${
                selectedMeters === "6m" ? "text-slate-950" : "text-white"
              }`}
            >
              99 000 ₽
            </span>
          </button>
        </div>

        {/* Subtext */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Остекление и работы по акции. Точная комплектация уточняется после замера.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => handleOpenModal()}
          data-testid="loggia-promo-mobile-cta"
          className="w-full py-3.5 px-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Ruler className="w-4 h-4 shrink-0" />
          <span>Рассчитать мою лоджию</span>
        </button>
      </div>
    </section>
  );
}

/**
 * Desktop-only Promo Popup Card:
 * - Strictly hidden on mobile (< md).
 * - Triggers after 10s or 35% scroll, maximum once per session, suppressed for 7 days after user closes it.
 * - Returns null when closed or not active (zero floating buttons, zero empty containers).
 */
export default function LoggiaPromoDesktopDock() {
  const pathname = usePathname();
  const promoAllowed = isPromoAllowedOnPath(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"offer" | "form" | "success">("offer");
  const [selectedOption, setSelectedOption] = useState<PromoOption>(
    LOGGIA_PROMO_CONFIG.options[0]
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 (");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const navEntries = window.performance?.getEntriesByType?.("navigation") as
        | PerformanceNavigationTiming[]
        | undefined;
      if (navEntries && navEntries[0]?.type === "reload") {
        window.sessionStorage.removeItem(SESSION_DISMISSED_KEY);
      }
    } catch {}
  }, []);

  const triggerAutoOpen = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // Never open popup on mobile

    try {
      const dismissedInSession = window.sessionStorage.getItem(SESSION_DISMISSED_KEY);
      if (dismissedInSession === "1") return;

      setIsOpen((prev) => {
        if (!prev) {
          reachGoal("promo_loggia_impression", { pathname: pathname || "/" });
        }
        return true;
      });
    } catch {
      setIsOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!promoAllowed) {
      setIsOpen(false);
      return;
    }

    if (typeof window === "undefined") return;

    // 1. Timer trigger: 2 seconds after page load
    const timer = window.setTimeout(() => {
      triggerAutoOpen();
    }, LOGGIA_PROMO_CONFIG.triggerDelayMs);

    // 2. Scroll trigger: 15% of page height
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const docEl = document.documentElement;
      const scrollable = docEl.scrollHeight - docEl.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (pct >= LOGGIA_PROMO_CONFIG.triggerScrollPercent) {
        triggerAutoOpen();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [promoAllowed, triggerAutoOpen]);

  const handleCloseByUser = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
      } catch {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Введите корректный номер телефона (10 цифр)");
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name,
        phone,
        service: "Остекление лоджий по специальной цене",
        promoOption: selectedOption.fullLabel,
        comment: `Заявка из десктопного окна акции на лоджии: ${selectedOption.fullLabel}`,
        source: `Окно акции на лоджии (${selectedOption.fullLabel})`,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
      });

      if (result.ok) {
        setMode("success");
        reachGoal("promo_loggia_submit", {
          option: selectedOption.fullLabel,
          device: "desktop_popup",
        });
      } else {
        setError(result.error || "Ошибка отправки. Позвоните: 8 (423) 2-725-725");
      }
    } catch {
      setError("Ошибка отправки. Позвоните: 8 (423) 2-725-725");
    } finally {
      setLoading(false);
    }
  };

  // Return null when not open so no empty container or floating element exists
  if (!promoAllowed || !isOpen) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-label={LOGGIA_PROMO_CONFIG.heading}
      data-testid="loggia-promo-slide-card"
      className="hidden md:block fixed bottom-5 right-5 z-40 w-[370px] rounded-3xl bg-white border border-slate-200/95 shadow-[0_24px_60px_rgba(15,23,42,0.22)] overflow-hidden text-slate-900 animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      {/* Top Visual Header with Photo + Close X */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <Image
          src={asset(LOGGIA_PROMO_CONFIG.imagePath)}
          alt={LOGGIA_PROMO_CONFIG.imageAlt}
          fill
          sizes="370px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/30" />

        {/* Top Bar: Close Button */}
        <div className="absolute top-3 right-3 flex items-center justify-end">
          <button
            type="button"
            onClick={handleCloseByUser}
            aria-label="Закрыть акционное предложение"
            data-testid="loggia-promo-close-btn"
            className="w-8 h-8 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Overlay: Badge + Title */}
        <div className="absolute bottom-3 left-3.5 right-3.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider mb-1.5 shadow-xs">
            <Sparkles className="w-3 h-3" />
            {LOGGIA_PROMO_CONFIG.badge}
          </span>
          <h3 className="text-[15px] font-extrabold text-white uppercase tracking-tight leading-snug">
            {LOGGIA_PROMO_CONFIG.heading}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3.5">
        {mode === "offer" && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              {LOGGIA_PROMO_CONFIG.options.map((opt) => {
                const active = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-cyan-50/90 border-cyan-600 ring-1 ring-cyan-500/30 shadow-xs"
                        : "bg-slate-50 border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-700 block">
                      {opt.title}
                    </span>
                    <span className="text-xl font-black text-slate-950 font-mono tracking-tight block mt-0.5">
                      {opt.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 leading-snug">
              {LOGGIA_PROMO_CONFIG.disclaimer}
            </p>

            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setMode("form")}
                data-testid="loggia-promo-open-form-btn"
                className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/10"
              >
                <span>Рассчитать мою лоджию</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {mode === "form" && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMode("offer")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Назад</span>
              </button>
              <span className="text-xs font-bold text-cyan-700">
                Расчёт стоимости по акции
              </span>
            </div>

            {/* Option selector inside form */}
            <div className="grid grid-cols-2 gap-2">
              {LOGGIA_PROMO_CONFIG.options.map((opt) => {
                const active = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? "bg-cyan-50 border-cyan-600 text-slate-950 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-[11px] block">{opt.title}</span>
                    <span className="text-xs font-black font-mono block">{opt.price}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none focus:bg-white focus:border-cyan-600"
              />
            </div>

            <div>
              <input
                type="tel"
                required
                value={phone}
                onFocus={() => {
                  if (!phone || phone.length <= 4) setPhone("+7 (");
                }}
                onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
                placeholder="+7 (999) 000-00-00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs font-medium outline-none focus:bg-white focus:border-cyan-600"
              />
            </div>

            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-snug">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        )}

        {mode === "success" && (
          <div className="text-center py-3 space-y-3">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Заявка принята!</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Мы зафиксировали за вами спецпредложение:{" "}
              <strong className="text-slate-900">{selectedOption.fullLabel}</strong>.
              Менеджер свяжется с вами в ближайшее время.
            </p>
            <button
              type="button"
              onClick={handleCloseByUser}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
