export default function MaterialsSection() {
  const systems = [
    {
      title: 'ПВХ-профили (Германия / Россия)',
      brands: 'Funke, KBE, Rehau, Montblanc',
      desc: 'Высококачественные пластиковые системы класса А с многокамерной структурой. Обеспечивают максимальное сохранение тепла в приморские морозы и подавление шума улицы.',
      specs: [
        'Шумоизоляция до 45 дБ',
        'Энергосберегающие 2- и 3-камерные стеклопакеты',
        'Ламинация в любой цвет и текстуру под дерево',
        'Срок службы профиля более 45 лет',
      ],
      badge: 'Для квартир и коттеджей'
    },
    {
      title: 'Алюминиевые системы ALUTECH',
      brands: 'Alutech Alt W62 / Alt F50 / Patio',
      desc: 'Архитектурное витражное остекление с терморазрывом (теплый алюминий) и легкие холодные конструкции. Сверхпрочные рамы для панорамного остекления от пола до потолка.',
      specs: [
        'Порошковая окраска по всему каталогу RAL',
        'Сверхвысокая устойчивость к тайфунам и ветру',
        'Раздвижные подъемно-сдвижные порталы Patio',
        'Тонкие элегантные рамы с максимальным световым проемом',
      ],
      badge: 'Премиум панорамы и фасады'
    },
    {
      title: 'Отделочные материалы & Жалюзи',
      brands: 'Панели «Ханьи», Сайдинг, Евро-жалюзи',
      desc: 'Комплексные решения для финишной наружной и внутренней отделки балконов и лоджий. Устойчивость к перепадам влажности, плесени и прямому солнцу.',
      specs: [
        'Японские фасадные панели «Ханьи» с утеплителем',
        'Виниловый сайдинг и евровагонка',
        'Рулонные евро-жалюзи и системы «Зебра» под размер',
        'Пластиковые подоконники, водоотливы и козырьки',
      ],
      badge: 'Отделка под ключ'
    },
  ];

  return (
    <section id="materials" className="py-28 bg-[#02060d] text-white px-4 md:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
            Сертифицированные комплектующие
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white mb-5 tracking-tight">
            Материалы и <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">профильные системы</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto">
            Работаем только с проверенными поставщиками оригинального профиля, качественной немецкой фурнитуры и сертифицированного стекла.
          </p>
        </div>

        {/* Systems Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {systems.map((sys, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group"
            >
              <div>
                <div className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {sys.badge}
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                  {sys.title}
                </h3>
                
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6">
                  {sys.brands}
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed mb-8">
                  {sys.desc}
                </p>

                <div className="space-y-3.5 pt-6 border-t border-white/10 mb-8">
                  {sys.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 bg-white/5 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/10 hover:border-cyan-400 font-semibold rounded-xl text-center text-xs uppercase tracking-wider transition-all duration-300"
              >
                Подобрать систему
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
