import type { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Building2, 
  FileText, 
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
    <div className="bg-[#03070D] text-white min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactsSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-cyan-300 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-200">Контакты</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Офисы в Приморском крае</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Контакты компании «Окна Центр»
          </h1>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Приглашаем вас в наши фирменные офисы во Владивостоке и Уссурийске. Вы сможете лично оценить образцы профилей Rehau, KBE, Funke, варианты ламинации, фурнитуру и стеклопакеты, а также получить детальный расчет стоимости.
          </p>
        </div>
      </section>

      {/* Office Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Office Vladivostok */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">Центральный офис</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Владивосток</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                  Главный офис
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Адрес офиса:</span>
                    <span className="text-cyan-300 font-medium">Перед визитом уточните адрес офиса по телефону</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Мастера выезжают на бесплатный замер по всему Владивостоку и пригороду</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Телефон:</span>
                    <a href="tel:+74232725725" className="text-base font-mono text-cyan-300 hover:underline font-bold">
                      8 (423) 2-725-725
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Режим работы:</span>
                    <span>Понедельник — Пятница: 9:00 – 18:00</span>
                    <span className="block">Суббота: 10:00 – 16:00</span>
                    <span className="block text-slate-400 text-xs">Воскресенье: по согласованию для выездных замеров</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href="tel:+74232725725"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить в офис</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Уточнить в WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Office Ussuriysk */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">Филиал и монтажная служба</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Уссурийск</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono">
                  Филиал
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Адрес офиса:</span>
                    <span className="text-cyan-300 font-medium">Перед визитом уточните адрес офиса по телефону</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Бесплатный выезд на замер и монтаж по всему Уссурийску и району</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Телефон:</span>
                    <a href="tel:+79242606350" className="text-base font-mono text-cyan-300 hover:underline font-bold">
                      8 (924) 260-63-50
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Режим работы:</span>
                    <span>Понедельник — Пятница: 9:00 – 18:00</span>
                    <span className="block">Суббота: 10:00 – 15:00</span>
                    <span className="block text-slate-400 text-xs">Воскресенье: выходной</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href="tel:+79242606350"
                className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить в филиал</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Уточнить в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Online Messengers & Channels */}
      <section className="py-14 bg-slate-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block">Быстрый ответ в чате</span>
                <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">Чат WhatsApp</span>
                <span className="text-xs text-slate-400 block mt-0.5">+7 (994) 010-03-00</span>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.emails[0]}`}
              className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider block">Для смет и чертежей</span>
                <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">Электронная почта</span>
                <span className="text-xs text-slate-400 block mt-0.5">{COMPANY_INFO.emails[0]}</span>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-cyan-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">Гарантийный отдел</span>
                <span className="text-base font-bold text-white">Сервисная служба</span>
                <span className="text-xs text-slate-400 block mt-0.5">Оперативный выезд мастера</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Company Requisites (E-E-A-T) */}
      <section className="py-16 bg-[#060B12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono uppercase tracking-widest mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Юридическая информация</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Реквизиты компании
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3 font-mono text-xs text-slate-300">
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-white/5 gap-1">
              <span className="text-slate-400">Наименование:</span>
              <span className="font-semibold text-white">{COMPANY_INFO.legalName}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-white/5 gap-1">
              <span className="text-slate-400">Торговая марка:</span>
              <span className="text-white">«Окна Центр» (Владивосток / Уссурийск)</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-white/5 gap-1">
              <span className="text-slate-400">Опыт работы:</span>
              <span className="text-white">С 2004 года (более 20 лет на рынке Приморья)</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-white/5 gap-1">
              <span className="text-slate-400">Договор и гарантия:</span>
              <span className="text-emerald-400">Официальный договор, гарантия на выполненные работы</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 gap-1">
              <span className="text-slate-400">Вид деятельности:</span>
              <span className="text-white text-right">Производство, продажа и монтаж светопрозрачных конструкций</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadForm />
    </div>
  );
}
