import Image from 'next/image';
import { asset } from '@/lib/assetPath';

const services = [
  {
    id: 1,
    title: 'Пластиковые окна ПВХ',
    subtitle: 'Немецкие профили Funke, KBE, Rehau, Montblanc. Ламинация под дерево, окна для дачи и нестандартные формы.',
    image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/full_ewAHqpCF.jpg',
    tag: 'ГОСТ · Шумоизоляция 45 дБ',
    link: '#contact'
  },
  {
    id: 2,
    title: 'Балконы и лоджии под ключ',
    subtitle: 'Теплое остекление, раздвижные системы Slidors, вынос и расширение. Отделка сайдингом, панелями «Ханьи» и евровагонкой.',
    image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/Ns8vYDcL.jpg',
    tag: 'Ветрозащита от тайфунов',
    link: '#contact'
  },
  {
    id: 3,
    title: 'Алюминиевые витражи ALUTECH',
    subtitle: 'Фасадное остекление, теплый и холодный алюминий с порошковой окраской по каталогу RAL. Раздвижные порталы Patio.',
    image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/Al2fspIs.jpg',
    tag: 'Alutech · Любой цвет RAL',
    link: '#contact'
  },
  {
    id: 4,
    title: 'Ремонт и сервис окон',
    subtitle: 'Срочная замена разбитых стеклопакетов, регулировка прижима, замена изношенных уплотнителей и ремонт фурнитуры.',
    image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/full_7sqeCo56.jpg',
    tag: 'Выезд мастера в день заявки',
    link: '#contact'
  },
  {
    id: 5,
    title: 'Продажа окон без монтажа & Доставка по ДФО',
    subtitle: 'Готовые фабричные окна и под заказ с жесткой обрешеткой. Морские и авиа отправки в Анадырь, Южно-Сахалинск, Магадан, Петропавловск-Камчатский.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    tag: 'Доставка по всему Дальнему Востоку',
    link: '#contact',
    fullWidth: true
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-28 bg-[#03070f] text-white px-4 md:px-8 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
            Направления деятельности «Окна Центр»
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-5 tracking-tight">
            Что нужно <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">остеклить?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl mx-auto">
            Фабричные конструкции с собственного сборочного цеха. Адаптированы под сложный климат Владивостока, соленый морской воздух и перепады температур.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s) => (
            <a
              key={s.id}
              href={s.link}
              className={`group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer shadow-2xl block ${
                s.fullWidth ? 'md:col-span-2 md:h-[320px]' : ''
              }`}
            >
              <Image 
                src={asset(s.image)} 
                alt={s.title}
                fill
                sizes={s.fullWidth ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
              />
              
              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-slate-950/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Content Badge & Titles */}
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-400/30 backdrop-blur-md">
                  {s.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 sm:p-10 w-full z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2.5 tracking-tight group-hover:text-cyan-100 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                  {s.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span>Заказать бесплатный расчет</span>
                  <span>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
