"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2 } from "lucide-react";
import { useMeasurementModal } from "@/context/ModalContext";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone, validateRussianPhone } from "@/lib/phoneMask";
import { isRepairPath } from "@/lib/repairPaths";
import { usePathname } from "next/navigation";

const CITIES = ["Владивосток", "Уссурийск", "Артём", "Пригород / Другой"];

export default function QuickLeadModal() {
  const { isOpen, serviceTitle, closeMeasurementModal } = useMeasurementModal();
  const pathname = usePathname();
  const isRepair = isRepairPath(pathname);
  const effectiveTitle = isRepair
    ? "Вызов мастера по ремонту окон"
    : serviceTitle || "Вызов мастера на замер";

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Владивосток");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setConsent(true);
      setError("");
      setPhone("");
      setName("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const phoneValidation = validateRussianPhone(phone);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.error || "Пожалуйста, введите полный номер телефона (10 цифр после +7)");
      return;
    }

    if (!consent) {
      setError("Пожалуйста, подтвердите согласие на обработку персональных данных");
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name: name.trim(),
        phone: phone.trim(),
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeMeasurementModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
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
              Спасибо{name ? `, ${name}` : ""}! Мастер свяжется с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 10–15 минут для согласования удобного времени в г. {city}.
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
            <div className="mb-6 pr-8">
              <span className="text-[11px] font-bold tracking-wider text-cyan-800 uppercase block mb-1">
                {isRepair ? "Сервис и ремонт окон" : "Компания «Окна Центр»"}
              </span>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {effectiveTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Укажите номер телефона — мы перезвоним для согласования деталей и удобного времени
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phone field: FIRST and PRIMARY */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
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
                  className="ym-disable-keys w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-semibold placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* City selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Город:
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all cursor-pointer font-medium"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name field: OPTIONAL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ваше имя <span className="text-slate-400 font-normal">(необязательно)</span>:
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="ym-disable-keys w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
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

              {/* 152-FZ Consent Checkbox */}
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
                  Даю <Link href="/consent" target="_blank" className="text-cyan-700 underline hover:text-cyan-800">согласие на обработку персональных данных</Link> по <Link href="/privacy" target="_blank" className="text-cyan-700 underline hover:text-cyan-800">152-ФЗ</Link>. Без спама.
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
                className="w-full py-4 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 cursor-pointer"
              >
                {loading ? "Отправка..." : isRepair ? "Вызвать мастера" : "Вызвать мастера на замер"}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                ООО «Окна-Центр» (ИНН 2543168553) · Консультация и выезд мастера
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
