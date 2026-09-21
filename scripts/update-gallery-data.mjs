import fs from 'fs';

const content = `export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'key-objects' | 'windows' | 'balconies' | 'facades';
  location: string;
  specs?: string;
  client?: string;
  year?: string;
  isKeyObject?: boolean;
  badge?: string;
}

export const galleryCategories = [
  { id: 'all', label: 'Все работы' },
  { id: 'key-objects', label: '🏢 Ключевые объекты и ЖК' },
  { id: 'windows', label: '🪟 Пластиковые окна' },
  { id: 'balconies', label: '☀️ Балконы и лоджии' },
  { id: 'facades', label: '🏛️ Алюминий и порталы' },
] as const;

export const KEY_OBJECTS: GalleryItem[] = [
  {
    id: "kaplunova-10",
    src: "/images/portfolio/key-objects/kaplunova-10.png",
    title: "Каплунова, 10. Многоквартирный жилой дом, 24 этажа",
    category: "key-objects",
    location: "г. Владивосток, ул. Каплунова, 10",
    specs: "4 100 м² · 24 этажа",
    client: "СЗ «Ремстройцентр»",
    year: "2019–2020",
    isKeyObject: true,
    badge: "24 этажа · 4 100 м²"
  },
  {
    id: "kashtanovy-dvor",
    src: "/images/portfolio/key-objects/kashtanovy-dvor.png",
    title: "ЖК «Каштановый двор» (литер 4). Многоквартирный дом, 25 этажей",
    category: "key-objects",
    location: "г. Владивосток",
    specs: "25 этажей · Фасадное остекление",
    client: "«Девелопмент-Юг» / ООО «ПСК-Восток»",
    year: "2023",
    isKeyObject: true,
    badge: "25 этажей · Девелопмент-Юг"
  },
  {
    id: "ussuriysk-raduzhny",
    src: "/images/portfolio/key-objects/ussuriysk-raduzhny.png",
    title: "ЖК «Радужный». Жилой комплекс в Уссурийске",
    category: "key-objects",
    location: "г. Уссурийск, ул. Солнечная, 7а",
    specs: "Многоквартирный жилой фонд",
    client: "ЖК «Радужный»",
    year: "2022",
    isKeyObject: true,
    badge: "г. Уссурийск · Солнечная 7а"
  },
  {
    id: "sergeevka-msd",
    src: "/images/portfolio/key-objects/sergeevka-msd.png",
    title: "Остекление казарм 127 мотострелковой дивизии",
    category: "key-objects",
    location: "Приморский край, с. Сергеевка",
    specs: "Военные жилые корпуса",
    client: "Министерство обороны РФ",
    year: "2021",
    isKeyObject: true,
    badge: "Госзаказ · Минобороны РФ"
  },
  {
    id: "lineynaya-20",
    src: "/images/portfolio/key-objects/lineynaya-20.png",
    title: "Линейная, 20. 4-этажный многоквартирный дом",
    category: "key-objects",
    location: "г. Владивосток, ул. Линейная, 20",
    specs: "4 этажа · Светопрозрачные конструкции",
    client: "СЗ «Ремстройцентр»",
    year: "2021",
    isKeyObject: true,
    badge: "СЗ «Ремстройцентр»"
  },
  {
    id: "sadgorodskaya-23d",
    src: "/images/portfolio/key-objects/sadgorodskaya-23d.jpg",
    title: "Садгородская, 23Д. 4-этажный многоквартирный дом",
    category: "key-objects",
    location: "г. Владивосток, ст. Садгород",
    specs: "4 этажа · Монтаж по ГОСТ",
    client: "СЗ «Ремстройцентр»",
    year: "2021",
    isKeyObject: true,
    badge: "СЗ «Ремстройцентр»"
  },
  {
    id: "sadgorodskaya-23v",
    src: "/images/portfolio/key-objects/sadgorodskaya-23v.jpg",
    title: "Садгородская, 23В. 4-этажный многоквартирный дом",
    category: "key-objects",
    location: "г. Владивосток, ст. Садгород",
    specs: "4 этажа · Остекление фасадов",
    client: "СЗ «Ремстройцентр»",
    year: "2021",
    isKeyObject: true,
    badge: "СЗ «Ремстройцентр»"
  },
];

export const galleryItems: GalleryItem[] = [
  // --- КЛЮЧЕВЫЕ ОБЪЕКТЫ ---
  ...KEY_OBJECTS,

  // --- АЛЮМИНИЙ, ПОРТАЛЫ И СПЕЦПРОЕКТЫ ---
  {
    id: "dalzavod-hospital-1",
    src: "/images/portfolio/works/work-11-0d7a3898.jpg",
    title: "Остекление корпуса Дальзаводской больницы",
    category: "facades",
    location: "г. Владивосток",
    specs: "Алюминиевый профиль · Теплый фасад",
    client: "Дальзаводская больница",
    badge: "Гособъект"
  },
  {
    id: "dalzavod-hospital-2",
    src: "/images/portfolio/works/work-12-b090d201.jpg",
    title: "Фасадные алюминиевые конструкции медкомплекса",
    category: "facades",
    location: "г. Владивосток",
    specs: "Ударопрочные энергосберегающие стеклопакеты",
    client: "Дальзаводская больница",
    badge: "Алюминий"
  },
  {
    id: "sliding-portal-system-1",
    src: "/images/portfolio/works/work-13-c085b343.jpg",
    title: "Подъемно-раздвижная портальная система выхода на террасу",
    category: "facades",
    location: "Владивосток, пригородный коттедж",
    specs: "HS-портал · Панорамный вид",
    badge: "Портальная система"
  },
  {
    id: "aluminum-glazing-terrace",
    src: "/images/portfolio/works/work-14-9bd3d680.jpg",
    title: "Теплое фасадное остекление загородной террасы",
    category: "facades",
    location: "Владивосток, ст. Океанская",
    specs: "Архитектурный алюминиевый профиль",
    badge: "Алюминий"
  },
  {
    id: "commercial-facade-vitrazh",
    src: "/images/portfolio/works/work-15-8ef9a3c3.jpg",
    title: "Витражное остекление коммерческого здания",
    category: "facades",
    location: "г. Уссурийск",
    specs: "Входная группа и витражные секции",
    badge: "Коммерция"
  },
  {
    id: "private-villa-portal",
    src: "/images/portfolio/works/work-16-25c9019d.jpg",
    title: "Панорамное безрамное остекление загородного дома",
    category: "facades",
    location: "Приморье, б. Лазурная",
    specs: "Закаленное стекло 8 мм",
    badge: "Панорама"
  },
  {
    id: "cottage-architectural-windows",
    src: "/images/portfolio/works/work-18-af4a1ae5.jpg",
    title: "Комплексное фасадное остекление частного дома",
    category: "facades",
    location: "Владивосток, ст. Садгород",
    specs: "Индивидуальный проект",
    badge: "Коттедж"
  },

  // --- БАЛКОНЫ И ЛОДЖИИ ПОД КЛЮЧ ---
  {
    id: "balcony-turnkey-wood-finish",
    src: "/images/portfolio/balconies/balcony-05-3c626b82.jpg",
    title: "Лоджия под ключ с утеплением и отделкой ламинатом",
    category: "balconies",
    location: "Владивосток, ул. Русская",
    specs: "Утепление Изопинк 50 мм · Теплый пол",
    badge: "Под ключ"
  },
  {
    id: "balcony-panoramic-french",
    src: "/images/portfolio/balconies/balcony-06-26d0aa83.jpg",
    title: "Французский балкон от пола до потолка с энергосбережением",
    category: "balconies",
    location: "Владивосток, ул. Кирова",
    specs: "5-камерный профиль ПВХ 70 мм",
    badge: "Французский балкон"
  },
  {
    id: "balcony-extension-cladding",
    src: "/images/portfolio/balconies/balcony-07-1ee21426.jpg",
    title: "Вынос балкона с расширением плиты и сайдингом снаружи",
    category: "balconies",
    location: "Владивосток, ул. Нейбута",
    specs: "Сварочные работы · Вынос 30 см",
    badge: "Вынос плиты"
  },
  {
    id: "balcony-cabinet-warm",
    src: "/images/portfolio/balconies/balcony-08-efb4ba04.jpg",
    title: "Обустройство рабочего кабинета на утепленной лоджии",
    category: "balconies",
    location: "г. Уссурийск, ул. Кирова",
    specs: "Влагостойкие ПВХ-панели · Розетки и свет",
    badge: "Лоджия-кабинет"
  },
  {
    id: "balcony-glazing-pvc-turnkey",
    src: "/images/portfolio/balconies/balcony-09-3bf641ae.jpg",
    title: "Остекление 6-метровой лоджии с поворотно-откидными створками",
    category: "balconies",
    location: "Владивосток, ул. Баляева",
    specs: "Профиль Rehau 70 мм · Москитные сетки",
    badge: "6 метров"
  },
  {
    id: "balcony-side-insulation",
    src: "/images/portfolio/balconies/balcony-10-af7ce6f5.jpg",
    title: "Утепление парапета и боковых стен с гидроизоляцией",
    category: "balconies",
    location: "Владивосток, ул. Чкалова",
    specs: "Монтаж козырька и отлива с виброизоляцией",
    badge: "Гидроизоляция"
  },
  {
    id: "balcony-p-shape-roof",
    src: "/images/portfolio/balconies/balcony-11-d9b4c9aa.jpg",
    title: "П-образное остекление балкона последнего этажа с независимой крышей",
    category: "balconies",
    location: "Владивосток, Океанский пр-т",
    specs: "Сварной каркас крыши · Профнастил с шумоизоляцией",
    badge: "Крыша балкона"
  },
  {
    id: "balcony-interior-storage",
    src: "/images/portfolio/balconies/balcony-12-f22dfe99.jpg",
    title: "Встроенная мебель и шкаф на утепленном балконе",
    category: "balconies",
    location: "Владивосток, ул. Фадеева",
    specs: "Индивидуальный встроенный шкаф",
    badge: "Встроенная мебель"
  },

  // --- ПЛАСТИКОВЫЕ ОКНА В КВАРТИРАХ И ДОМАХ ---
  {
    id: "win-apartment-white-turnkey",
    src: "/images/portfolio/works/work-19-dee7f927.jpg",
    title: "Установка окон ПВХ с широким подоконником и теплыми откосами",
    category: "windows",
    location: "Владивосток, ул. Некрасовская",
    specs: "Профиль KBE 70 мм · Откосы сэндвич 10 мм",
    badge: "Монтаж по ГОСТ"
  },
  {
    id: "win-two-leaf-bedroom",
    src: "/images/portfolio/works/work-20-0d799fd4.jpg",
    title: "Двустворчатое окно с детским замком безопасности",
    category: "windows",
    location: "г. Уссурийск, ул. Ленина",
    specs: "Фурнитура ROTO NX · Микропроветривание",
    badge: "Детский замок"
  },
  {
    id: "win-three-leaf-living-large",
    src: "/images/portfolio/works/work-21-04d71992.jpg",
    title: "Трехстворчатое окно в кирпичном доме с шумоизоляцией",
    category: "windows",
    location: "Владивосток, Партизанский пр-т",
    specs: "Шумоизоляционный стеклопакет 40 мм",
    badge: "Шумоизоляция"
  },
  {
    id: "win-kitchen-turnkey-installation",
    src: "/images/portfolio/works/work-22-f5c20034.jpg",
    title: "Кухонное пластиковое окно с поворотно-откидной створкой",
    category: "windows",
    location: "Владивосток, ул. Калинина",
    specs: "Энергосберегающее i-стекло",
    badge: "Кухня"
  },
  {
    id: "win-wood-lamination-cottage-1",
    src: "/images/portfolio/works/work-23-22f1f076.jpg",
    title: "Окна с двухсторонней ламинацией «темный дуб» в загородном доме",
    category: "windows",
    location: "Владивосток, ст. Весенняя",
    specs: "Пленка Renolit Германия",
    badge: "Ламинация дуб"
  },
  {
    id: "win-cottage-panoramic-bay",
    src: "/images/portfolio/works/work-24-fb478276.jpg",
    title: "Эркерные оконные конструкции в частном доме",
    category: "windows",
    location: "Пригород, пос. Трудовое",
    specs: "Усиленные соединительные трубы",
    badge: "Эркер"
  },
  {
    id: "win-balcony-block-turnkey",
    src: "/images/portfolio/works/work-25-ec03a9dc.jpg",
    title: "Балконный блок: дверь с защелкой и глухое окно",
    category: "windows",
    location: "Владивосток, ул. Светланская",
    specs: "Профиль Rehau Grazio 70 мм",
    badge: "Балконный блок"
  },
  {
    id: "win-multi-room-apartment",
    src: "/images/portfolio/works/work-26-b20475ba.jpg",
    title: "Комплексная замена окон во всей 3-комнатной квартире",
    category: "windows",
    location: "Владивосток, пр-т 100-летия Владивостока",
    specs: "4 окна под ключ за 1 день",
    badge: "Квартира под ключ"
  },
  {
    id: "win-residential-renovation",
    src: "/images/portfolio/works/work-27-c9f65638.jpg",
    title: "Замена старых рассохшихся деревянных рам на теплый пластик",
    category: "windows",
    location: "г. Уссурийск, ул. Пушкина",
    specs: "Чистый демонтаж и вывоз старых рам",
    badge: "Замена окон"
  },
  {
    id: "win-cottage-shpros-decor",
    src: "/images/portfolio/works/work-28-819c4402.jpg",
    title: "Окна с декоративными золотыми шпросами внутри стеклопакета",
    category: "windows",
    location: "Пригород, ст. Седанка",
    specs: "Внутренняя раскладка 18 мм",
    badge: "Шпросы"
  },
  {
    id: "win-apartment-soundproof",
    src: "/images/portfolio/works/work-29-7423c5e1.jpg",
    title: "Окна с повышенной звукоизоляцией для выходящих на трассу комнат",
    category: "windows",
    location: "Владивосток, ул. Алеутская",
    specs: "Стекла разной толщины (6 мм + 4 мм)",
    badge: "Антишум"
  },
  {
    id: "win-suburban-cottage-white",
    src: "/images/portfolio/works/work-30-979e6bf8.jpg",
    title: "Остекление двухэтажного коттеджа из газобетона",
    category: "windows",
    location: "Владивосток, урочище Соловей Ключ",
    specs: "14 оконных конструкций Rehau",
    badge: "Коттедж 14 окон"
  },
  {
    id: "win-turn-tilt-microvent",
    src: "/images/portfolio/works/work-31-eec00674.jpg",
    title: "Пластиковое окно с 4-ступенчатым микропроветриванием",
    category: "windows",
    location: "Владивосток, ул. Луговая",
    specs: "Зимнее и щелевое проветривание",
    badge: "Микропроветривание"
  },
  {
    id: "win-cottage-large-glazing",
    src: "/images/portfolio/works/work-32-2ce58345.jpg",
    title: "Панорамные окна в гостиную с выходом во двор",
    category: "windows",
    location: "Владивосток, ст. Садгород",
    specs: "Армирование 1.8 мм · Ветроустойчивость",
    badge: "Панорама"
  },
  {
    id: "win-brick-house-installation",
    src: "/images/portfolio/works/work-33-b0781224.jpg",
    title: "Установка окон в кирпичном доме с глубокими четвертями",
    category: "windows",
    location: "Владивосток, ул. Суханова",
    specs: "Глубокие подоконники Danke 45 см",
    badge: "Кирпичный дом"
  },
  {
    id: "win-laminated-grey-modern",
    src: "/images/portfolio/works/work-34-56a29c19.jpg",
    title: "Современные окна в трендовом цвете «антрацит» (темно-серый)",
    category: "windows",
    location: "Владивосток, ул. Прапорщика Комарова",
    specs: "Матовая ламинация Антрацит",
    badge: "Стиль Антрацит"
  },
  {
    id: "win-cottage-attic-glazing",
    src: "/images/portfolio/works/work-35-37c3432f.jpg",
    title: "Остекление мансардного этажа загородного дома",
    category: "windows",
    location: "Пригород, пос. Новый",
    specs: "Скошенные трапециевидные рамы",
    badge: "Мансарда"
  },
  {
    id: "win-apartment-high-floor",
    src: "/images/portfolio/works/work-36-5afd5904.jpg",
    title: "Окна в высотном доме с повышенной ветровой нагрузкой",
    category: "windows",
    location: "Владивосток, ул. Жигура",
    specs: "Усиленный стальной вкладыш",
    badge: "Ветрозащита"
  },
  {
    id: "win-private-residence-full",
    src: "/images/portfolio/works/work-37-b8c935bb.jpg",
    title: "Остекление загородной резиденции премиальным профилем Funke",
    category: "windows",
    location: "Владивосток, район Шаморы",
    specs: "Шелковисто-глянцевая поверхность",
    badge: "Профиль Funke"
  },
  {
    id: "win-kitchen-danke-sill",
    src: "/images/portfolio/works/work-38-08f212b7.jpg",
    title: "Окно на кухне с акриловым термостойким подоконником",
    category: "windows",
    location: "Владивосток, ул. Толстого",
    specs: "Подоконник устойчив к царапинам и горячему",
    badge: "Подоконник Danke"
  },
  {
    id: "win-living-room-bay-3",
    src: "/images/portfolio/works/work-39-9cf1267a.jpg",
    title: "Светопрозрачный эркер в гостиной панельного дома 83 серии",
    category: "windows",
    location: "Владивосток, ул. Сабанеева",
    specs: "Идеальная теплоизоляция угла",
    badge: "83 серия"
  },
  {
    id: "win-cottage-entrance-glazing",
    src: "/images/portfolio/works/work-40-6a26f500.jpg",
    title: "Входной тамбур коттеджа с теплыми стеклопакетами",
    category: "windows",
    location: "г. Уссурийск, п. Радужный",
    specs: "Многозапорный замок · Теплый порог",
    badge: "Входной тамбур"
  },
  {
    id: "win-panoramic-view-vladivostok",
    src: "/images/portfolio/works/work-41-1f14b64f.jpg",
    title: "Видовые окна с видом на Амурский залив",
    category: "windows",
    location: "Владивосток, мыс Бурный",
    specs: "Солнцезащитное напыление Solar",
    badge: "Видовая квартира"
  },
  {
    id: "win-loggia-turnkey-interior",
    src: "/images/portfolio/works/work-42-ca1c8018.jpg",
    title: "Утепленная лоджия с двухкамерными стеклопакетами",
    category: "balconies",
    location: "Владивосток, ул. Добровольского",
    specs: "3 стекла · Аргон внутри стеклопакета",
    badge: "Теплая лоджия"
  }
];
`;

fs.writeFileSync('src/data/gallery_data.ts', content, 'utf8');
console.log('src/data/gallery_data.ts successfully updated with 43 real objects!');
