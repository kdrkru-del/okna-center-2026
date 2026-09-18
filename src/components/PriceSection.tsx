'use client';
import { useState } from 'react';

interface PriceItem {
  title: string;
  desc: string;
  price: string;
  badge: string;
  popular?: boolean;
  features: string[];
}

export default function PriceSection() {
  const [activeTab, setActiveTab] = useState<'windows' | 'balconies' | 'delivery'>('windows');

  const prices: Record<'windows' | 'balconies' | 'delivery', PriceItem[]> = {
    windows: [
      {
        title: 'Типовое кухонное окно (без установки)',
        desc: 'Готовое фабричное окно по ГОСТ. Самовывоз или оперативная доставка по Приморью и ДФО.',
        price: 'от 14 000 ₽',
        badge: 'Самовывоз / Доставка',
        popular: false,
        features: ['Профиль ПВХ (KBE / Funke)', 'Энергосберегающий стеклопакет', 'Надежная немецкая фурнитура', 'Паспорт качества и гарантия'],
      },
      {
        title: 'Кухонное окно под ключ с установкой',
        desc: 'Полный комплекс работ: демонтаж старого окна, монтаж по ГОСТ, подоконник, отлив и отделка откосов.',
        price: 'от 28 500 ₽',
        badge: 'Хит продаж',
        popular: true,
        features: ['Бесплатный замер инженера', 'Монтаж сертифицированной бригадой', 'Теплые пластиковые откосы и подоконник', 'Гарантия на изделие и монтажный шов'],
      },
      {
        title: 'Окно с ламинацией «под дерево»',
        desc: 'Премиальное покрытие с текстурой дуба, ореха или антрацита для загородных домов и дизайнерских интерьеров.',
        price: 'По расчёту',
        badge: 'Премиум дизайн',
        popular: false,
        features: ['Стойкость к ультрафиолету и влаге', 'Двусторонняя или односторонняя ламинация', 'Окрашенная в массе основа', 'Срок службы пленки более 30 лет'],
      },
    ],
    balconies: [
      {
        title: 'Лоджия 3 метра с установкой',
        desc: 'Теплое или раздвижное остекление стандартной 3-метровой лоджии под ключ с ветрозащитой.',
        price: 'от 55 000 ₽',
        badge: '3 метра',
        popular: false,
        features: ['ПВХ-системы или раздвижной Slidors', 'Защита от тайфунов и морского ветра', 'Герметизация всех примыканий', 'Возможность установки жалюзи «Зебра»'],
      },
      {
        title: 'Лоджия 6 метров с установкой',
        desc: 'Панорамное или секционное остекление просторной 6-метровой лоджии с усиленными соединителями.',
        price: 'от 79 000 ₽',
        badge: '6 метров',
        popular: true,
        features: ['Усиленный ветровой расчет', 'Широкие возможности конфигурации створок', 'Энергосберегающие стеклопакеты', 'Монтаж за 1 день'],
      },
      {
        title: 'П-образный балкон 3 метра (с установкой)',
        desc: 'Остекление с фронтальной и двух боковых сторон. Надежная жесткая фиксация угловых соединений.',
        price: 'от 85 000 ₽',
        badge: 'П-образный',
        popular: false,
        features: ['Угловые усиленные стойки', 'Возможность расширения (вынос балкона)', 'Комплексная внутренняя/внешняя отделка', 'Сайдинг или панели «Ханьи»'],
      },
    ],
    delivery: [
      {
        title: 'Поставки окон в Магадан и Сахалин',
        desc: 'Изготовление и надежная жесткая упаковка (обрешетка) для морской и авиаперевозки.',
        price: 'Индивидуально',
        badge: 'Южно-Сахалинск / Магадан',
        popular: false,
        features: ['Усиленная транспортная упаковка', 'Полный комплект крепежа и инструкций', 'Прямая отгрузка в морской порт Владивостока', 'Работа с юр. и физ. лицами'],
      },
      {
        title: 'Доставка на Камчатку и Чукотку',
        desc: 'Регулярные контейнерные отправки в Петропавловск-Камчатский и Анадырь.',
        price: 'Индивидуально',
        badge: 'ПКЭ / Анадырь',
        popular: false,
        features: ['Специальные морозостойкие стеклопакеты', 'Контроль комплектации перед погрузкой', 'Страхование груза на всем маршруте', 'Опыт поставок по Северу с 2004 года'],
      },
    ],
  };

  return (
    <section id="prices" className="py-28 bg-[#040912] text-white px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
              Прозрачные цены без скрытых доплат
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Стоимость типовых <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">решений</span>
            </h2>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('windows')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'windows' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Окна ПВХ
            </button>
            <button
              onClick={() => setActiveTab('balconies')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'balconies' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Балконы и лоджии
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'delivery' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Доставка по ДФО
            </button>
          </div>
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices[activeTab].map((item, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                item.popular
                  ? 'bg-gradient-to-b from-slate-900/90 to-slate-950 border-cyan-500/50 shadow-[0_15px_45px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30'
                  : 'bg-slate-900/40 border-white/10 hover:border-white/20'
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                  Популярный выбор
                </div>
              )}

              <div>
                <div className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 mb-4 px-2.5 py-1 rounded bg-white/5">
                  {item.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {item.desc}
                </p>

                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 mb-6 font-mono">
                  {item.price}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-center transition-all duration-300 ${
                  item.popular
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                Заказать бесплатный замер
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center text-xs text-slate-500 font-light">
          * Указанные цены являются ориентировочными. Точная стоимость рассчитывается инженером после выезда на замер с учетом ветровых нагрузок и комплектации.
        </div>

      </div>
    </section>
  );
}
