import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/company_info';
import { ShieldCheck, ArrowLeft, Lock, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных — Окна Центр',
  description: 'Официальная политика обработки персональных данных ООО «Окна-Центр» в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://окнацентр.рф/privacy' },
};

export default function PrivacyPage() {
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

        {/* Header Block */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                Политика обработки персональных данных
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Утверждена Генеральным директором ООО «Окна-Центр» Кошовенко Д. С. | Действует с 1 сентября 2025 г.
              </p>
            </div>
          </div>

          <div className="p-4 bg-cyan-50/60 rounded-xl border border-cyan-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
            <Lock className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
            <p>
              Настоящая Политика определяет порядок и условия обработки персональных данных, осуществляемой{' '}
              <strong>ООО «Окна-Центр»</strong> (ИНН 2543168553), при использовании сайта{' '}
              <strong>окнацентр.рф</strong>, а также устанавливает меры по обеспечению безопасности данных граждан РФ в соответствии с требованиями Федерального закона № 152-ФЗ.
            </p>
          </div>
        </div>

        {/* Content Block */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              1. Общие положения
            </h2>
            <p className="mb-2">
              1.1. Настоящая Политика составлена в соответствии с п. 2 ч. 1 ст. 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет позицию Оператора в области обработки и защиты персональных данных.
            </p>
            <p className="mb-2">
              1.2. <strong>Оператор персональных данных:</strong> Общество с ограниченной ответственностью «Окна-Центр» (ООО «Окна-Центр»), ОГРН 1222500021963, ИНН 2543168553, КПП 254301001. Юридический адрес: 690048, Приморский край, г. Владивосток, ул. Ильичёва, дом 29, офис 8.
            </p>
            <p>
              1.3. Политика распространяется на всю информацию, которую Оператор может получить о пользователях веб-сайта <code>https://окнацентр.рф</code> (включая зеркальные домены и посадочные страницы).
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              2. Цели обработки персональных данных
            </h2>
            <p className="mb-2">Оператор обрабатывает персональные данные исключительно для достижения следующих конкретных и законных целей:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Прием и обработка входящих заявок на расчет стоимости оконных конструкций, остекления, отделки балконов и сервисных работ;</li>
              <li>Организация бесплатного выезда специалиста для замера и технической консультации на объекте;</li>
              <li>Подготовка, заключение и исполнение договоров поставки и монтажа светопрозрачных конструкций;</li>
              <li>Связь с субъектом персональных данных по указанным контактным телефонам или каналам мессенджеров;</li>
              <li>Анализ эффективности работы веб-ресурса и рекламных кампаний без передачи контактных данных сторонним сервисам веб-аналитики.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              3. Состав обрабатываемых данных
            </h2>
            <p className="mb-2">Через формы обратной связи и интерактивные калькуляторы сайта могут обрабатываться:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Имя (или обращение, указанное пользователем);</li>
              <li>Контактный номер телефона;</li>
              <li>Город / населенный пункт в Приморском крае;</li>
              <li>Выбранный тип остекления, профильной системы, ориентировочные размеры и комментарии к заказу;</li>
              <li>Технические метаданные запроса: дата и время отправки, IP-адрес, источник перехода (UTM-метки).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              4. Правовые основания обработки
            </h2>
            <p className="mb-2">Правовыми основаниями обработки персональных данных Оператором являются:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Пункт 1 части 1 статьи 6 Федерального закона № 152-ФЗ — наличие отдельного информированного согласия субъекта персональных данных;</li>
              <li>Пункт 5 части 1 статьи 6 Федерального закона № 152-ФЗ — совершение действий по инициативе субъекта персональных данных в целях заключения договора (запрос замера, расчета сметы);</li>
              <li>Уставные документы ООО «Окна-Центр».</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              5. Локализация баз данных в РФ (ч. 5 ст. 18 152-ФЗ) и порядок обработки
            </h2>
            <p className="mb-2">
              5.1. В строгом соответствии с частью 5 статьи 18 Федерального закона № 152-ФЗ Оператор обеспечивает запись, систематизацию, накопление, хранение, уточнение и извлечение персональных данных граждан Российской Федерации с использованием баз данных, физически размещенных на территории Российской Федерации.
            </p>
            <p className="mb-2">
              5.2. Обработка персональных данных осуществляется смешанным (автоматизированным и неавтоматизированным) способом с соблюдением требований конфиденциальности (ст. 7 152-ФЗ).
            </p>
            <p>
              5.3. Передача персональных данных третьим лицам без согласия субъекта не допускается, за исключением случаев, прямо установленных законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              6. Сроки обработки и уничтожение данных (ст. 21 152-ФЗ)
            </h2>
            <p className="mb-2">
              6.1. Персональные данные хранятся не дольше, чем этого требуют цели обработки, либо до момента отзыва согласия субъектом.
            </p>
            <p>
              6.2. По достижении целей обработки или в случае отзыва согласия персональные данные подлежат уничтожению в течение 30 календарных дней, если иной срок не предусмотрен договором или действующим законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              7. Права субъекта персональных данных
            </h2>
            <p className="mb-2">Субъект персональных данных имеет право:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Получать сведения, касающиеся обработки его персональных данных Оператором;</li>
              <li>Требовать уточнения, блокирования или уничтожения своих персональных данных;</li>
              <li>Отозвать данное согласие в любой момент, направив письменное заявление Оператору.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2 mb-3">
              8. Файлы cookie и системы веб-аналитики
            </h2>
            <p className="mb-2">
              Сайт использует файлы cookie и обезличенные данные сервиса Яндекс.Метрика для оценки посещаемости и оптимизации интерфейса. Пользователь может в любой момент ограничить сохранение файлов cookie в настройках браузера.
            </p>
          </section>

          <section className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h2 className="text-sm sm:text-base font-bold text-slate-950 flex items-center space-x-2 mb-3">
              <Building2 className="w-4 h-4 text-cyan-700" />
              <span>9. Официальные реквизиты Оператора</span>
            </h2>
            <div className="space-y-1 font-mono text-xs text-slate-700">
              <p><strong>Оператор:</strong> {COMPANY_INFO.legalName}</p>
              <p><strong>Сокращенно:</strong> {COMPANY_INFO.shortLegalName}</p>
              <p><strong>ИНН:</strong> {COMPANY_INFO.inn} | <strong>КПП:</strong> {COMPANY_INFO.kpp}</p>
              <p><strong>ОГРН:</strong> {COMPANY_INFO.ogrn} | <strong>ОКПО:</strong> {COMPANY_INFO.okpo}</p>
              <p><strong>Генеральный директор:</strong> {COMPANY_INFO.director}</p>
              <p><strong>Юридический адрес:</strong> {COMPANY_INFO.legalAddress}</p>
              <p><strong>Телефоны:</strong> {COMPANY_INFO.mainPhone}, {COMPANY_INFO.additionalPhones[0].display}</p>
              <p><strong>Официальный Email:</strong> <a href={`mailto:${COMPANY_INFO.emails[0]}`} className="text-cyan-700 underline">{COMPANY_INFO.emails[0]}</a></p>
              <p><strong>Банк:</strong> {COMPANY_INFO.bank}, Р/с {COMPANY_INFO.rs}, БИК {COMPANY_INFO.bik}</p>
            </div>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-cyan-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться на сайт окнацентр.рф</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
