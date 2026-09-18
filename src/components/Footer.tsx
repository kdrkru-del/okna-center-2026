import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/company_info";
import logoImg from "../../public/images/logo/logo-original.png";

export default function Footer() {
  return (
    <footer className="bg-[#03070D] text-slate-400 border-t border-white/10 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1: Brand & Creds */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src={logoImg} alt="Окна Центр" width={40} height={40} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white uppercase font-sans">
                  ОКНА<span className="text-cyan-400">-</span>ЦЕНТР
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                  Владивосток · с 2004 года
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-light">
              Производство, продажа и монтаж пластиковых окон, теплого и холодного остекления балконов, лоджий под ключ, вентилируемых фасадов и алюминиевых систем в Приморском крае с 2004 года.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Гарантия по договору</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Заводской монтаж</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 font-mono">
              {COMPANY_INFO.legalName}
            </div>
          </div>

          {/* Col 2: Окна */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-semibold">
              Пластиковые окна
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/kupit_plastikovye_okna_vladivostok" className="hover:text-cyan-300 transition-colors">Купить окна ПВХ</Link></li>
              <li><Link href="/ustanovka_plastikovykh_okon_vo_vladivostokie" className="hover:text-cyan-300 transition-colors">Установка окон по ГОСТ</Link></li>
              <li><Link href="/zamena_plastic_okon_vladivostok" className="hover:text-cyan-300 transition-colors">Замена старых окон</Link></li>
              <li><Link href="/okna_pod_derevo_vladivostok" className="hover:text-cyan-300 transition-colors">Окна под дерево</Link></li>
              <li><Link href="/okna_dlya_dachi_vladivostok" className="hover:text-cyan-300 transition-colors">Окна для дачи от 4 000 ₽</Link></li>
              <li><Link href="/profil_dlya_okon" className="hover:text-cyan-300 transition-colors">Профили Rehau, KBE, Funke</Link></li>
              <li><Link href="/ievro_zhaliuzi" className="hover:text-cyan-300 transition-colors">Еврожалюзи и Зебра</Link></li>
            </ul>
          </div>

          {/* Col 3: Балконы и фасад */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-semibold">
              Балконы и фасад
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/osteklenie_balkona_vladivostok" className="hover:text-cyan-300 transition-colors">Остекление балконов</Link></li>
              <li><Link href="/lodgia_pod_klyuch_vladivostok" className="hover:text-cyan-300 transition-colors">Лоджия под ключ</Link></li>
              <li><Link href="/riemont_balkonov_vo_vladivostokie" className="hover:text-cyan-300 transition-colors">Ремонт и вынос балкона</Link></li>
              <li><Link href="/riemont_lodzhii_vo_vladivostokie" className="hover:text-cyan-300 transition-colors">Ремонт лоджий в комнату</Link></li>
              <li><Link href="/uteplenie_lodgiy_vladivostok" className="hover:text-cyan-300 transition-colors">Утепление Изопинком</Link></li>
              <li><Link href="/otdielochnyie_matierialy" className="hover:text-cyan-300 transition-colors">Отделочные материалы</Link></li>
              <li><Link href="/panieli_khani" className="hover:text-cyan-300 transition-colors">Фасадные панели Ханьи</Link></li>
              <li><Link href="/vinilovyi_saidingh" className="hover:text-cyan-300 transition-colors">Виниловый сайдинг</Link></li>
              <li><Link href="/alyuminievye_okna_vladivostok" className="hover:text-cyan-300 transition-colors">Алюминиевые окна</Link></li>
              <li><Link href="/aliuminiievyie_okna_i_dvieri" className="hover:text-cyan-300 transition-colors">Фасады ALT F50 / ALT 150</Link></li>
            </ul>
          </div>

          {/* Col 4: Контакты и филиалы */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-semibold">
              Контакты и офисы
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  г. Владивосток:
                </div>
                <div className="text-slate-400 mt-0.5 pl-5">
                  {COMPANY_INFO.offices[0].address}
                </div>
              </div>

              <div>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  г. Уссурийск:
                </div>
                <div className="text-slate-400 mt-0.5 pl-5">
                  {COMPANY_INFO.offices[1].address}
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={`tel:${COMPANY_INFO.mainPhoneRaw}`}
                  className="font-mono text-sm font-bold text-white hover:text-cyan-300 transition-colors block"
                >
                  {COMPANY_INFO.mainPhone}
                </a>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  WhatsApp: +7 (994) 010-03-00
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Email: okna.c@mail.ru
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/zaiavka_na_uslughi_kompanii_oknatsientr"
                  className="inline-block px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs uppercase font-mono tracking-wider transition-colors"
                >
                  Записаться на замер
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © 2004–2026 Компания «Окна Центр». Все права защищены.
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/ghalierieia_rabot" className="hover:text-slate-300 transition-colors">Галерея работ</Link>
            <Link href="/okonnaia_kompaniia_vladivostok" className="hover:text-slate-300 transition-colors">О компании</Link>
            <Link href="/contacts" className="hover:text-slate-300 transition-colors">Контакты</Link>
            <a href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Карта сайта (Sitemap)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
