"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { CONTACTS } from "@/data/contact";
import { reachGoal } from "@/components/YandexMetrika";
import { submitLead } from "@/lib/submitLead";

export default function CalculatorPreview() {
  const [selectedType, setSelectedType] = useState<string>("window");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
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
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Пожалуйста, введите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    setLoading(true);
    try {
      const typeLabel = types.find((t) => t.id === selectedType)?.label || selectedType;
      const estimate = types.find((t) => t.id === selectedType)?.base;

      const result = await submitLead({
        phone,
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Узнайте ориентировочную стоимость
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Выберите конструкцию — расчет и консультация займут около минуты.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Заявка принята!</h3>
              <p className="text-sm text-slate-300 mx-auto">
                Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
              </p>
              <a
                href={`https://wa.me/79940100300?text=${encodeURIComponent(
                  `Здравствуйте! Экспресс-расчет с сайта: ${types.find((t) => t.id === selectedType)?.label || selectedType}. Номер телефона: ${phone}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Дублировать заявку в WhatsApp
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-white/10 text-xs font-mono uppercase text-white hover:bg-white/20 transition-colors"
              >
                Рассчитать еще
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
                  <p className="font-semibold mb-3 leading-relaxed">{error}</p>
                  <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                    <a
                      href={`tel:${CONTACTS.phones.mainRaw}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs w-full sm:w-auto text-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{CONTACTS.phones.mainDisplay}</span>
                    </a>
                    <a
                      href={CONTACTS.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors w-full sm:w-auto text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Написать в WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Honeypot field for bot protection */}
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
                  Введите телефон для получения сметы:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none text-sm font-mono"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
                  >
                    {loading ? "Отправляем..." : "Получить расчет за 15 мин"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Бесплатный выезд инженера по Владивостоку и Уссурийску</span>
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
