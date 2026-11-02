"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import { COMPANY_INFO } from "@/data/company_info";
import { formatRussianPhone } from "@/lib/phoneMask";
import {
  REPAIR_CITY_OPTIONS,
  REPAIR_SERVICE_OPTIONS,
} from "@/data/repair_landing";

interface SimpleMeasurementFormProps {
  initialService?: string;
  source?: string;
  /** "repair" — режим вызова мастера по ремонту уже установленных окон */
  variant?: "measurement" | "repair";
}

export default function SimpleMeasurementForm({
  initialService = "Вызов замерщика",
  source = "zaiavka_page",
  variant = "measurement",
}: SimpleMeasurementFormProps) {
  const isRepair = variant === "repair";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 (");
  const [city, setCity] = useState<string>(REPAIR_CITY_OPTIONS[0] || "Владивосток");
  const [selectedService, setSelectedService] = useState<string>(
    isRepair ? REPAIR_SERVICE_OPTIONS[0] : initialService
  );
  const [website, setWebsite] = useState("");
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

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    const effectiveService = isRepair ? selectedService : initialService;
    const effectiveCity = isRepair ? city : undefined;

    setLoading(true);
    try {
      const result = await submitLead({
        name,
        phone,
        city: effectiveCity,
        service: effectiveService,
        comment: isRepair
          ? `Заявка на ремонт окон (${effectiveCity}): ${effectiveService}`
          : `Заявка со страницы вызова замерщика: ${effectiveService}`,
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
      setError("Ошибка сети. Пожалуйста, свяжитесь с нами по телефону.");
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
              Спасибо, {name || "клиент"}! Мы свяжемся с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span>, уточним детали по услуге «{selectedService}» ({city}) и согласуем время визита мастера.
            </>
          ) : (
            <>
              Спасибо, {name || "друг"}! Инженер свяжется с вами по номеру{" "}
              <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 10–15 минут для согласования точного времени.
            </>
          )}
        </p>

        <div className="pt-2">
          <div className="text-xs text-slate-500 font-mono pt-1">
            {COMPANY_INFO.mainPhone} · Владивосток и Уссурийск
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 relative">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
          <span>{isRepair ? "Ремонт окон · Владивосток и Уссурийск" : "Бесплатный выезд"}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-950">
          {isRepair ? "Вызвать мастера по ремонту окон" : "Заполните 2 поля"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {isRepair
            ? "Укажите город и телефон — мы перезвоним, уточним неисправность и согласуем время визита мастера"
            : "Мастер приедет с образцами и сделает расчет на месте без обязательств"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRepair && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Город обслуживания:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {REPAIR_CITY_OPTIONS.map((cityOption) => {
                  const active = city === cityOption;
                  const shortLabel = cityOption === "Другой населённый пункт" ? "Другой" : cityOption;
                  return (
                    <button
                      key={cityOption}
                      type="button"
                      onClick={() => setCity(cityOption)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        active
                          ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="repair-service-select" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Какая услуга требуется:
              </label>
              <select
                id="repair-service-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
              >
                {REPAIR_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Ваше имя:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Номер телефона: <span className="text-cyan-600">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onFocus={() => {
              if (!phone || phone.length <= 4) setPhone("+7 (");
            }}
            onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
            placeholder="+7 (999) 000-00-00"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm focus:bg-white focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all font-medium"
          />
        </div>

        {/* Honeypot field */}
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
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{loading ? "Отправка..." : isRepair ? "Вызвать мастера" : "Вызвать мастера на замер"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          {isRepair
            ? "Гарантия на выполненные работы по договору · Звоните: 8 (423) 2-725-725"
            : "Бесплатный выезд по Приморью · Гарантия 5 лет · Мусор вывозим сами"}
        </p>
      </form>
    </div>
  );
}
