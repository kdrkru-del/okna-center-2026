export interface PriceItem {
  id: string;
  category: 'windows' | 'balconies' | 'aluminum' | 'repairs' | 'blinds' | 'materials';
  name: string;
  priceFrom: string;
  unit?: string;
  sourcePage: string;
  status: 'confirmed' | 'conflicting' | 'unknown';
  needsReview: boolean;
  note?: string;
  isPopular?: boolean;
}

export const ALL_PRICES: PriceItem[] = [
  // --- ОКНА ---
  {
    id: "okno-bez-ustanovki",
    category: "windows",
    name: "Окно ПВХ без установки",
    priceFrom: "от 14 000 ₽",
    unit: "шт.",
    sourcePage: "/kupit_plastikovye_okna_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Цена готового окна стандартных размеров со склада без монтажных работ.",
    isPopular: true
  },
  {
    id: "okno-2-stvorchatoye-pod-klyuch",
    category: "windows",
    name: "2-х створчатое окно под ключ",
    priceFrom: "от 19 500 ₽",
    unit: "конструкция",
    sourcePage: "/ustanovka_plastikovykh_okon_vo_vladivostokie",
    status: "confirmed",
    needsReview: false,
    note: "Включает замер, демонтаж старой рамы, доставку, монтаж по ГОСТ, подоконник, отлив и отделку откосов.",
    isPopular: true
  },
  {
    id: "okno-3-stvorchatoye-pod-klyuch",
    category: "windows",
    name: "3-х створчатое окно под ключ",
    priceFrom: "По расчёту",
    unit: "изделие",
    sourcePage: "/ustanovka_plastikovykh_okon_vo_vladivostokie",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации, выбранного профиля (Rehau, KBE, Funke) и размеров проема."
  },
  {
    id: "balkonniy-blok",
    category: "windows",
    name: "Балконный блок (дверь + окно)",
    priceFrom: "По расчёту",
    unit: "комплект",
    sourcePage: "/ustanovka_plastikovykh_okon_vo_vladivostokie",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации: типа открывания балконной двери, глухого или поворотно-откидного окна, глубины откосов."
  },
  {
    id: "okna-dacha-gluhoe",
    category: "windows",
    name: "Дачное окно глухое 600×900 мм",
    priceFrom: "от 4 000 ₽",
    unit: "шт.",
    sourcePage: "/okna_dlya_dachi_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Экономичное готовое решение для дач, бань и летних веранд со склада."
  },
  {
    id: "okna-dacha-povorotnoye",
    category: "windows",
    name: "Дачное окно поворотное 1000×1000 мм",
    priceFrom: "от 11 900 ₽",
    unit: "шт.",
    sourcePage: "/okna_dlya_dachi_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Готовое окно с поворотной створкой для загородного дома."
  },
  {
    id: "okna-dacha-dvuhstvorchatoye",
    category: "windows",
    name: "Дачное окно 2-створчатое 1200×1200 мм",
    priceFrom: "от 15 400 ₽",
    unit: "шт.",
    sourcePage: "/okna_dlya_dachi_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Двустворчатая конструкция для жилой дачи или коттеджа."
  },
  {
    id: "okna-pod-derevo",
    category: "windows",
    name: "Окна с ламинацией под дерево (LG / Renolit)",
    priceFrom: "По расчёту",
    unit: "конструкция",
    sourcePage: "/okna_pod_derevo_vladivostok",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации и выбора односторонней или двухсторонней ламинации (более 40 расцветок)."
  },

  // --- БАЛКОНЫ И ЛОДЖИИ ---
  {
    id: "osteklenie-balkona-cold",
    category: "balconies",
    name: "Остекление балкона (раздвижной алюминий)",
    priceFrom: "от 55 000 ₽",
    unit: "балкон",
    sourcePage: "/osteklenie_balkona_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Холодное остекление, защита от ветра, дождя и пыли без перегрузки балконной плиты.",
    isPopular: true
  },
  {
    id: "lodgia-pod-klyuch-warm",
    category: "balconies",
    name: "Лоджия под ключ (теплое остекление ПВХ)",
    priceFrom: "от 79 000 ₽",
    unit: "лоджия",
    sourcePage: "/lodgia_pod_klyuch_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Теплый многокамерный контур ПВХ, гидроизоляция, базовое утепление парапета и пола.",
    isPopular: true
  },
  {
    id: "french-balcony",
    category: "balconies",
    name: "Французское остекление (панорамное в пол)",
    priceFrom: "По расчёту",
    unit: "конструкция",
    sourcePage: "/osteklenie_balkona_vladivostok",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации: высота остекления, тип профиля, солнцезащитные или энергосберегающие стеклопакеты."
  },
  {
    id: "remont-balkona-vinos",
    category: "balconies",
    name: "Ремонт балкона со сварочными работами и выносом",
    priceFrom: "По расчёту",
    unit: "объект",
    sourcePage: "/riemont_balkonov_vo_vladivostokie",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость рассчитывается индивидуально после замера: состояние плиты, объем сварочных работ, вынос вперед и по бокам."
  },
  {
    id: "remont-lodzhii-v-komnatu",
    category: "balconies",
    name: "Ремонт лоджии с объединением в комнату",
    priceFrom: "По расчёту",
    unit: "лоджия",
    sourcePage: "/riemont_lodzhii_vo_vladivostokie",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость рассчитывается индивидуально: многослойное утепление (Изопинк), пароизоляция, теплый пол и чистовая отделка."
  },
  {
    id: "uteplenie-isopink",
    category: "balconies",
    name: "Утепление балкона / лоджии экструдированным Изопинком",
    priceFrom: "По расчёту",
    unit: "м²",
    sourcePage: "/uteplenie_lodgiy_vladivostok",
    status: "unknown",
    needsReview: false,
    note: "Экструдированный пенополистирол с пазогребневым стыком, влагостойкий, долговечный."
  },
  {
    id: "otdelka-paneli-khani",
    category: "balconies",
    name: "Наружная обшивка фасадными панелями «Ханьи»",
    priceFrom: "По расчёту",
    unit: "м²",
    sourcePage: "/panieli_khani",
    status: "unknown",
    needsReview: false,
    note: "Стальной формованный лист с полиуретановым утеплителем 16мм, фактуры дикого камня и кирпича."
  },
  {
    id: "otdelka-saiding",
    category: "balconies",
    name: "Наружная обшивка виниловым сайдингом",
    priceFrom: "По расчёту",
    unit: "м²",
    sourcePage: "/vinilovyi_saidingh",
    status: "unknown",
    needsReview: false,
    note: "Ветрозащитная легкая обшивка парапета с уличной стороны."
  },

  // --- АЛЮМИНИЕВЫЕ КОНСТРУКЦИИ ---
  {
    id: "al-okna",
    category: "aluminum",
    name: "Алюминиевые окна (теплый профиль с терморазрывом)",
    priceFrom: "По расчёту",
    unit: "м²",
    sourcePage: "/alyuminievye_okna_vladivostok",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации: архитектурный алюминий, терморазрыв, габариты и цвет по каталогу RAL."
  },
  {
    id: "al-dveri-fasady",
    category: "aluminum",
    name: "Алюминиевые двери и входные группы",
    priceFrom: "По расчёту",
    unit: "изделие",
    sourcePage: "/aliuminiievyie_okna_i_dvieri",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации: интенсивность проходимости, маятниковые или распашные системы, фурнитура и доводчики."
  },
  {
    id: "al-facade-alt-f50",
    category: "aluminum",
    name: "Стоечно-ригельные фасады ALT F50 / ALT 150",
    priceFrom: "По расчёту",
    unit: "м²",
    sourcePage: "/aliuminiievyie_okna_i_dvieri",
    status: "conflicting",
    needsReview: true,
    note: "Стоимость зависит от конфигурации и рассчитывается по инженерному проекту с учетом ветровых нагрузок Приморья."
  },

  // --- РЕМОНТ И РЕГУЛИРОВКА ОКОН ---
  {
    id: "remont-regulirovka-stvorok",
    category: "repairs",
    name: "Регулировка створки окна (простая)",
    priceFrom: "от 250 ₽",
    unit: "створка",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Настройка прижима зима/лето, устранение легкого провисания и трения.",
    isPopular: true
  },
  {
    id: "remont-regulirovka-complex",
    category: "repairs",
    name: "Регулировка створки сложная / с восстановлением геометрии",
    priceFrom: "от 700 ₽",
    unit: "створка",
    sourcePage: "/regulirovka_plastikovykh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Перепакечивание, выправление геометрии створки технологическими подкладками."
  },
  {
    id: "remont-zamena-uplotnitelya",
    category: "repairs",
    name: "Замена уплотнителя на створке и раме",
    priceFrom: "от 250 ₽",
    unit: "пог. м",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Качественный резиновый уплотнитель EPDM, устранение продуваний и свиста ветра.",
    isPopular: true
  },
  {
    id: "remont-zamena-ruchki",
    category: "repairs",
    name: "Замена ручки оконной белой",
    priceFrom: "от 350 ₽",
    unit: "шт.",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Прочная алюминиевая ручка Roto / Hoppe взамен треснувшей."
  },
  {
    id: "remont-ruchka-s-zamkom",
    category: "repairs",
    name: "Установка оконной ручки с ключом (детский замок)",
    priceFrom: "от 750 ₽",
    unit: "шт.",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Блокировка открывания окна детьми, ключи в комплекте."
  },
  {
    id: "remont-zamena-furnitury",
    category: "repairs",
    name: "Ремонт / замена основного запора фурнитуры",
    priceFrom: "По расчёту",
    unit: "створка",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "unknown",
    needsReview: false,
    note: "Замена вышедших из строя механизмов, шестеренок, угловых переключателей."
  },
  {
    id: "remont-zamena-steklopaketa",
    category: "repairs",
    name: "Замена разбитого / разгерметизированного стеклопакета",
    priceFrom: "от 1 500 ₽",
    unit: "изделие",
    sourcePage: "/remont_plastikovyh_okon_vladivostok",
    status: "confirmed",
    needsReview: false,
    note: "Замер проема, заводское изготовление и замена с новыми штапиками."
  },

  // --- ЖАЛЮЗИ И РУЛОННЫЕ ШТОРЫ ---
  {
    id: "zhalyuzi-zebra",
    category: "blinds",
    name: "Жалюзи «Зебра» (день / ночь)",
    priceFrom: "По расчёту",
    unit: "шт.",
    sourcePage: "/ievro_zhaliuzi",
    status: "unknown",
    needsReview: false,
    note: "Двухслойное полотно с чередующимися прозрачными и плотными полосами.",
    isPopular: true
  },
  {
    id: "zhalyuzi-euro",
    category: "blinds",
    name: "Еврожалюзи алюминиевые горизонтальные",
    priceFrom: "от 2 900 ₽",
    unit: "шт.",
    sourcePage: "/ievro_zhaliuzi",
    status: "confirmed",
    needsReview: false,
    note: "Компактная посадка вплотную к стеклу, не мешают открыванию створки."
  },
  {
    id: "zhalyuzi-roll",
    category: "blinds",
    name: "Рулонные жалюзи тканевые",
    priceFrom: "от 3 200 ₽",
    unit: "шт.",
    sourcePage: "/ievro_zhaliuzi",
    status: "confirmed",
    needsReview: false,
    note: "Широкий каталог фактур, светозащита от полупрозрачной до полного Blackout."
  }
];

export function renderPriceDisplay(item: PriceItem): string {
  if (item.status === 'confirmed') {
    return item.priceFrom;
  }
  return 'По расчёту';
}

export function getPricesByCategory(cat: string): PriceItem[] {
  if (cat === 'all') return ALL_PRICES;
  return ALL_PRICES.filter(p => p.category === cat);
}

export function getPricesBySourcePage(slug: string): PriceItem[] {
  const normalized = slug.startsWith('/') ? slug : `/${slug}`;
  return ALL_PRICES.filter(p => p.sourcePage === normalized);
}

export function getPriceById(id: string): PriceItem | undefined {
  return ALL_PRICES.find(p => p.id === id);
}
