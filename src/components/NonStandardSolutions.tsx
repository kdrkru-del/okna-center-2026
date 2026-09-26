import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, DoorOpen, LayoutGrid, CheckCircle2 } from "lucide-react";
import { asset } from "@/lib/assetPath";

export default function NonStandardSolutions() {
  const items = [
    {
      title: "Алюминиевые окна и витражи",
      desc: "Теплые и холодные алюминиевые профили для увеличенных световых проемов, панорамных видов и коммерческих зданий.",
      icon: LayoutGrid,
      href: "/alyuminievye_okna_vladivostok",
    },
    {
      title: "Входные группы и двери",
      desc: "Надежные входные двери и тамбуры из усиленного алюминия и ПВХ с высокой проходимостью для магазинов и офисов.",
      icon: DoorOpen,
      href: "/alyuminievye_okna_vladivostok",
    },
    {
      title: "Фасадное остекление и коттеджи",
      desc: "Остекление коттеджей, веранд, зимних садов и вторых светов по индивидуальным размерам и архитектурным проектам.",
      icon: Building2,
      href: "/zaiavka_na_uslughi_kompanii_oknatsientr",
    },
  ];

  return (
    <section id="non-standard" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
              Дополнительное направление
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Нестандартные и алюминиевые конструкции
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Помимо стандартных пластиковых окон, наш производственный цех выполняет заказы на сложные алюминиевые системы и архитектурное остекление.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:text-white transition-colors">
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
