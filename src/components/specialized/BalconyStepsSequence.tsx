"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Step {
  id: string;
  badge: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  keyAction: string;
}

const STEPS: Step[] = [
  {
    id: "measurement",
    badge: "Замер и расчет",
    title: "Инженерный замер и расчет нагрузок",
    shortDesc: "Оценка состояния плиты и геодезический лазерный замер.",
    fullDesc: "Инженер рассчитывает ветровые нагрузки с учетом этажа и розы ветров Владивостока. Определяет допустимую нагрузку на балконную плиту перекрытия и необходимость усиления.",
    duration: "1 день (выезд бесплатно)",
    keyAction: "Составление точной технологической карты и фиксированной сметы"
  },
  {
    id: "welding",
    badge: "Сварочные работы",
    title: "Сварочные работы и усиление каркаса",
    shortDesc: "Сварка металлокаркаса, вынос по полу или по подоконнику.",
    fullDesc: "Изготовление жесткой стальной фермы из профильной трубы. Усиление парапета анкерами в несущую стену. При необходимости — монтаж независимой крыши на верхних этажах.",
    duration: "1–2 дня",
    keyAction: "Антикоррозийная обработка металлоконструкций грунтом"
  },
  {
    id: "cladding",
    badge: "Наружная обшивка",
    title: "Наружная обшивка и гидроизоляция",
    shortDesc: "Обшивка виниловым сайдингом или фасадными панелями Ханьи.",
    fullDesc: "Монтаж ветрозащитной мембраны и фасадного материала снаружи до установки остекления. Защищает балкон от штормовых дождей, морской соли и ультрафиолета.",
    duration: "1 день",
    keyAction: "Герметизация отливов и карнизов полиуретановым герметиком"
  },
  {
    id: "glazing",
    badge: "Монтаж рам",
    title: "Установка оконных конструкций",
    shortDesc: "Монтаж теплых рам Rehau/KBE или раздвижного алюминия.",
    fullDesc: "Установка оконных блоков по лазерному уровню. Крепление на усиленные анкерные пластины и монтажные турбовинты. Трехслойный шов по ГОСТ (ПСУЛ, пена, пароизоляция).",
    duration: "1 день",
    keyAction: "Регулировка прижима всех створок и установка москитных сеток"
  },
  {
    id: "insulation",
    badge: "Теплоизоляция",
    title: "Капитальное бесшовное утепление",
    shortDesc: "Монтаж Изопинка или ПСБС с пароизоляцией Изоспан.",
    fullDesc: "Укладка плит экструдированного пенополистирола в 1–2 слоя с перехлестом стыков. Пропенивание швов профессиональной пеной. Укладка фольгированного отражающего слоя изофола.",
    duration: "1–2 дня",
    keyAction: "Полное исключение «мостиков холода» и промерзания углов"
  },
  {
    id: "finishing",
    badge: "Чистовая отделка",
    title: "Чистовая отделка и электрика",
    shortDesc: "Обшивка МДФ/ПВХ, настил теплого пола, свет и розетки.",
    fullDesc: "Монтаж стеновых панелей выбранного декора, настил шпунтованной доски или фанеры с ламинатом/линолеумом. Монтаж инфракрасного теплого пола с терморегулятором, светильников и бельевых сушилок.",
    duration: "1–2 дня",
    keyAction: "Уборка строительного мусора и сдача объекта по акту"
  }
];

export default function BalconyStepsSequence() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const cur = STEPS[activeStep];

  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Технологический цикл благоустройства: от сварки до отделки
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mt-1">
            Все работы выполняются штатными бригадами «Окна Центр» без привлечения сторонних субподрядчиков. Гарантия на всю конструкцию по единому договору.
          </p>
        </div>

        <div className="text-right font-mono text-xs text-slate-500">
          <span>Срок выполнения: </span>
          <span className="text-cyan-700 font-bold">от 3 до 7 рабочих дней</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeStep === idx
                ? "bg-slate-950 border-slate-950 shadow-md scale-[1.02]"
                : "bg-white border-slate-200/80 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <span className={`text-xs font-mono font-bold block mb-1 ${activeStep === idx ? "text-cyan-400" : "text-cyan-700"}`}>
              {s.badge}
            </span>
            <span className={`text-xs font-semibold line-clamp-2 leading-snug ${activeStep === idx ? "text-white" : "text-slate-900"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200 text-xs font-mono font-semibold uppercase tracking-wider">
                {cur.badge}
              </span>
              <h4 className="text-2xl font-bold text-slate-900">{cur.title}</h4>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {cur.fullDesc}
            </p>

            <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs text-slate-800">
              <span className="text-cyan-800 font-bold block mb-1 font-mono uppercase tracking-wider">
                Ключевой стандарт качества:
              </span>
              <span>{cur.keyAction}</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                Ориентировочное время:
              </span>
              <span className="text-base font-bold text-slate-900 font-mono block mb-4">
                {cur.duration}
              </span>

              <div className="space-y-2 text-xs text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Штатные мастера со стажем</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Вывоз строительного мусора</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Договор и гарантийный талон</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Далее: {STEPS[(activeStep + 1) % STEPS.length].badge}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}