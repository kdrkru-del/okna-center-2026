"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, CheckCircle2, Sparkles, ArrowRight, ChevronLeft } from "lucide-react";
import { LOGGIA_PROMO_CONFIG, PromoOption } from "@/data/promo_config";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone } from "@/lib/phoneMask";
import { reachGoal } from "@/components/YandexMetrika";
import MaxButton from "@/components/MaxButton";
import { asset } from "@/lib/assetPath";

const SESSION_SHOWN_KEY = "_okna_loggia_promo_session_v1";
const CLOSED_UNTIL_KEY = "_okna_loggia_promo_closed_until_v1";

function normalizePathname(pathname: string | null): string {
  if (!pathname) return "/";
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function isPromoAllowedOnPath(pathname: string | null): boolean {
  if (!LOGGIA_PROMO_CONFIG.enabled) return false;
  const norm = normalizePathname(pathname);

  // Explicitly exclude /klyuchevye-obekty and all its subpages
  for (const excluded of LOGGIA_PROMO_CONFIG.excludedPaths) {
    if (norm === excluded || norm.startsWith(`${excluded}/`)) {
      return false;
    }
  }

  return LOGGIA_PROMO_CONFIG.allowedDesktopPaths.includes(norm);
}

/**
 * Compact static promo block for mobile & tablet (< lg) on balcony/loggia pages,
 * plus optional desktop inline display.
 */
export function LoggiaPromoMobileBanner({ sourcePage = "balcony_page" }: { sourcePage?: string }) {
  const [selectedOption, setSelectedOption] = useState<PromoOption>(
    LOGGIA_PROMO_CONFIG.options[0]
  );
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 (");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!LOGGIA_PROMO_CONFIG.enabled) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Пожалуйста, введите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name,
        phone,
        service: "Остекление лоджий по специальной цене",
        promoOption: selectedOption.fullLabel,
        comment: `Заявка по акции: ${selectedOption.fullLabel}`,
        source: `Мобильный блок акции (${sourcePage})`,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
      });

      if (result.ok) {
        setSubmitted(true);
        reachGoal("promo_loggia_submit", {
          option: selectedOption.fullLabel,
          device: "mobile_static",
        });
      } else {
        setError(result.error || "Не удалось отправить заявку. Позвоните нам: 8 (423) 2-725-725");
      }
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам: 8 (423) 2-725-725");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="lg:hidden my-6 rounded-3xl bg-white border-2 border-cyan-500/30 shadow-xl overflow-hidden text-slate-900"
      data-testid="loggia-promo-mobile-static"
    >
      {/* Top Banner Header with Real Loggia Photo */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <Image
          src={asset(LOGGIA_PROMO_CONFIG.imagePath)}
          alt={LOGGIA_PROMO_CONFIG.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Brand + Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3" />
            {LOGGIA_PROMO_CONFIG.badge}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-950 text-[10px] font-black uppercase tracking-tight shadow-xs">
            ОКНА<span className="text-red-600">-</span>ЦЕНТР
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight uppercase tracking-tight">
            {LOGGIA_PROMO_CONFIG.heading}
          </h3>
          {LOGGIA_PROMO_CONFIG.validUntil && (
            <span className="text-[11px] text-cyan-300 font-medium block mt-0.5">
              Действует до {LOGGIA_PROMO_CONFIG.validUntil}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {submitted ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Заявка по акции принята!</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Выбранный вариант: <strong className="text-slate-900">{selectedOption.fullLabel}</strong>. Менеджер свяжется с вами в ближайшее время.
            </p>
            <MaxButton
              placement="promo_mobile_success"
              variant="primary"
              className="w-full py-3"
            />
          </div>
        ) : (
          <>
            {/* Two Contrast Price Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {LOGGIA_PROMO_CONFIG.options.map((opt) => {
                const isSelected = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedOption(opt);
                      setFormOpen(true);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-50/90 border-cyan-600 ring-1 ring-cyan-500/30 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-[11px] font-bold text-slate-700 block">
                      {opt.title}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-slate-950 font-mono block mt-0.5">
                      {opt.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              {LOGGIA_PROMO_CONFIG.disclaimer}
            </p>

            {formOpen ? (
              <form onSubmit={handleSubmit} className="space-y-3 pt-1 border-t border-slate-100">
                <div className="text-xs font-semibold text-cyan-800 bg-cyan-50 px-3 py-2 rounded-xl border border-cyan-200">
                  Выбрано: {selectedOption.fullLabel}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none focus:bg-white focus:border-cyan-600"
                />
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
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px]">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {loading ? "Отправка..." : "Отправить заявку на расчёт"}
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Получить расчёт</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <MaxButton
                  placement="promo_mobile_banner"
                  variant="primary"
                  className="w-full py-3"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Unified Desktop Bottom-Right Dock:
 * - Hosts the non-overlapping Floating MAX button AND the Loggia Special Offer Slide-in Card / Tab.
 * - Strictly hidden on mobile (< lg) so mobile screens never see popups.
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

  const triggerAutoOpen = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return; // Desktop only

    try {
      const alreadyShownInSession = window.sessionStorage.getItem(SESSION_SHOWN_KEY);
      if (alreadyShownInSession === "1") return;

      const closedUntilRaw = window.localStorage.getItem(CLOSED_UNTIL_KEY);
      if (closedUntilRaw) {
        const closedUntil = parseInt(closedUntilRaw, 10);
        if (!isNaN(closedUntil) && Date.now() < closedUntil) {
          return;
        }
      }

      window.sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
      setIsOpen(true);
      reachGoal("promo_loggia_impression", { pathname: pathname || "/" });
    } catch {}
  }, [pathname]);

  useEffect(() => {
    if (!promoAllowed) {
      setIsOpen(false);
      return;
    }

    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    // 1. Timer trigger: 10 seconds
    const timer = window.setTimeout(() => {
      triggerAutoOpen();
    }, LOGGIA_PROMO_CONFIG.triggerDelayMs);

    // 2. Scroll trigger: 35% of page height
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
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
        const suppressMs =
          LOGGIA_PROMO_CONFIG.suppressDaysAfterClose * 24 * 60 * 60 * 1000;
        window.localStorage.setItem(
          CLOSED_UNTIL_KEY,
          String(Date.now() + suppressMs)
        );
        window.sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
      } catch {}
    }
  };

  const handleManualOpen = () => {
    setMode("offer");
    setError("");
    setIsOpen(true);
    reachGoal("promo_loggia_manual_open", { pathname: pathname || "/" });
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
        comment: `Заявка из десктопного виджета акции на лоджии: ${selectedOption.fullLabel}`,
        source: `Виджет акции на лоджии (${selectedOption.fullLabel})`,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
      });

      if (result.ok) {
        setMode("success");
        reachGoal("promo_loggia_submit", {
          option: selectedOption.fullLabel,
          device: "desktop_slidein",
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

  return (
    <div
      className="hidden lg:flex fixed bottom-5 right-5 z-40 flex-col items-end gap-3 pointer-events-none"
      aria-live="polite"
    >
      {/* Expanded Slide-in Promo Card (Desktop Only) */}
      {promoAllowed && isOpen && (
        <aside
          role="dialog"
          aria-label={LOGGIA_PROMO_CONFIG.heading}
          data-testid="loggia-promo-slide-card"
          className="pointer-events-auto w-[370px] rounded-3xl bg-white border border-slate-200/95 shadow-[0_24px_60px_rgba(15,23,42,0.22)] overflow-hidden text-slate-900 animate-in slide-in-from-bottom-5 fade-in duration-300"
        >
          {/* Top Visual Header with Photo + Company Logo + Close X */}
          <div className="relative h-40 w-full overflow-hidden bg-slate-900">
            <Image
              src={asset(LOGGIA_PROMO_CONFIG.imagePath)}
              alt={LOGGIA_PROMO_CONFIG.imageAlt}
              fill
              sizes="370px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/30" />

            {/* Top Bar: Logo + Close Button */}
            <div className="absolute top-3 left-3.5 right-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md shadow-xs">
                <span className="w-4 h-4 rounded-md bg-red-600 text-white flex items-center justify-center text-[9px] font-black">
                  ОЦ
                </span>
                <span className="text-[11px] font-black tracking-tight text-slate-950 uppercase">
                  ОКНА<span className="text-red-600">-</span>ЦЕНТР
                </span>
              </div>

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
                        <span className="text-[11px] font-bold text-slate-700 block">
                          {opt.title}
                        </span>
                        <span className="text-xl font-black text-slate-950 font-mono tracking-tight block mt-0.5">
                          {opt.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {LOGGIA_PROMO_CONFIG.disclaimer}
                </p>

                <div className="space-y-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setMode("form")}
                    data-testid="loggia-promo-open-form-btn"
                    className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/10"
                  >
                    <span>Получить расчёт</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <MaxButton
                    placement="promo_desktop_card"
                    variant="primary"
                    className="w-full py-3"
                  />
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
                  <span className="text-[11px] font-bold text-cyan-700">
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
                        <span className="text-[10px] block">{opt.title}</span>
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
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] leading-snug">
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
                <MaxButton
                  placement="promo_desktop_success"
                  variant="primary"
                  className="w-full py-2.5"
                />
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Bottom-Right Horizontal Pill Bar (when Promo Card is closed or on other pages):
          Non-overlapping "Акция на лоджии" tab + Floating "Написать в MAX" button */}
      {(!promoAllowed || !isOpen) && (
        <div className="pointer-events-auto flex items-center gap-2.5">
          {promoAllowed && (
            <button
              type="button"
              onClick={handleManualOpen}
              data-testid="loggia-promo-reopen-tab"
              className="px-4 py-3 rounded-2xl bg-slate-950/95 hover:bg-slate-900 text-white border border-slate-700/80 shadow-xl flex items-center gap-2 text-xs font-bold tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{LOGGIA_PROMO_CONFIG.tabLabel}</span>
              <span className="text-amber-300 font-mono text-[11px]">от 69 000 ₽</span>
            </button>
          )}

          <MaxButton
            placement="floating_desktop_widget"
            variant="primary"
            className="py-3 px-4 rounded-2xl shadow-xl hover:-translate-y-0.5"
          />
        </div>
      )}
    </div>
  );
}
