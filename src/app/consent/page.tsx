import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/company_info';
import { CheckCircle2, ArrowLeft, ShieldCheck, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных — Окна Центр',
  description: 'Условия согласия на обработку персональных данных клиентов ООО «Окна-Центр».',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://окнацентр.рф/consent' },
};

export default function ConsentPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-700 hover:text-cyan-800 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться на главную страницу</span>
        </Link>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                Согласие на обработку персональных данных
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                В соответствии со статьей 9 Федерального закона № 152-ФЗ «О персональных данных»
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          <p>
            Отправляя контактную форму, заявку на бесплатный замер, расчет стоимости остекления или обратный звонок на сайте <strong>окнацентр.рф</strong>, я, действуя свободно, своей волей и в своем интересе, выражаю свое конкретное, предметное, информированное, сознательное и однозначное согласие <strong>Обществу с ограниченной ответственностью «Окна-Центр»</strong> (ОГРН 1222500021963, ИНН 2543168553, адрес: 690048, Приморский край, г. Владивосток, ул. Ильичёва, дом 29, офис 8) на обработку моих персональных данных на следующих условиях:
          </p>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">1. Перечень обрабатываемых данных</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имя;</li>
              <li>Номер контактного телефона;</li>
              <li>Населенный пункт (Владивосток, Уссурийск, Артем и др.);</li>
              <li>Сведения о заказе (вид остекления, ориентировочные габариты, комментарии к расчету);</li>
              <li>Технические параметры сессии (IP-адрес, источник перехода).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">2. Цели обработки</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Предоставление консультации по ассортименту окон и услуг остекления;</li>
              <li>Предварительный расчет стоимости и согласование выезда замерщика;</li>
              <li>Связь для уточнения деталей заказа и подготовка договора;</li>
              <li>Исполнение гарантийных обязательств.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">3. Перечень действий с персональными данными</h2>
            <p>
              Сбор, запись, систематизация, накопление, хранение в базе данных на территории Российской Федерации (в соответствии с ч. 5 ст. 18 152-ФЗ), уточнение (обновление, изменение), использование, блокирование, удаление, уничтожение.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">4. Срок действия и порядок отзыва</h2>
            <p>
              Настоящее согласие действует с момента его предоставления до достижения целей обработки либо до момента его отзыва. Согласие может быть отозвано в любой момент путем направления письменного заявления на адрес электронной почты <strong>okna.c@mail.ru</strong> либо по юридическому адресу Оператора.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Оператор: ООО «Окна-Центр» (ИНН 2543168553)</span>
            <Link href="/privacy" className="text-cyan-700 underline font-medium">
              Ознакомиться с Политикой конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
