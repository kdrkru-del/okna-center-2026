"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
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
} from "@/data/repair_landing";
import WindowDiagnosticBlock from "@/components/specialized/WindowDiagnosticBlock";
import SimpleMeasurementForm from "@/components/SimpleMeasurementForm";
import { asset } from "@/lib/assetPath";
import { useMeasurementModal } from "@/context/ModalContext";

const SECTION = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
/** Отступ для якорей: фиксированная шапка + липкое меню разделов */
const ANCHOR_OFFSET = "scroll-mt-32 sm:scroll-mt-40";

const PHONE_HREF = `tel:${COMPANY_INFO.mainPhoneRaw}`;
const WHATSAPP_HREF = `https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Здравствуйте! Нужен ремонт пластиковых окон."
)}`;

function selectServiceInForm(service?: string) {
  if (!service || typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("select-repair-service", { detail: { service } })
  );
}

function CallButtons({
  compact = false,
  serviceLabel,
}: {
  compact?: boolean;
  serviceLabel?: string;
}) {
  const { openMeasurementModal } = useMeasurementModal();
  const size = compact ? "px-5 py-3" : "px-6 py-3.5";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => openMeasurementModal(serviceLabel || "Вызов мастера по ремонту окон")}
        className={`${size} rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 flex items-center gap-2 cursor-pointer`}
      >
        <Wrench className="w-4 h-4" />
        <span>Вызвать мастера</span>
      </button>
      <a
        href={PHONE_HREF}
        className={`${size} rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm`}
      >
        <Phone className="w-4 h-4 text-cyan-600" />
        <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        data-placement="repair_call_buttons_whatsapp"
        className={`${size} rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 shadow-sm`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>В WhatsApp</span>
      </a>
    </div>
  );
}

export default function RepairLanding({ heroImage }: { heroImage: string }) {
  const { openMeasurementModal } = useMeasurementModal();
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-16 sm:pt-20 selection:bg-cyan-500 selection:text-white">
      {/* Breadcrumbs */}
      <div className={`${SECTION} py-2.5`}>
        <nav
          className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap"
          aria-label="Хлебные крошки"
        >
          <Link href="/" className="hover:text-cyan-700 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
          <span className="text-slate-900 font-medium truncate">
            Ремонт пластиковых окон
          </span>
        </nav>
      </div>

      {/* HERO (Первый экран) */}
      <section className="relative overflow-hidden pt-4 pb-12 lg:pt-6 lg:pb-16 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className={`${SECTION} relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-950 text-xs font-bold tracking-wide shadow-xs">
                <Clock className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                <span>Выезд мастера в удобное для вас время · Владивосток, Артём и Уссурийск</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 font-heading">
                Срочный ремонт пластиковых окон
              </h1>

              <p className="text-slate-800 text-base sm:text-xl font-semibold leading-snug">
                Регулировка окон, замена стеклопакетов, уплотнителей, ручек и ремонт фурнитуры.
              </p>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                Восстанавливаем герметичность и плавную работу уже установленных окон без замены всей рамы: устраняем продувания и перекосы створок, меняем разбитые или запотевшие стеклопакеты, изношенные уплотнители, сломанные ручки и механизмы запирания.
              </p>

              {/* Подтверждённые преимущества компании */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700 pt-1">
                {[
                  COMPANY_INFO.experienceText,
                  COMPANY_INFO.guarantee,
                  "Ремонт без замены всего окна",
                  `Режим работы: ${COMPANY_INFO.workingHours}`,
                ].map((fact) => (
                  <div key={fact} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              {/* Кнопки первого экрана */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openMeasurementModal("Вызов мастера по ремонту окон")}
                  className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-slate-900/10 flex items-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Вызвать мастера</span>
                </button>
                <a
                  href={PHONE_HREF}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-slate-300 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>Позвонить: {COMPANY_INFO.mainPhone}</span>
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-placement="repair_hero_whatsapp"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Написать в WhatsApp</span>
                </a>
                <a
                  href={`#${REPAIR_ANCHORS.prices}`}
                  className="px-5 py-3.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 border border-cyan-200"
                >
                  <span>Цены</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <Image
                  src={asset(heroImage)}
                  alt="Ремонт и регулировка пластикового окна — Окна Центр"
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

      {/* ЛИПКАЯ НАВИГАЦИЯ ПО 8 РАЗДЕЛАМ */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80">
        <nav
          className={`${SECTION} py-2.5 flex gap-2 overflow-x-auto`}
          aria-label="Навигация по видам ремонта окон"
        >
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

      {/* РАЗДЕЛ 1: ОБЩИЙ РЕМОНТ + ДИАГНОСТИКА (#remont-okon) */}
      <section
        id={REPAIR_ANCHORS.general}
        className={`${SECTION} py-14 ${ANCHOR_OFFSET}`}
      >
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
            Ремонт пластиковых окон
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mt-3">
            Выполняем комплексную диагностику и ремонт пластиковых окон: устраняем сквозняки и продувания, восстанавливаем геометрию створок, ремонтируем и меняем комплектующие. Выберите симптом поломки ниже — система покажет причину и рекомендуемый способ устранения.
          </p>
        </div>
        <WindowDiagnosticBlock ctaHref={`#${REPAIR_ANCHORS.master}`} />
      </section>

      {/* РАЗДЕЛЫ 2–6: ВИДЫ РЕМОНТА (#regulirovka-okon, #zamena-steklopaketov, #zamena-uplotniteley, #remont-furnitury, #zamena-ruchek) */}
      {REPAIR_BLOCKS.map((block) => (
        <section
          key={block.id}
          id={block.id}
          className={`${SECTION} py-12 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
                {block.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                {block.lead}
              </p>
              {block.note && (
                <p className="text-xs sm:text-sm text-cyan-900 bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 leading-relaxed">
                  {block.note}
                </p>
              )}
              <CallButtons compact serviceLabel={block.serviceOptionLabel} />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs uppercase tracking-wide font-bold text-rose-700 mb-3">
                  Признаки неисправности
                </h3>
                <ul className="space-y-2.5">
                  {block.signs.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-slate-700 leading-snug"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs uppercase tracking-wide font-bold text-cyan-800 mb-3">
                  Что входит в работу мастера
                </h3>
                <ul className="space-y-2.5">
                  {block.works.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-2 text-sm text-slate-700 leading-snug"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {block.subItems && block.subItems.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              {block.subItemsTitle && (
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 font-heading">
                  {block.subItemsTitle}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {block.subItems.map((sub) => (
                  <div
                    key={sub.title}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      {sub.badge && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-50 text-cyan-800 font-bold border border-cyan-200 mb-2">
                          {sub.badge}
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        {sub.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* РАЗДЕЛ 7: ЦЕНЫ НА РЕМОНТ (#ceny-na-remont) */}
      <section
        id={REPAIR_ANCHORS.prices}
        className={`${SECTION} py-14 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}
      >
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
            Цены на ремонт окон
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mt-2 max-w-3xl">
            Стоимость ремонтных работ зависит от характера неисправности, профильной системы, марки фурнитуры и размеров стеклопакета. Мастер проводит осмотр и согласовывает точную стоимость до начала работ.
          </p>

          <div className="overflow-x-auto mt-6">
            <table className="w-full min-w-[560px] text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-semibold text-xs">
                  <th className="py-3 px-4">Услуга по ремонту окон</th>
                  <th className="py-3 px-4">Ед. изм.</th>
                  <th className="py-3 px-4">Стоимость</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {REPAIR_PRICE_ROWS.map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {row.anchor ? (
                        <a
                          href={`#${row.anchor}`}
                          className="hover:text-cyan-700 transition-colors"
                        >
                          {row.service}
                        </a>
                      ) : (
                        row.service
                      )}
                      {row.note && (
                        <span className="block text-xs font-normal text-slate-500 mt-0.5">
                          {row.note}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{row.unit}</td>
                    <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                      {row.price && row.status === "confirmed" ? (
                        <span className="text-slate-950">{row.price}</span>
                      ) : (
                        <span className="text-slate-600 font-semibold">
                          {REPAIR_PRICE_FALLBACK}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Блок отправки фото поломки в WhatsApp */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Не уверены, какая деталь сломалась?</span>
              </span>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-xl">
                Сфотографируйте поврежденный механизм или продувание и пришлите в WhatsApp. Мастер бесплатно оценит сложность и назовет ориентировочную цену ремонта за 10–15 минут.
              </p>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-placement="repair_price_whatsapp_photo"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Прислать фото поломки</span>
            </a>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <CallButtons compact />
            <p className="text-xs text-slate-500 max-w-md">
              Указанные цены «от» являются базовыми. Окончательная сумма фиксируется мастером после диагностики окна.
            </p>
          </div>
        </div>
      </section>

      {/* РАЗДЕЛ 8: ВЫЗВАТЬ МАСТЕРА (#vyzov-mastera) */}
      <section
        id={REPAIR_ANCHORS.master}
        className={`${SECTION} py-14 border-t border-slate-200/80 ${ANCHOR_OFFSET}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
                Вызвать мастера
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mt-2">
                Оставьте заявку через форму или позвоните по телефону — мы уточним, что случилось с окном, ответим на вопросы по стоимости и согласуем удобное время приезда мастера.
              </p>
            </div>

            {/* Карточки быстрой связи */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={PHONE_HREF}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-400 transition-colors flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Позвонить</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {COMPANY_INFO.mainPhone}
                  </span>
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
                  <span className="text-slate-500 block">Написать или прислать фото поломки</span>
                  <span className="font-bold text-slate-900 text-sm">
                    WhatsApp
                  </span>
                </div>
              </a>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Режим работы</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {COMPANY_INFO.workingHours}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Гарантийные обязательства</span>
                  <span className="font-bold text-slate-900 text-sm">
                    Официальный договор и гарантия
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
              <span>
                {COMPANY_INFO.guarantee}. Работаем с {COMPANY_INFO.foundedYear} года.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SimpleMeasurementForm
              variant="repair"
              initialService="Вызов мастера по ремонту окон (общая диагностика)"
              source="remont_okon_page"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${SECTION} py-14 border-t border-slate-200/80`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-center mb-8">
            Частые вопросы о ремонте окон
          </h2>
          <div className="space-y-3">
            {REPAIR_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden"
              >
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
