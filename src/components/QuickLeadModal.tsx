"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { useMeasurementModal } from "@/context/ModalContext";
import { submitLead } from "@/lib/submitLead";
import { reachGoal } from "@/components/YandexMetrika";
import { COMPANY_INFO } from "@/data/company_info";
import { formatRussianPhone } from "@/lib/phoneMask";

export default function QuickLeadModal() {
  const { isOpen, serviceTitle, closeMeasurementModal } = useMeasurementModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 (");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setError("");
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

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Пожалуйста, введите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    setLoading(true);
    try {
      reachGoal("lead_form_submit", { service: serviceTitle || "Вызов замерщика" });

      const result = await submitLead({
        name,
        phone,
        service: serviceTitle || "Вызов замерщика",
        comment: `Быстрая заявка на замер из модального окна: ${serviceTitle || "Вызов замерщика"}`,
        source: "modal_lead_form",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
      });

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || "Не удалось отправить заявку. Пожалуйста, позвоните нам.");
      }
    } catch {
      setError("Ошибка соединения. Пожалуйста, свяжитесь с нами по телефону или в WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeMeasurementModal}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeMeasurementModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              Заявка принята!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
              Спасибо, {name || "друг"}! Мастер свяжется с вами по номеру <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 10–15 минут для согласования времени.
            </p>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/79940100300?text=${encodeURIComponent(
                  `Здравствуйте! Я оставил заявку на замер на сайте. Мой номер: ${phone}, имя: ${name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={closeMeasurementModal}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                Вызов мастера на замер
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
                Мастер приедет с образцами профилей, ответит на вопросы и рассчитает точную смету на объекте бесплатно.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
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

              {/* Phone field */}
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

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 cursor-pointer"
              >
                {loading ? "Отправка..." : "Вызвать мастера на замер 0 ₽"}
              </button>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Выезд замерщика бесплатный и ни к чему вас не обязывает.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
