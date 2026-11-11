"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2 } from "lucide-react";
import { useMeasurementModal } from "@/context/ModalContext";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone, validateRussianPhone } from "@/lib/phoneMask";
import { isRepairPath } from "@/lib/repairPaths";
import { usePathname } from "next/navigation";
import { CITIES_LIST, detectInitialCity, saveSelectedCity, SupportedCity } from "@/lib/cityDetector";

export default function QuickLeadModal() {
  const { isOpen, serviceTitle, closeMeasurementModal } = useMeasurementModal();
  const pathname = usePathname();
  const isRepair = isRepairPath(pathname);
  const effectiveTitle = isRepair
    ? "Вызов мастера по ремонту окон"
    : serviceTitle || "Вызов мастера на замер";

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState<SupportedCity>("Владивосток");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false); // 152-FZ: Starts strictly false
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setConsent(false); // Reset consent to false every time modal opens
      setError("");
      setPhone("");
      setName("");
      // Smart detection of city based on campaign UTM, session or page
      setCity(detectInitialCity());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMeasurementModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMeasurementModal]);

  if (!isOpen) return null;

  const handleCityChange = (newCity: SupportedCity) => {
    setCity(newCity);
    saveSelectedCity(newCity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!consent) {
      setError("Пожалуйста, подтвердите согласие на обработку персональных данных (152-ФЗ)");
      return;
    }

    const phoneValidation = validateRussianPhone(phone);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.error || "Пожалуйста, введите полный номер телефона (10 цифр после +7)");
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        consent: true,
        city,
        service: effectiveTitle,
        comment: isRepair
          ? `Заявка через модальное окно ремонта (${city}): ${effectiveTitle}`
          : `Заявка через модальное окно замера (${city}): ${effectiveTitle}`,
        source: isRepair ? "modal_repair" : "modal_measurement",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
      });

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || "Не удалось отправить заявку. Пожалуйста, позвоните нам.");
      }
    } catch {
      setError("Ошибка сети. Пожалуйста, свяжитесь с нами по телефону: 8 (423) 2-725-725.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-5 sm:p-8 text-slate-900 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeMeasurementModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              Заявка принята!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Спасибо{name ? `, ${name}` : ""}! Мы свяжемся с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span>, уточним детали и согласуем удобное время в г. {city}.
            </p>

            <button
              onClick={closeMeasurementModal}
              className="mt-4 px-6 py-3 bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5 pr-8">
              <span className="text-[11px] font-bold tracking-wider text-cyan-800 uppercase block mb-1">
                {isRepair ? "Сервис и ремонт окон" : "Компания «Окна Центр»"}
              </span>
              <h2 id="modal-title" className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                {effectiveTitle}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Укажите номер телефона — мы перезвоним, уточним детали и согласуем удобное время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Phone field: FIRST and PRIMARY */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  Номер телефона: <span className="text-cyan-600">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
                  placeholder="+7 (___) ___-__-__"
                  className="ym-disable-keys w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-semibold placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* City selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Город:
                </label>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value as SupportedCity)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all cursor-pointer font-medium"
                >
                  {CITIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name field: OPTIONAL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ваше имя <span className="text-slate-400 font-normal">(необязательно)</span>:
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="ym-disable-keys w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              {/* Honeypot field for bot protection */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none", zIndex: -1 }}
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="nope"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* 152-FZ Consent Checkbox: Starts strictly unchecked */}
              <div className="flex items-start gap-2.5 pt-1 pb-1">
                <input
                  type="checkbox"
                  id="modal-consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600 cursor-pointer shrink-0"
                />
                <label htmlFor="modal-consent" className="text-[11px] text-slate-600 leading-tight cursor-pointer select-none">
                  Даю <Link href="/consent" target="_blank" className="text-cyan-700 underline hover:text-cyan-800 font-medium">согласие на обработку персональных данных</Link> в соответствии со ст. 9 152-ФЗ. С <Link href="/privacy" target="_blank" className="text-cyan-700 underline hover:text-cyan-800 font-medium">Политикой конфиденциальности</Link> ознакомлен.
                </label>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed font-medium">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full py-3.5 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 cursor-pointer"
              >
                {loading ? "Отправка..." : isRepair ? "Вызвать мастера" : "Вызвать мастера на замер"}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                ООО «Окна-Центр» (ИНН 2543168553) · Согласование времени и выезд мастера
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
