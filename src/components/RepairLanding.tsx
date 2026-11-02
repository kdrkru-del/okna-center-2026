import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import {
  REPAIR_ANCHORS,
  REPAIR_BLOCKS,
  REPAIR_FAQ,
  REPAIR_NAV,
  REPAIR_PRICE_FALLBACK,
  REPAIR_PRICE_ROWS,
  REGULIROVKA_PAGE_SLUG,
} from "@/data/repair_landing";
import WindowDiagnosticBlock from "@/components/specialized/WindowDiagnosticBlock";
import SimpleMeasurementForm from "@/components/SimpleMeasurementForm";
import { asset } from "@/lib/assetPath";

const SECTION = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
/** Отступ для якорей: фиксированная шапка + липкое меню разделов */
const ANCHOR_OFFSET = "scroll-mt-32 sm:scroll-mt-40";

const PHONE_HREF = `tel:${COMPANY_INFO.mainPhoneRaw}`;
const WHATSAPP_HREF = `https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Здравствуйте! Нужен ремонт окон во Владивостоке."
)}`;

function CallButtons({ compact = false }: { compact?: boolean }) {
  const size = compact ? "px-5 py-3" : "px-6 py-3.5";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`#${REPAIR_ANCHORS.master}`}
        className={`${size} rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 flex items-center gap-2`}
      >
        <Wrench className="w-4 h-4" />
        <span>Вызвать мастера</span>
      </a>
      <a
        href={PHONE_HREF}
        className={`${size} rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm`}
      >
        <Phone className="w-4 h-4 text-cyan-600" />
        <span>{COMPANY_INFO.mainPhone}</span>
      </a>
    </div>
  );
}

export default function RepairLanding({ heroImage }: { heroImage: string }) {
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-16 sm:pt-20 selection:bg-cyan-500 selection:text-white">
      {/* Breadcrumbs */}
      <div className={`${SECTION} py-2.5`}>
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
          <span className="text-slate-900 font-medium truncate">Ремонт окон</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden pt-4 pb-12 lg:pt-6 lg:pb-16 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className={`${SECTION} relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 font-heading">
                Ремонт пластиковых окон во Владивостоке
              </h1>
              <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
                Окно дует, не закрывается, заклинила или сломалась ручка, треснул стеклопакет? Чиним уже установленные окна: регулируем, меняем уплотнители, фурнитуру, ручки и стеклопакеты — без замены всего окна.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                {[
                  COMPANY_INFO.experienceText,
                  COMPANY_INFO.guarantee,
                  "Офисы во Владивостоке и Уссурийске",
                  `Режим работы: ${COMPANY_INFO.workingHours}`,
                ].map((fact) => (
                  <div key={fact} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`#${REPAIR_ANCHORS.master}`}
                  className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Вызвать мастера</span>
                </a>
                <a
                  href={`#${REPAIR_ANCHORS.prices}`}
                  className="px-6 py-3.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-cyan-200"
                >
                  <span>Узнать стоимость</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={PHONE_HREF}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>{COMPANY_INFO.mainPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <Image
                  src={asset(heroImage)}
                  alt="Ремонт створки пластикового окна"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SECTION NAV */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80">
        <nav className={`${SECTION} py-2.5 flex gap-2 overflow-x-auto`} aria-label="Виды ремонта">
          {REPAIR_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 text-xs font-semibold text-slate-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ОБЩИЙ РЕМОНТ + ДИАГНОСТИКА */}
      <section id={REPAIR_ANCHORS.general} className={`${SECTION} py-14 ${ANCHOR_OFFSET}`}>
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Ремонт пластиковых окон</h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mt-3">
            Определяем причину неисправности и восстанавливаем нормальную работу окна: устраняем сквозняки, ремонтируем створки, чиним механизмы открывания. Выберите симптом — подскажем вероятную причину и способ ремонта.
          </p>
        </div>
        <WindowDiagnosticBlock ctaHref={`#${REPAIR_ANCHORS.master}`} />

        {/* Регулировка — отдельная полноценная страница */}
        <Link
          href={`/${REGULIROVKA_PAGE_SLUG}/`}
          className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-500/40 hover:bg-white hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">Регулировка окон</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Окно провисло, плохо закрывается или дует? Часто достаточно регулировки прижима и петель — без замены деталей.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-cyan-700 whitespace-nowrap">
            Подробнее о регулировке <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </section>

      {/* ВИДЫ РЕМОНТА */}
      {REPAIR_BLOCKS.map((block) => (
        <section
          key={block.id}
          id={block.id}
          className={`${SECTION} py-12 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">{block.title}</h2>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">{block.lead}</p>
              {block.note && (
                <p className="text-xs sm:text-sm text-cyan-900 bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 leading-relaxed">
                  {block.note}
                </p>
              )}
              <CallButtons compact />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs uppercase tracking-wide font-bold text-rose-700 mb-3">Когда нужен ремонт</h3>
                <ul className="space-y-2.5">
                  {block.signs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-700 leading-snug">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs uppercase tracking-wide font-bold text-cyan-800 mb-3">Что делает мастер</h3>
                <ul className="space-y-2.5">
                  {block.works.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ЦЕНЫ */}
      <section id={REPAIR_ANCHORS.prices} className={`${SECTION} py-14 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}>
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Цены на ремонт окон</h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mt-2 max-w-3xl">
            Стоимость зависит от вида неисправности, системы фурнитуры и размеров стеклопакета. Мастер называет итоговую стоимость до начала работ.
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="w-full min-w-[560px] text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-semibold text-xs">
                  <th className="py-3 px-4">Работа</th>
                  <th className="py-3 px-4">Ед. изм.</th>
                  <th className="py-3 px-4">Стоимость</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {REPAIR_PRICE_ROWS.map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {row.anchor ? (
                        <a href={`#${row.anchor}`} className="hover:text-cyan-700 transition-colors">{row.service}</a>
                      ) : (
                        row.service
                      )}
                      {row.note && <span className="block text-xs font-normal text-slate-500 mt-0.5">{row.note}</span>}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{row.unit}</td>
                    <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                      {row.price && row.status === "confirmed" ? (
                        <span className="text-slate-950">{row.price}</span>
                      ) : (
                        <span className="text-slate-500 font-semibold">{REPAIR_PRICE_FALLBACK}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <CallButtons compact />
            <p className="text-xs text-slate-500 max-w-md">
              Цены «от» — ориентировочные. Точную сумму определит мастер после осмотра и уточнения неисправности.
            </p>
          </div>
        </div>
      </section>

      {/* ВЫЗВАТЬ МАСТЕРА */}
      <section id={REPAIR_ANCHORS.master} className={`${SECTION} py-14 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Вызвать мастера</h2>
            <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Оставьте заявку или позвоните — уточним, что случилось с окном, и согласуем время визита мастера по Владивостоку и Приморскому краю.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={PHONE_HREF}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-400 transition-colors flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Позвонить</span>
                  <span className="font-bold text-slate-900 text-sm">{COMPANY_INFO.mainPhone}</span>
                </div>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-400 transition-colors flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Написать</span>
                  <span className="font-bold text-slate-900 text-sm">WhatsApp</span>
                </div>
              </a>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Режим работы</span>
                  <span className="font-bold text-slate-900 text-sm">{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Офис во Владивостоке</span>
                  <span className="font-bold text-slate-900 text-sm">{COMPANY_INFO.offices[0].address}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.guarantee}.</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SimpleMeasurementForm
              variant="repair"
              initialService="Вызов мастера по ремонту окон"
              source="remont_okon_page"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${SECTION} py-14 border-t border-slate-200/80`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-center mb-8">Частые вопросы о ремонте окон</h2>
          <div className="space-y-3">
            {REPAIR_FAQ.map((item) => (
              <details key={item.question} className="group rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden">
                <summary className="w-full p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 cursor-pointer list-none">
                  <span>{item.question}</span>
                  <ChevronDown className="w-4 h-4 text-cyan-600 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
