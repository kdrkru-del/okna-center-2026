import React from "react";
import { ClipboardCheck, PhoneCall, Ruler, FileText, Factory, Wrench, ShieldCheck } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Заявка",
      desc: "Оставляете заявку на сайте или по телефону 8 (423) 2-725-725",
      icon: PhoneCall,
    },
    {
      num: "02",
      title: "Консультация",
      desc: "Технолог уточняет размеры и рассчитывает предварительную смету за 15 минут",
      icon: FileText,
    },
    {
      num: "03",
      title: "Замер 0 ₽",
      desc: "Инженер-замерщик с каталогами образцов бесплатно выезжает на объект",
      icon: Ruler,
    },
    {
      num: "04",
      title: "Договор",
      desc: "Фиксируем точную стоимость и сроки в официальном договоре с гарантией",
      icon: ClipboardCheck,
    },
    {
      num: "05",
      title: "Изготовление",
      desc: "Автоматизированная сборка на заводе во Владивостоке за 4–7 дней",
      icon: Factory,
    },
    {
      num: "06",
      title: "Монтаж по ГОСТ",
      desc: "Профессиональная установка с трехслойным швом и уборкой мусора",
      icon: Wrench,
    },
    {
      num: "07",
      title: "Гарантия 5 лет",
      desc: "Подписание акта приемки и сервисное гарантийное обслуживание",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="py-20 bg-[#04080E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Прозрачный регламент
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Как мы работаем от заявки до гарантии
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Проверенная система сервиса «Окна Центр», исключающая задержки и строительный брак
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-cyan-400 font-mono">{step.num}</span>
                    <div className="p-2.5 rounded-xl bg-white/5 text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
