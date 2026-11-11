"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import { COMPANY_INFO } from "@/data/company_info";
import { formatRussianPhone, validateRussianPhone } from "@/lib/phoneMask";
import { REPAIR_SERVICE_OPTIONS } from "@/data/repair_landing";

interface SimpleMeasurementFormProps {
  initialService?: string;
  source?: string;
  /** "repair" — режим вызова мастера по ремонту уже установленных окон */
  variant?: "measurement" | "repair";
}

const CITIES = ["Владивосток", "Уссурийск", "Артём", "Пригород / Другой"];

export default function SimpleMeasurementForm({
  initialService = "Вызов замерщика",
  source = "zaiavka_page",
  variant = "measurement",
}: SimpleMeasurementFormProps) {
  const isRepair = variant === "repair";
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Владивосток");
  const [selectedService, setSelectedService] = useState<string>(
    isRepair ? REPAIR_SERVICE_OPTIONS[0] : initialService
  );
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isRepair) return;
    const handleSelectService = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      if (detail?.service) {
        setSelectedService(detail.service);
      }
    };
    window.addEventListener("select-repair-service", handleSelectService);
    return () => window.removeEventListener("select-repair-service", handleSelectService);
  }, [isRepair]);

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

    const effectiveService = isRepair ? selectedService : initialService;

    setLoading(true);
    try {
      const result = await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        city,
        service: effectiveService,
        comment: isRepair
          ? `Заявка на ремонт окон (${city}): ${effectiveService}`
          : `Заявка со страницы вызова замерщика (${city}): ${effectiveService}`,
        source,
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

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          Заявка принята!
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {isRepair ? (
            <>
              Спасибо{name ? `, ${name}` : ""}! Мы свяжемся с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span>, уточним детали по услуге «{selectedService}» и согласуем удобное время выезда мастера в г. {city}.
            </>
          ) : (
            <>
              Спасибо{name ? `, ${name}` : ""}! Инженер свяжется с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 10–15 минут для согласования времени замера в г. {city}.
            </>
          )}
        </p>

        <div className="pt-2">
          <div className="text-xs text-slate-500 font-mono pt-1">
            Прямой номер мастера: {city === "Уссурийск" ? "8 (950) 2-800-300" : COMPANY_INFO.mainPhone}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 relative">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
          <span>{isRepair ? "Ремонт окон — Владивосток и Уссурийск" : "Выезд по Приморскому краю"}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-950">
          {isRepair ? "Оставьте заявку мастеру" : "Оставить заявку на замер"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {isRepair
            ? "Укажите номер телефона — мастер перезвонит, ответит на вопросы и согласует удобное время"
            : "Мастер приедет с каталогами образцов и рассчитает точную смету на месте"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone field: FIRST and PRIMARY on all devices */}
        <div>
          <label htmlFor="form-phone-input" className="block text-xs font-bold text-slate-900 mb-1.5">
            Номер телефона: <span className="text-cyan-600">*</span>
          </label>
          <input
            id="form-phone-input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
            placeholder="+7 (___) ___-__-__"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm sm:text-base focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-semibold placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>

        {/* City selection */}
        <div>
          <label htmlFor="form-city-select" className="block text-xs font-semibold text-slate-800 mb-1.5">
            Город:
          </label>
          <select
            id="form-city-select"
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

        {/* Optional service selection for repair variant */}
        {isRepair && (
          <div>
            <label htmlFor="repair-service-select" className="block text-xs font-semibold text-slate-800 mb-1.5">
              Что нужно сделать:
            </label>
            <select
              id="repair-service-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all cursor-pointer"
            >
              {REPAIR_SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Name field: SECONDARY / OPTIONAL */}
        <div>
          <label htmlFor="form-name-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Ваше имя <span className="text-slate-400 font-normal">(необязательно)</span>:
          </label>
          <input
            id="form-name-input"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
          />
        </div>

        {/* Honeypot field (hidden from humans, catches bots) */}
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
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="sm-consent"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600 cursor-pointer shrink-0"
          />
          <label htmlFor="sm-consent" className="text-[11px] text-slate-600 leading-tight cursor-pointer select-none">
            Даю <Link href="/consent" target="_blank" className="text-cyan-700 underline hover:text-cyan-800">согласие на обработку данных</Link> по <Link href="/privacy" target="_blank" className="text-cyan-700 underline hover:text-cyan-800">152-ФЗ</Link>. Без спама.
          </label>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !consent}
          className="w-full py-4 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{loading ? "Отправка заявки..." : isRepair ? "Вызвать мастера" : "Заказать бесплатный выезд"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          {isRepair
            ? "Официальный договор и гарантия на работу · Звоните: 8 (423) 2-725-725"
            : "Бесплатный выезд по Приморью · Гарантия 5 лет · Свое производство"}
        </p>
      </form>
    </div>
  );
}
