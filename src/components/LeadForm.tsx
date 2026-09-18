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
    <section id="contact" className="py-28 bg-[#020509] text-white px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_40%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
            Заявка на расчет
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-4 tracking-tight">
            Заказать окна или <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">выезд мастера</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Оставьте контакты — специалист свяжется с вами для консультации и расчета точной стоимости.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-cyan-950/40 border border-cyan-500/40 backdrop-blur-xl max-w-md mx-auto text-center animate-fade-in shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-5 border border-cyan-400/30">
              <CheckCircle2 className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
              Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 mb-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Отправить напрямую в WhatsApp
            </a>
            <div className="text-xs font-mono text-cyan-400/80">
              Компания «Окна Центр» · 8 (423) 2-725-725
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/70 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              
              {/* City Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Ваш город *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 transition-colors text-sm"
                >
                  <option value="Владивосток" className="bg-slate-900 text-white">Владивосток</option>
                  <option value="Уссурийск" className="bg-slate-900 text-white">Уссурийск</option>
                  <option value="Артём" className="bg-slate-900 text-white">Артём</option>
                  <option value="Приморский край" className="bg-slate-900 text-white">Другой город Приморья</option>
                  <option value="Доставка по ДФО (Магадан, Сахалин, Камчатка, Анадырь)" className="bg-slate-900 text-white">Доставка по ДФО (Сахалин, Камчатка, Магадан, Чукотка)</option>
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Что интересует? *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 transition-colors text-sm"
                >
                  <option value="Окна ПВХ в квартиру" className="bg-slate-900 text-white">Пластиковые окна ПВХ</option>
                  <option value="Балкон / Лоджия под ключ" className="bg-slate-900 text-white">Балкон / Лоджия под ключ</option>
                  <option value="Остекление частного дома" className="bg-slate-900 text-white">Остекление частного дома / коттеджа</option>
                  <option value="Алюминиевые витражи ALUTECH" className="bg-slate-900 text-white">Алюминиевые витражи и фасады</option>
                  <option value="Ремонт и регулировка окон" className="bg-slate-900 text-white">Ремонт / Регулировка окон</option>
                  <option value="Покупка окон без монтажа" className="bg-slate-900 text-white">Купить окна без установки (с доставкой)</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Телефон *</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>

            </div>

            {/* Message / Dimensions */}
            <div className="mb-8">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Размеры или пожелания (необязательно)</label>
              <textarea
                rows={3}
                placeholder="Примерные размеры, тип дома или особые пожелания..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors text-sm"
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
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
                <p className="font-semibold mb-3 leading-relaxed">{error}</p>
                <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
                  <a
                    href="tel:+74232725725"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs w-full sm:w-auto text-center"
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
                className="w-full sm:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                {loading ? 'Отправка...' : 'Отправить заявку на расчет'}
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
