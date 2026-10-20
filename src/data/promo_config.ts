export interface PromoOption {
  id: 'loggia-3m' | 'loggia-6m';
  title: string;
  sizeLabel: string;
  price: string;
  priceNumeric: number;
  fullLabel: string;
}

export interface LoggiaPromoConfig {
  /** Включить или отключить акцию на сайте */
  enabled: boolean;
  /** Заголовок бейджа */
  badge: string;
  /** Основной заголовок акции */
  heading: string;
  /** Текст вкладки в свёрнутом состоянии */
  tabLabel: string;
  /** Реальное фото лоджии из портфолио компании */
  imagePath: string;
  imageAlt: string;
  /** Варианты остекления лоджий по акции */
  options: readonly [PromoOption, PromoOption];
  /** Обязательное примечание о комплектации (без неподтверждённых обещаний) */
  disclaimer: string;
  /** Необязательная дата окончания акции (например, "30 ноября" или пусто) */
  validUntil?: string;
  /** Таймер автопоказа на десктопе (мс) */
  triggerDelayMs: number;
  /** Процент прокрутки страницы для автопоказа на десктопе */
  triggerScrollPercent: number;
  /** Количество дней паузы после закрытия крестиком */
  suppressDaysAfterClose: number;
  /** Список URL-путей, где разрешён показ десктопного виджета акции */
  allowedDesktopPaths: string[];
  /** Список URL-путей, где показ строго запрещён */
  excludedPaths: string[];
}

export const LOGGIA_PROMO_CONFIG: LoggiaPromoConfig = {
  enabled: true,
  badge: 'Специальное предложение',
  heading: 'Остекление лоджий по специальной цене',
  tabLabel: 'Акция на лоджии',
  imagePath: '/images/legacy/4584baf08d4d0c3367ff109454676224.jpg',
  imageAlt: 'Остекление лоджии — реальный объект компании Окна Центр',
  options: [
    {
      id: 'loggia-3m',
      title: 'Лоджия 3 метра',
      sizeLabel: '3 метра',
      price: '69 000 ₽',
      priceNumeric: 69000,
      fullLabel: 'Лоджия 3 метра — 69 000 ₽',
    },
    {
      id: 'loggia-6m',
      title: 'Лоджия 6 метров',
      sizeLabel: '6 метров',
      price: '99 000 ₽',
      priceNumeric: 99000,
      fullLabel: 'Лоджия 6 метров — 99 000 ₽',
    },
  ],
  disclaimer: 'Подробности комплектации уточняйте у менеджера.',
  validUntil: '',
  triggerDelayMs: 2000,
  triggerScrollPercent: 15,
  suppressDaysAfterClose: 1,
  allowedDesktopPaths: [
    '*',
  ],
  excludedPaths: ['/contacts', '/zaiavka_na_uslughi_kompanii_oknatsientr'],
};
