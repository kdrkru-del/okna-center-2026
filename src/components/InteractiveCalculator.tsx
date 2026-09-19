"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, ArrowRight, Upload, Phone, Sparkles, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import { reachGoal } from "@/components/YandexMetrika";
import { submitLead } from "@/lib/submitLead";

export default function InteractiveCalculator() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("windows");
  const [dimensions, setDimensions] = useState({ width: "1300", height: "1400" });
  const [profile, setProfile] = useState("rehau");
  const [options, setOptions] = useState<string[]>(["installation", "sill"]);
  const [city, setCity] = useState("Владивосток");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleNextStep = (nextStep: number) => {
    if (step === 1 && nextStep === 2) {
      reachGoal("calculator_start", { serviceType });
    }
    if (step === 2 && nextStep === 3) {
      reachGoal("calculator_complete", { serviceType, profile });
    }
    setStep(nextStep);
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
      const estimate = calculateEstimate();
      const profileName = profile === 'rehau' ? 'Rehau Grazio 70мм' : profile === 'kbe' ? 'KBE Master 70мм' : 'Funke Helios 70мм';
      const typeLabel = serviceType === 'windows' ? 'Пластиковое окно ПВХ' : serviceType === 'balconies' ? 'Балкон / Лоджия под ключ' : 'Алюминиевые витражи и двери';
      const optionsLabels = options.map(o => o === 'installation' ? 'Монтаж по ГОСТ' : o === 'sill' ? 'Подоконник и отлив' : 'Теплые откосы');

      const result = await submitLead({
        name,
        phone,
        city,
        service: `Калькулятор: ${typeLabel}`,
        comment: `Заявка из калькулятора. Тип: ${typeLabel}. Профиль: ${profileName}. Размеры: ${dimensions.width} × ${dimensions.height} мм. Опции: ${optionsLabels.join(', ') || 'без доп. опций'}. Оценка: от ${estimate} ₽`,
        source: 'calculator',
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        website,
        isCalculator: true,
        calculatorData: {
          type: typeLabel,
          profile: profileName,
          dimensions: `${dimensions.width} × ${dimensions.height} мм`,
          options: optionsLabels,
          estimate: `от ${estimate} ₽`,
        },
      });

      if (result.ok) {
        setSubmitted(true);
        setName('');
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

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let base = 14000;
    if (serviceType === "balcony") base = 55000;
    if (serviceType === "lodgia") base = 79000;
    if (serviceType === "aluminum") base = 45000;
    if (serviceType === "repairs") base = 2500;

    if (profile === "funke") base += 4500;
    if (profile === "kbe-70") base += 3500;

    if (options.includes("installation")) base += 5500;
    if (options.includes("sill")) base += 2000;
    if (options.includes("insulation")) base += 12000;
    if (options.includes("finishing")) base += 15000;

    return base.toLocaleString("ru-RU");
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Калькулятор стоимости</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Рассчитайте предварительную стоимость за 1 минуту
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light">
            Выберите тип конструкции и параметры — получите предварительный ориентир стоимости и отправьте заявку на точный инженерный расчет
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Заявка успешно отправлена!</h3>
              <p className="text-slate-600 text-sm mx-auto">
                Инженер компании «Окна Центр» свяжется с вами по номеру <span className="text-cyan-700 font-mono font-bold">{phone}</span> в течение 15 минут для уточнения деталей.
              </p>
              <a
                href={`https://wa.me/79940100300?text=${encodeURIComponent(
                  `Здравствуйте! Расчет на калькуляторе: ${serviceType}, профиль: ${profile}, город: ${city}, предварительно: ${calculateEstimate()} ₽. Имя: ${name}, телефон: ${phone}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Дублировать заявку в WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs uppercase font-mono tracking-wider transition-colors"
              >
                Рассчитать еще раз
              </button>
            </div>
          ) : (
            <div>
              {/* Stepper tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8 text-xs font-mono">
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-cyan-700 font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold ${step >= 1 ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-300 text-slate-400"}`}>1</span>
                  <span className="hidden sm:inline">Тип объекта</span>
                </div>
                <div className="w-12 h-px bg-slate-200"></div>
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-cyan-700 font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold ${step >= 2 ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-300 text-slate-400"}`}>2</span>
                  <span className="hidden sm:inline">Параметры</span>
                </div>
                <div className="w-12 h-px bg-slate-200"></div>
                <div className={`flex items-center gap-2 ${step >= 3 ? "text-cyan-700 font-bold" : "text-slate-400"}`}>
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold ${step >= 3 ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-300 text-slate-400"}`}>3</span>
                  <span className="hidden sm:inline">Расчет</span>
                </div>
              </div>

              {/* Step 1: Service Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <label className="text-sm font-semibold text-slate-900 block">Что необходимо остеклить?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "windows", label: "Пластиковое окно", price: "от 14 000 ₽" },
                      { id: "balcony", label: "Остекление балкона", price: "от 55 000 ₽" },
                      { id: "lodgia", label: "Лоджия под ключ", price: "от 79 000 ₽" },
                      { id: "aluminum", label: "Алюминиевая конструкция", price: "от 45 000 ₽" },
                      { id: "repairs", label: "Ремонт / Регулировка", price: "от 300 ₽" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setServiceType(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          serviceType === item.id
                            ? "border-cyan-600 bg-cyan-50/70 text-slate-900 ring-1 ring-cyan-500/30 shadow-sm"
                            : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60"
                        }`}
                      >
                        <div className="text-sm font-bold">{item.label}</div>
                        <div className="text-xs text-cyan-700 font-mono mt-1">{item.price}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => handleNextStep(2)}
                      className="px-6 py-3 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-slate-900/10 hover:shadow-cyan-600/20 cursor-pointer"
                    >
                      <span>Далее к размерам</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Dimensions & Options */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-900 block mb-3">Примерные размеры (мм):</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-500 block mb-1">Ширина:</span>
                        <input
                          type="number"
                          value={dimensions.width}
                          onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                          placeholder="1300"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-1">Высота:</span>
                        <input
                          type="number"
                          value={dimensions.height}
                          onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                          placeholder="1400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-900 block mb-3">Профильная система:</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "rehau", label: "Rehau Euro 60", desc: "3 камеры, стандарт" },
                        { id: "kbe-70", label: "KBE Expert 70", desc: "5 камер, повышенное тепло" },
                        { id: "funke", label: "Funke Helios 70", desc: "Премиум класс" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfile(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            profile === item.id
                              ? "border-cyan-600 bg-cyan-50/80 text-slate-900 ring-1 ring-cyan-500/30"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900">{item.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-900 block mb-3">Дополнительные опции:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        { id: "installation", label: "Монтаж по ГОСТ" },
                        { id: "sill", label: "Подоконник + отлив" },
                        { id: "insulation", label: "Утепление Изопинк" },
                        { id: "finishing", label: "Внутренняя отделка" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleOption(opt.id)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            options.includes(opt.id)
                              ? "border-cyan-600 bg-cyan-50 text-cyan-800 font-semibold ring-1 ring-cyan-500/30"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Назад
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-slate-950 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-slate-900/10 hover:shadow-cyan-600/20 cursor-pointer"
                    >
                      <span>Рассчитать стоимость</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Calculation Result & Lead Form */}
              {step === 3 && (
                submitted ? (
                  <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 border border-emerald-300">
                      <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
                    <p className="text-slate-600 text-sm font-light leading-relaxed mb-6">
                      Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
                    </p>
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 mb-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Написать в WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setStep(1); }}
                      className="text-xs text-slate-500 hover:text-cyan-700 transition-colors underline cursor-pointer"
                    >
                      Рассчитать другую конструкцию
                    </button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-slate-50 border border-cyan-200 text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-800 block mb-1">
                      Ориентировочная стоимость:
                    </span>
                    <div className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight my-2 font-mono">
                      от {calculateEstimate()} ₽
                    </div>
                    <span className="text-xs text-slate-500">
                      *Окончательный расчет выполняется инженером на объекте с учетом точных размеров и выбранной фурнитуры
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-700 block mb-1 font-semibold">Ваше имя:</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-700 block mb-1 font-semibold">Номер телефона:*</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 block mb-1 font-semibold">Город / Район:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Владивосток", "Уссурийск", "Артем / Пригород"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCity(c)}
                          className={`py-2 px-2 text-xs rounded-xl border transition-colors cursor-pointer ${
                            city === c ? "border-cyan-600 bg-cyan-50 text-cyan-800 font-semibold" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center gap-3">
                    <Upload className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <div className="text-xs text-slate-600">
                      <span>Есть фото или чертеж проема? Можно отправить нам в </span>
                      <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold underline hover:text-emerald-800">
                        WhatsApp (+7 994 010-03-00)
                      </a>
                    </div>
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
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      <p className="font-semibold mb-3 leading-relaxed">{error}</p>
                      <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                        <a
                          href="tel:+74232725725"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-950 text-white font-bold text-xs w-full sm:w-auto text-center"
                        >
                          Позвонить: 8 (423) 2-725-725
                        </a>
                        <a
                          href={COMPANY_INFO.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors w-full sm:w-auto text-center"
                        >
                          Написать в WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs uppercase font-mono tracking-wider cursor-pointer"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-cyan-600/20 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{loading ? "Отправляем..." : "Получить точный инженерный расчет"}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-500 text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Конфиденциальность гарантируется.
                  </p>
                </form>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
