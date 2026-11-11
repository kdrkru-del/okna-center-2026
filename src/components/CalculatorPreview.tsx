"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { CONTACTS } from "@/data/contact";
import { reachGoal } from "@/components/YandexMetrika";
import { submitLead } from "@/lib/submitLead";
import { formatRussianPhone, validateRussianPhone } from "@/lib/phoneMask";

export default function CalculatorPreview() {
  const [selectedType, setSelectedType] = useState<string>("window");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false); // 152-FZ: Starts strictly false
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const types = [
    { id: "window", label: "Окно ПВХ", base: "от 14 000 ₽" },
    { id: "balcony", label: "Балкон под ключ", base: "от 55 000 ₽" },
    { id: "lodgia", label: "Лоджия под ключ", base: "от 79 000 ₽" },
    { id: "aluminum", label: "Алюминиевый фасад", base: "от 12 000 ₽/м²" },
    { id: "repairs", label: "Ремонт и сервис", base: "от 250 ₽" },
  ];

  const handleSelectType = (id: string) => {
    setSelectedType(id);
    reachGoal("calculator_start", { type: id });
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
      setError(phoneValidation.error || "Пожалуйста, введите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    setLoading(true);
    try {
      const typeLabel = types.find((t) => t.id === selectedType)?.label || selectedType;
      const estimate = types.find((t) => t.id === selectedType)?.base;

      const result = await submitLead({
        phone,
        consent: true,
        service: `Экспресс-расчет: ${typeLabel}`,
        comment: `Быстрый расчет с главной страницы. Выбран тип: ${typeLabel}. Оценка: ${estimate}`,
        source: 'calculator',
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
        isCalculator: true,
        calculatorData: {
          type: typeLabel,
          estimate,
        },
      });

      if (result.ok) {
        setSubmitted(true);
        setPhone('');
        setConsent(false);
      } else {
        setError(result.error || "Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.");
      }
    } catch {
      setError("Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator-preview" className="py-24 bg-[#02050A] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Калькулятор стоимости</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ориентировочный расчет сметы за 1 минуту
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Выберите конструкцию — мы свяжемся с вами, уточним детали и согласуем точный расчёт.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Заявка успешно отправлена!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Инженер свяжется с вами, уточнит детали конфигурации и подготовит точный расчёт сметы.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setConsent(false);
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Рассчитать другую конструкцию
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Anti-spam Honeypot Field */}
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

              {/* Type Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Выберите тип конструкции:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {types.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectType(t.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedType === t.id
                          ? "border-cyan-400 bg-cyan-500/15 text-white shadow-lg shadow-cyan-500/10"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div className="text-sm font-bold text-slate-100">{t.label}</div>
                      <div className="text-xs font-mono text-cyan-400/90 mt-1">{t.base}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone + Action */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Введите телефон для получения сметы: <span className="text-cyan-400">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
                    placeholder="+7 (___) ___-__-__"
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none text-sm font-mono font-medium"
                  />
                  <button
                    type="submit"
                    disabled={loading || !consent}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
                  >
                    {loading ? "Отправляем..." : "Получить расчет сметы"}
                  </button>
                </div>
              </div>

              {/* 152-FZ Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="calc-prev-consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500 cursor-pointer shrink-0"
                />
                <label htmlFor="calc-prev-consent" className="text-xs text-slate-400 leading-tight cursor-pointer select-none">
                  Даю <Link href="/consent" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">согласие на обработку персональных данных</Link> по <Link href="/privacy" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">152-ФЗ РФ</Link>. Без спама.
                </label>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Выезд инженера по Приморскому краю</span>
                </div>
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Развернутый пошаговый калькулятор →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
