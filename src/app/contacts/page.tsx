import type { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Контакты компании «Окна Центр» во Владивостоке и Уссурийске — адреса, телефоны, реквизиты",
  description: "Офисы «Окна Центр»: Владивосток и Уссурийск. Телефоны: 8 (423) 2-725-725, WhatsApp: +7 (994) 010-03-00. Режим работы, консультация и бесплатный выезд замерщика по Приморскому краю.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/contacts/`,
  },
  openGraph: {
    title: "Контакты компании «Окна Центр» — адреса, телефоны, карта",
    description: "Офисы во Владивостоке и Уссурийске. С 2004 года на рынке Приморья.",
    url: `${COMPANY_INFO.domain}/contacts/`,
    siteName: COMPANY_INFO.name,
    locale: "ru_RU",
    type: "website",
  },
};

const contactsSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": COMPANY_INFO.name,
  "legalName": COMPANY_INFO.legalName,
  "url": COMPANY_INFO.domain,
  "telephone": COMPANY_INFO.mainPhone,
  "email": COMPANY_INFO.emails[0],
  "foundingDate": "2004",
  "priceRange": "₽₽",
  "address": COMPANY_INFO.offices.map((o) => ({
    "@type": "PostalAddress",
    "addressLocality": o.city,
    "addressRegion": "Приморский край",
    "addressCountry": "RU",
  })),
};

export default function ContactsPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactsSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-cyan-700 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 font-semibold">Контакты</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Контакты компании «Окна Центр»
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Приглашаем вас в наши фирменные офисы во Владивостоке и Уссурийске. Вы сможете лично оценить образцы профилей Rehau, KBE, Funke, варианты ламинации, фурнитуру и стеклопакеты, а также получить детальный расчет стоимости.
          </p>
        </div>
      </section>

      {/* Office Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Office Vladivostok */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-slate-200/50">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Владивосток</h2>
                  <span className="text-xs text-slate-500 block mt-0.5">Центральный офис</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 text-xs font-mono font-medium">
                  Шоурум и отдел продаж
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Адрес офиса:</span>
                    <span className="text-slate-900 font-bold text-base">г. Владивосток, ул. Ильичева, д. 29, оф. 8</span>
                    <span className="block text-xs text-slate-500 mt-0.5">Мастера выезжают на бесплатный замер по всему Владивостоку и пригороду</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Телефон:</span>
                    <a href="tel:+74232725725" className="text-base font-mono text-cyan-700 hover:underline font-bold">
                      8 (423) 2-725-725
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Режим работы:</span>
                    <span>Понедельник — Пятница: 9:00 – 18:00</span>
                    <span className="block">Суббота: 10:00 – 16:00</span>
                    <span className="block text-slate-500 text-xs">Воскресенье: по согласованию для выездных замеров</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
              <a
                href="tel:+74232725725"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-mono shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить в офис</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Уточнить в WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Office Ussuriysk */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-slate-200/50">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Уссурийск</h2>
                  <span className="text-xs text-slate-500 block mt-0.5">Филиал и монтажная служба</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-mono font-medium">
                  Офис и консультация
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Адрес офиса:</span>
                    <span className="text-slate-900 font-bold text-base">г. Уссурийск, ул. Кирова, д. 12, оф. 202</span>
                    <span className="block text-xs text-slate-500 mt-0.5">Бесплатный выезд на замер и монтаж по всему Уссурийску и району</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Телефон:</span>
                    <a href="tel:+79242606350" className="text-base font-mono text-cyan-700 hover:underline font-bold">
                      8 (924) 260-63-50
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Режим работы:</span>
                    <span>Понедельник — Пятница: 9:00 – 18:00</span>
                    <span className="block">Суббота: 10:00 – 15:00</span>
                    <span className="block text-slate-500 text-xs">Воскресенье: выходной</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
              <a
                href="tel:+79242606350"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-mono shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить в филиал</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Уточнить в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Online Messengers & Channels */}
      <section className="py-14 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-emerald-700 font-mono uppercase tracking-wider font-semibold block">Быстрый ответ в чате</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Чат WhatsApp</span>
                <span className="text-xs text-slate-500 block mt-0.5">+7 (994) 010-03-00</span>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.emails[0]}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-cyan-700 font-mono uppercase tracking-wider font-semibold block">Для смет и чертежей</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">Электронная почта</span>
                <span className="text-xs text-slate-500 block mt-0.5">{COMPANY_INFO.emails[0]}</span>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-300 flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider block">Гарантийный отдел</span>
                <span className="text-base font-bold text-slate-900">Сервисная служба</span>
                <span className="text-xs text-slate-500 block mt-0.5">Оперативный выезд мастера</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Company Requisites (E-E-A-T) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Реквизиты компании
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-3 font-mono text-xs text-slate-700 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-slate-200/80 gap-1">
              <span className="text-slate-500">Наименование:</span>
              <span className="font-semibold text-slate-900">{COMPANY_INFO.legalName}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-slate-200/80 gap-1">
              <span className="text-slate-500">Торговая марка:</span>
              <span className="text-slate-900">«Окна Центр» (Владивосток / Уссурийск)</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-slate-200/80 gap-1">
              <span className="text-slate-500">Опыт работы:</span>
              <span className="text-slate-900">С 2004 года (более 20 лет на рынке Приморья)</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-slate-200/80 gap-1">
              <span className="text-slate-500">Договор и гарантия:</span>
              <span className="text-emerald-700 font-medium">Официальный договор, гарантия на выполненные работы</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 gap-1">
              <span className="text-slate-500">Вид деятельности:</span>
              <span className="text-slate-900 sm:text-right">Производство, продажа и монтаж светопрозрачных конструкций</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />
    </div>
  );
}
