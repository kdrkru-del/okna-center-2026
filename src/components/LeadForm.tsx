'use client';
import { useState } from 'react';
import { submitLead } from '@/lib/submitLead';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Владивосток');
  const [service, setService] = useState('Окна ПВХ');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');

  const whatsappDirectUrl = `https://wa.me/79940100300?text=${encodeURIComponent(
    `Здравствуйте! Заявка с сайта: ${name ? name + ', ' : ''}${phone}. Город: ${city}. Услуга: ${service}${message ? '. Примечание: ' + message : ''}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Phone validation: at least 10 digits
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона (не менее 10 цифр)');
      return;
    }

    setLoading(true);
    try {
      const result = await submitLead({
        name,
        phone,
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
          <div className="inline-block px-3.5 py-1.5 mb-4 text-[11px] font-mono text-slate-800 border border-slate-200 rounded-full bg-white shadow-sm uppercase tracking-widest font-semibold">
            📐 Персональный инженерный расчёт
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 mb-4 tracking-tight">
            Заказать инженерный проект <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
              и лазерный 3D-замер
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Ведущий инженер приедет на объект с кейсом оригинальных профилей Rehau, KBE и Schüco, образцами стеклопакетов и лазерным оборудованием. Рассчитаем ветровые нагрузки вашего этажа и составим фиксированную смету по договору.
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
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 mb-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Отправить напрямую в WhatsApp
            </a>
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
                  onChange={(e) => setCity(e.target.value)}
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
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Что интересует? *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm cursor-pointer"
                >
                  <option value="Окна ПВХ в квартиру">Пластиковые окна ПВХ</option>
                  <option value="Балкон / Лоджия под ключ">Балкон / Лоджия под ключ</option>
                  <option value="Остекление частного дома">Остекление частного дома / коттеджа</option>
                  <option value="Алюминиевые витражи ALUTECH">Алюминиевые витражи и фасады</option>
                  <option value="Ремонт и регулировка окон">Ремонт / Регулировка окон</option>
                  <option value="Покупка окон без монтажа">Купить окна без установки (с доставкой)</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Телефон *</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm"
                />
              </div>

            </div>

            {/* Message / Dimensions */}
            <div className="mb-8">
              <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Размеры или пожелания (необязательно)</label>
              <textarea
                rows={3}
                placeholder="Примерные размеры, тип дома или особые пожелания..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20 transition-colors text-sm"
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
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <p className="font-semibold mb-3 leading-relaxed">{error}</p>
                <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                  <a
                    href="tel:+74232725725"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-950 text-white font-bold text-xs w-full sm:w-auto text-center"
                  >
                    Позвонить: 8 (423) 2-725-725
                  </a>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors w-full sm:w-auto text-center"
                  >
                    Написать в WhatsApp
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-slate-950 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-slate-900/10 cursor-pointer"
              >
                {loading ? 'Отправка...' : 'Заказать бесплатный инженерный проект'}
              </button>
              <span className="text-[11px] text-slate-500 font-light text-center sm:text-right">
                Нажимая кнопку, вы даете согласие на обработку персональных данных.
              </span>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
