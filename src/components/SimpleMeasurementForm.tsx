"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone, validateRussianPhone } from "@/lib/phoneMask";
import { CITIES_LIST, detectInitialCity, saveSelectedCity, SupportedCity } from "@/lib/cityDetector";

interface SimpleMeasurementFormProps {
  title?: string;
  subtitle?: string;
  serviceName?: string;
  initialService?: string;
  variant?: string;
  source?: string;
}

export default function SimpleMeasurementForm({
  title = "Заявка на бесплатный выезд мастера",
  subtitle = "Укажите контактный номер телефона — мы свяжемся с вами, уточним детали и согласуем удобное время визита",
  serviceName,
  initialService,
  variant,
  source = "simple_measurement_form",
}: SimpleMeasurementFormProps) {
  const effectiveServiceName = initialService || serviceName || "Выезд мастера на замер";
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState<SupportedCity>("Владивосток");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false); // 152-FZ: Starts strictly false
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCity(detectInitialCity());
  }, []);

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
        service: effectiveServiceName,
        comment: comment.trim()
          ? `${comment.trim()} (город: ${city})`
          : `Заявка с формы страницы (город: ${city})`,
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

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-600 via-cyan-700 to-slate-900" />

      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Заявка принята!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            Спасибо{name ? `, ${name}` : ""}! Мы свяжемся с вами по номеру{" "}
            <span className="text-cyan-700 font-mono font-bold">{phone}</span>, уточним детали и согласуем удобное время замера в г. {city}.
          </p>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Данные защищены по 152-ФЗ РФ</span>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setPhone("");
              setName("");
              setComment("");
              setConsent(false);
            }}
            className="mt-4 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Отправить ещё одну заявку
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold tracking-wider text-cyan-800 uppercase block mb-1">
              Быстрая онлайн-заявка
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {subtitle}
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
                className="ym-disable-keys w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-base sm:text-lg focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-semibold placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            {/* City selector & Name in 2 columns on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Город:
                </label>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value as SupportedCity)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all cursor-pointer font-medium"
                >
                  {CITIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

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
            </div>

            {/* Optional comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Комментарий или адрес <span className="text-slate-400 font-normal">(необязательно)</span>:
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Например: продувает створку, требуется регулировка"
                className="ym-disable-keys w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all resize-none"
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
                id="sm-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600 cursor-pointer shrink-0"
              />
              <label htmlFor="sm-consent" className="text-[11px] text-slate-600 leading-tight cursor-pointer select-none">
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
              className="w-full py-4 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? "Отправка..." : "Отправить заявку"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Выезд мастера по согласованию
              </span>
              <span>·</span>
              <span>Консультация и расчёт сметы</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
