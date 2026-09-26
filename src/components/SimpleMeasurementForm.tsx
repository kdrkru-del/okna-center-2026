"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import { reachGoal } from "@/components/YandexMetrika";
import { COMPANY_INFO } from "@/data/company_info";
import { formatRussianPhone } from "@/lib/phoneMask";

interface SimpleMeasurementFormProps {
  initialService?: string;
  source?: string;
}

export default function SimpleMeasurementForm({
  initialService = "Вызов замерщика",
  source = "zaiavka_page",
}: SimpleMeasurementFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 (");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)");
      return;
    }

    setLoading(true);
    try {
      reachGoal("lead_form_submit", { service: initialService });

      const result = await submitLead({
        name,
        phone,
        service: initialService,
        comment: `Заявка со страницы вызова замерщика: ${initialService}`,
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
          Спасибо, {name || "друг"}! Инженер свяжется с вами по номеру{" "}
          <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 10–15 минут для согласования точного времени.
        </p>

        <div className="pt-2 flex flex-col gap-2.5">
          <a
            href={`https://wa.me/79940100300?text=${encodeURIComponent(
              `Здравствуйте! Я оставил заявку на замер на сайте. Мой номер: ${phone}, имя: ${name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать в WhatsApp</span>
          </a>

          <div className="text-xs text-slate-500 font-mono pt-1">
            {COMPANY_INFO.mainPhone} · {COMPANY_INFO.offices[0].address}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 relative">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
          <span>Бесплатный выезд</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-950">
          Заполните 2 поля
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Мастер приедет с образцами и сделает расчет на месте без обязательств
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <span>{loading ? "Отправка..." : "Вызвать мастера на замер 0 ₽"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          Замер по Владивостоку и Уссурийску бесплатный и ни к чему вас не обязывает.
        </p>
      </form>
    </div>
  );
}
