export default function ExperienceSection() {
  const stats = [
    { num: '22', label: 'Года опыта', desc: 'Работаем во Владивостоке и крае с 2004 года' },
    { num: '100%', label: 'Контроль по ГОСТ', desc: 'Собственный цех сборки и проверка геометрии' },
    { num: '0 ₽', label: 'Бесплатный замер', desc: 'Выезд инженера по Владивостоку и Уссурийску' },
    { num: 'ДФО', label: 'География поставок', desc: 'Отправка в Магадан, Сахалин, Камчатку, Анадырь' },
  ];

  return (
    <section id="about" className="py-28 bg-[#050b14] text-white px-4 md:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Text Block */}
          <div>
            <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
              О компании «Окна Центр»
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white mb-6 tracking-tight leading-tight">
              Собственная культура производства <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                с 2004 года
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              За 22 года работы на рынке Приморского края компания «Окна-Центр» сформировала строгие стандарты качества. Мы отобрали самых надежных партнеров по поставке немецкого и отечественного профиля, оригинальной фурнитуры и энергоэффективного стекла.
            </p>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
              Мы не просто продаем окна — мы оказываем комплексные архитектурные и инженерные услуги: от остекления квартир и сложнейших видовых балконов с выносом до фасадных алюминиевых витражей и прямых поставок конструкций в труднодоступные регионы Дальнего Востока.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
              >
                Вызвать инженера на замер
              </a>
              <a
                href="tel:84232725725"
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Позвонить в офис
              </a>
            </div>
          </div>

          {/* Right Highlights Banner */}
          <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
              Почему клиенты выбирают нас:
            </h3>

            <div className="space-y-6">
              {[
                { title: 'Фабричные изделия по ГОСТ', desc: 'Автоматизированный раскрой и сварка профиля исключают человеческий фактор и продувания.' },
                { title: 'Адаптация к приморскому климату', desc: 'Специальные формулы стеклопакетов и усиленные крепления, устойчивые к тайфунам и перепадам влажности.' },
                { title: 'Гибкая ценовая политика', desc: 'Прямые контракты с производителями позволяют предлагать честные цены без посреднических наценок.' },
                { title: 'Собственные монтажные бригады', desc: 'Установка окон и балконов строго по технологии с соблюдением 3-слойного монтажного шва.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
          {stats.map((st, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono mb-2">{st.num}</div>
              <div className="text-sm font-semibold text-white mb-1">{st.label}</div>
              <div className="text-xs text-slate-400 font-light">{st.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
