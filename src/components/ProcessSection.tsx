import React from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  FileText, 
  Ruler, 
  ClipboardCheck, 
  Factory, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      id: "lead",
      title: "Заявка",
      badge: "Первый шаг",
      desc: "Оставляете заявку на сайте или звоните по телефону 8 (423) 2-725-725 в удобное время.",
      feature: "Ответ специалиста за 15 минут",
      nextLabel: "К консультации",
      icon: PhoneCall,
    },
    {
      id: "consultation",
      title: "Консультация",
      badge: "Подбор решения",
      desc: "Технолог уточняет параметры остекления, пожелания по теплоизоляции и формирует предварительную смету.",
      feature: "Точный расчет под ваш бюджет",
      nextLabel: "К бесплатному замеру",
      icon: FileText,
    },
    {
      id: "measurement",
      title: "Замер 0 ₽",
      badge: "Бесплатный выезд",
      desc: "Инженер-замерщик с образцами профилей Rehau, KBE и ламинации бесплатно выезжает на объект.",
      feature: "Лазерная точность проемов",
      nextLabel: "К согласованию договора",
      icon: Ruler,
    },
    {
      id: "contract",
      title: "Договор и смета",
      badge: "Фиксация цены",
      desc: "Согласовываем комплектацию и фиксируем точную стоимость, сроки и гарантию в официальном договоре.",
      feature: "Цена не вырастет в процессе",
      nextLabel: "На заводскую сборку",
      icon: ClipboardCheck,
    },
    {
      id: "production",
      title: "Изготовление",
      badge: "Собственный цех",
      desc: "Автоматизированная сборка конструкций на сертифицированном оборудовании во Владивостоке за 4–7 дней.",
      feature: "Контроль геометрии по ГОСТ",
      nextLabel: "К монтажу",
      icon: Factory,
    },
    {
      id: "installation",
      title: "Монтаж по ГОСТ",
      badge: "Штатные мастера",
      desc: "Профессиональная установка с трехслойным швом (ПСУЛ, пена, гидроизоляция) и уборкой строительного мусора.",
      feature: "Опытные мастера со стажем",
      nextLabel: "К гарантии",
      icon: Wrench,
    },
    {
      id: "warranty",
      title: "Гарантия 5 лет",
      badge: "Официальный акт",
      desc: "Подписание акта сдачи-приемки объекта и оформление сервисного гарантийного талона.",
      feature: "Сервисное обслуживание",
      nextLabel: "К готовому объекту",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-24 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Прозрачный регламент</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Как мы работаем от заявки до гарантии
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Последовательный процесс без скрытых переплат: от вашей первой заявки к детальной консультации, точному замеру и монтажу по ГОСТ.
          </p>
        </div>

        {/* Linear Stepper Bar with Arrows (All screens) */}
        <div className="mb-12 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[780px] gap-2 px-1 text-xs">
            {steps.map((s) => {
              const StepIcon = s.icon;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white border border-slate-200/90 text-slate-800 font-medium whitespace-nowrap shadow-xs hover:border-cyan-400 transition-colors">
                    <StepIcon className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span>{s.title}</span>
                  </div>
                  <div className="flex items-center text-cyan-500 flex-shrink-0">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </React.Fragment>
              );
            })}
            <div className="flex items-center gap-2 py-1.5 px-3.5 rounded-xl bg-slate-900 text-white font-medium whitespace-nowrap shadow-xs">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Уют и комфорт</span>
            </div>
          </div>
        </div>

        {/* 4x2 Responsive Grid with Visual Connecting Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* 7 Process Steps */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-cyan-400 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between group">
                  
                  {/* Card Content */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200 text-[11px] font-mono uppercase tracking-wider font-semibold">
                        {step.badge}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-cyan-700 shadow-xs flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-800 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                      {step.desc}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200/80 text-[11px] text-slate-700 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{step.feature}</span>
                    </div>
                  </div>

                  {/* Card Footer: Step Progression Indicator */}
                  <div className="pt-5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-light text-[11px]">Далее:</span>
                    <div className="inline-flex items-center gap-1.5 text-cyan-700 font-semibold font-mono text-xs group-hover:text-cyan-800">
                      <span>{step.nextLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Desktop Connecting Arrow Beads */}
                  {/* For cards 0, 1, 2 in Row 1 */}
                  {(idx === 0 || idx === 1 || idx === 2) && (
                    <div
                      className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border-2 border-cyan-400 text-cyan-600 shadow-md items-center justify-center pointer-events-none group-hover:scale-110 group-hover:bg-cyan-50 transition-all"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}

                  {/* For card 3 (End of Row 1): Arrow pointing down to Row 2 */}
                  {idx === 3 && (
                    <div
                      className="hidden lg:flex absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-900 border border-cyan-400 text-cyan-300 shadow-lg items-center gap-1.5 pointer-events-none text-[10px] font-mono uppercase tracking-wider"
                      aria-hidden="true"
                    >
                      <span>К производству</span>
                      <ArrowDown className="w-3 h-3 stroke-[2.5] text-cyan-400" />
                    </div>
                  )}

                  {/* For cards 4, 5 in Row 2 */}
                  {(idx === 4 || idx === 5) && (
                    <div
                      className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border-2 border-cyan-400 text-cyan-600 shadow-md items-center justify-center pointer-events-none group-hover:scale-110 group-hover:bg-cyan-50 transition-all"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}

                  {/* For card 6 in Row 2: pointing to Final Result */}
                  {idx === 6 && (
                    <div
                      className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border-2 border-cyan-400 text-cyan-600 shadow-md items-center justify-center pointer-events-none group-hover:scale-110 group-hover:bg-cyan-50 transition-all"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                {/* Mobile / Tablet Connector Arrow Between Cards */}
                <div className="lg:hidden flex items-center justify-center py-1 -my-3 text-cyan-600 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 shadow-xs text-cyan-800 text-[11px] font-mono">
                    <span>{step.nextLabel}</span>
                    <ArrowDown className="w-3 h-3 stroke-[2.5] text-cyan-600" />
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Step 8 / Culmination Card: Ready Outcome */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800 text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Результат
                </span>
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Уют и тепло на 20+ лет
              </h3>
              
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                Надежное остекление, защищающее от ветра и штормов Приморского края. Комфортный климат в доме и экономия тепла.
              </p>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Сдано под ключ с гарантией</span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800">
              <Link
                href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Начать с заявки</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
