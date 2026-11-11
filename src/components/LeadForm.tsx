'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { submitLead } from '@/lib/submitLead';
import { CheckCircle2 } from 'lucide-react';
import { formatRussianPhone, validateRussianPhone } from '@/lib/phoneMask';
import { CITIES_LIST, detectInitialCity, saveSelectedCity, SupportedCity } from '@/lib/cityDetector';

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState<SupportedCity>('Владивосток');
  const [service, setService] = useState('Окна ПВХ');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [consent, setConsent] = useState(false); // 152-FZ: Starts strictly false
  const [error, setError] = useState('');

  useEffect(() => {
    setCity(detectInitialCity());
  }, []);

  const handleCityChange = (newCity: SupportedCity) => {
    setCity(newCity);
    saveSelectedCity(newCity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!consent) {
      setError('Пожалуйста, подтвердите согласие на обработку персональных данных (152-ФЗ)');
      return;
    }

    const phoneValidation = validateRussianPhone(phone);
    if (!phoneValidation.isValid) {
      setError(phoneValidation.error || 'Пожалуйста, введите корректный номер телефона (не менее 10 цифр)');
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name,
        phone,
        consent: true,
        city,
        service,
        comment: message,
        source: `Форма заявки (${city} / ${service})`,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        website,
      });

      if (result.ok) {
        setSubmitted(true);
        // Clear fields only on confirmed success
        setName('');
        setPhone('');
        setMessage('');
        setConsent(false);
      } else {
        setError(result.error || 'Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.');
      }
    } catch {
      setError('Не удалось автоматически отправить заявку. Свяжитесь с нами напрямую.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200/80 text-slate-900 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1.5 mb-4 text-[11px] font-mono text-cyan-800 border border-cyan-200 rounded-full bg-cyan-50 shadow-sm uppercase tracking-widest font-semibold">
            Бесплатный выезд мастера
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">
            Узнайте точную стоимость <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
              остекления под ключ
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Мастер бесплатно приедет по вашему адресу в любой город или посёлок Приморья с образцами профилей Rehau, KBE и Funke, снимет размеры и назовёт окончательную смету. Сборка за 4–7 рабочих дней, гарантия 5 лет, а старый мусор вывозим сами.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-center animate-fade-in shadow-md">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 border border-emerald-300">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed mb-6">
              Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Компания «Окна Центр» · 8 (423) 2-725-725
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 p-8 sm:p-12 rounded-3xl shadow-xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              
              {/* City Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Ваш город *</label>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value as SupportedCity)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm cursor-pointer"
                >
                  <option value="Владивосток">Владивосток</option>
                  <option value="Уссурийск">Уссурийск</option>
                  <option value="Артём">Артём</option>
                  <option value="Приморский край">Другой город Приморья</option>
                  <option value="Доставка по ДФО (Магадан, Сахалин, Камчатка, Анадырь)">Доставка по ДФО (Сахалин, Камчатка, Магадан, Чукотка)</option>
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Что требуется остеклить *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm cursor-pointer"
                >
                  <option value="Окна ПВХ">Пластиковые окна в квартиру или дом</option>
                  <option value="Остекление балкона">Остекление и отделка балкона</option>
                  <option value="Лоджия под ключ">Лоджия под ключ с утеплением</option>
                  <option value="Алюминиевые окна / Фасад">Алюминиевые витражи и фасады ALT F50</option>
                  <option value="Ремонт окон">Ремонт, замена стеклопакетов, регулировка</option>
                  <option value="Жалюзи">Еврожалюзи или рулонные шторы</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Как к вам обращаться</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ym-disable-keys w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Номер телефона *</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(formatRussianPhone(e.target.value))}
                  className="ym-disable-keys w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm font-mono"
                />
              </div>

            </div>

            {/* Message / Comments */}
            <div className="mb-6">
              <label className="block text-xs text-slate-600 font-semibold uppercase tracking-wider mb-2">Размеры или пожелания (необязательно)</label>
              <textarea
                rows={3}
                placeholder="Примерные размеры, тип дома или особые пожелания..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ym-disable-keys w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm"
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

            {/* 152-FZ Consent Checkbox (Separated per 01.09.2025 requirement) */}
            <div className="mb-6 flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="checkbox"
                id="lead-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600 cursor-pointer shrink-0"
              />
              <label htmlFor="lead-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                Даю <Link href="/consent" target="_blank" className="text-cyan-700 underline font-medium hover:text-cyan-800">согласие на обработку персональных данных</Link> в соответствии со ст. 9 152-ФЗ. С <Link href="/privacy" target="_blank" className="text-cyan-700 underline font-medium hover:text-cyan-800">Политикой конфиденциальности</Link> ознакомлен.
              </label>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <p className="font-semibold mb-3 leading-relaxed">{error}</p>
                <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                  <a
                    href="tel:+74232725725"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-950 text-white font-bold text-xs w-full sm:w-auto text-center"
                  >
                    Позвонить: 8 (423) 2-725-725
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full sm:w-auto px-10 py-4 bg-slate-950 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-slate-900/10 cursor-pointer"
              >
                {loading ? 'Отправка...' : 'Вызвать мастера на замер'}
              </button>
              <span className="text-[11px] text-slate-500 font-light text-center sm:text-right font-mono">
                ООО «Окна-Центр» · ИНН 2543168553
              </span>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
