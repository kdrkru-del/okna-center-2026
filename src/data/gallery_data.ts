export interface GalleryItem {
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
    location: "ул. Каплунова, 10",
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
    location: "Приморский край",
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
    location: "ул. Линейная, 20",
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
    location: "ст. Садгород",
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
    location: "ст. Садгород",
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

  // --- АЛЮМИНИЕВЫЕ КОНСТРУКЦИИ, ВИТРАЖИ И ПОРТАЛЫ ---
  {
    id: "entrance-lobby-hospital-1",
    src: "/images/portfolio/works/work-11-0d7a3898.jpg",
    title: "Остекленный входной тамбур административного здания",
    category: "facades",
    location: "Приморский край",
    specs: "Алюминиевый профиль · Стеклянная распашная дверь",
    client: "Медицинский комплекс",
    badge: "Входная группа"
  },
  {
    id: "entrance-lobby-hospital-2",
    src: "/images/portfolio/works/work-12-b090d201.jpg",
    title: "Витражный входной тамбур под козырьком — боковой ракурс",
    category: "facades",
    location: "Приморский край",
    specs: "Теплый фасадный профиль · Ударопрочные стеклопакеты",
    client: "Медицинский комплекс",
    badge: "Фасадный витраж"
  },
  {
    id: "cottage-stained-glass-facade",
    src: "/images/portfolio/works/work-13-c085b343.jpg",
    title: "Витражное остекление первого этажа коттеджа с зеркальной тонировкой",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Тонированные солнцезащитные стекла · Профиль в темном цвете",
    badge: "Витраж коттеджа"
  },
  {
    id: "sliding-portal-deck-terrace",
    src: "/images/portfolio/works/work-14-9bd3d680.jpg",
    title: "Раздвижной панорамный портал с выходом на открытую террасу",
    category: "facades",
    location: "Загородный дом, Приморье",
    specs: "Портальная раздвижная система · Низкий порог в пол",
    badge: "Раздвижной портал"
  },
  {
    id: "wood-house-sliding-portal",
    src: "/images/portfolio/works/work-15-8ef9a3c3.jpg",
    title: "Раздвижной портал под темный дуб с внутрипольным конвектором",
    category: "facades",
    location: "Загородная резиденция",
    specs: "Ламинация «темный дуб» · Энергосберегающий стеклопакет",
    badge: "Панорамный портал"
  },
  {
    id: "timber-house-entrance-annex",
    src: "/images/portfolio/works/work-16-25c9019d.jpg",
    title: "Остекленная входная веранда дома из бруса",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Остекление в пол · Пластиковая дверь со стеклопакетом",
    badge: "Входная веранда"
  },
  {
    id: "arched-entrance-cottage",
    src: "/images/portfolio/works/work-18-af4a1ae5.jpg",
    title: "Арочная входная группа со стеклянной дверью и шпросами",
    category: "facades",
    location: "Частный коттедж",
    specs: "Арочная фрамуга с лучевой раскладкой · Индивидуальный проект",
    badge: "Арочная группа"
  },
  {
    id: "commercial-anthracite-entrance",
    src: "/images/portfolio/works/work-20-0d799fd4.jpg",
    title: "Алюминиевая входная группа и витраж 2 этажа в цвете антрацит",
    category: "facades",
    location: "Офисный центр, Приморье",
    specs: "Теплый алюминий · Двустворчатая входная дверь",
    badge: "Бизнес-центр"
  },
  {
    id: "winter-pavilion-glazing",
    src: "/images/portfolio/works/work-22-f5c20034.jpg",
    title: "Теплое остекление зимней садовой беседки в темном профиле",
    category: "facades",
    location: "Загородный участок",
    specs: "Двухкамерные стеклопакеты · Ламинация в темный цвет",
    badge: "Зимняя беседка"
  },
  {
    id: "commercial-tinted-pavilion",
    src: "/images/portfolio/works/work-23-22f1f076.jpg",
    title: "Витражное остекление торгового павильона с зеркальным стеклом",
    category: "facades",
    location: "Коммерческий сектор",
    specs: "Зеркальная тонировка Solar · Декоративное оформление",
    badge: "Торговый витраж"
  },
  {
    id: "commercial-lobby-frame-assembly",
    src: "/images/portfolio/works/work-25-ec03a9dc.jpg",
    title: "Монтаж каркаса входного остекленного тамбура здания",
    category: "facades",
    location: "Общественное здание",
    specs: "Сборка несущего каркаса · Подготовка к установке стеклопакетов",
    badge: "Монтаж тамбура"
  },
  {
    id: "frame-house-panoramic-glazing",
    src: "/images/portfolio/works/work-26-b20475ba.jpg",
    title: "Панорамное остекление каркасного дома на сваях",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Окна в пол 1 этажа · Скошенный мансардный блок",
    badge: "Каркасный дом"
  },
  {
    id: "barnhouse-black-facade-glazing",
    src: "/images/portfolio/works/work-28-819c4402.jpg",
    title: "Фасадное остекление дома в стиле барнхаус в черном профиле",
    category: "facades",
    location: "Загородный дом",
    specs: "Черная матовая ламинация · Скошенные окна под конек крыши",
    badge: "Барнхаус"
  },
  {
    id: "modular-house-anthracite-portals",
    src: "/images/portfolio/works/work-35-37c3432f.jpg",
    title: "Панорамные раздвижные порталы модульного дома в цвете антрацит",
    category: "facades",
    location: "Современный модульный дом",
    specs: "Два раздвижных портала в пол · Цвет профиля антрацит",
    badge: "Модульный дом"
  },
  {
    id: "modular-house-corner-terrace",
    src: "/images/portfolio/works/work-36-5afd5904.jpg",
    title: "Угловой портальный фасад модульного дома с террасой",
    category: "facades",
    location: "Современный модульный дом",
    specs: "Панорамные сдвижные двери · Выход на открытую террасу",
    badge: "Террасный портал"
  },
  {
    id: "modular-house-side-vitrazh",
    src: "/images/portfolio/works/work-37-b8c935bb.jpg",
    title: "Витражное остекление торцевого фасада модульного дома",
    category: "facades",
    location: "Современный модульный дом",
    specs: "Глухие и сдвижные секции · Энергосберегающие стеклопакеты",
    badge: "Витражный фасад"
  },
  {
    id: "modular-house-terrace-access",
    src: "/images/portfolio/works/work-38-08f212b7.jpg",
    title: "Выход на открытую террасу через раздвижную портальную дверь",
    category: "facades",
    location: "Современный модульный дом",
    specs: "Портальная фурнитура с легким ходом · Безбарьерный порог",
    badge: "Сдвижной портал"
  },
  {
    id: "timber-annex-front-angle",
    src: "/images/portfolio/works/work-39-9cf1267a.jpg",
    title: "Остекленный входной тамбур дома из бруса — фасадный ракурс",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Входная пластиковая дверь со стеклом · Остекление в пол",
    badge: "Теплый тамбур"
  },
  {
    id: "modular-cottage-full-facade",
    src: "/images/portfolio/works/work-40-6a26f500.jpg",
    title: "Фасадный комплекс модульного коттеджа с панорамными порталами",
    category: "facades",
    location: "Современный модульный дом",
    specs: "Комплексное портальное остекление · Ламинация антрацит",
    badge: "Портальный фасад"
  },

  // --- БАЛКОНЫ И ЛОДЖИИ ---
  {
    id: "balcony-columns-cottage-1",
    src: "/images/portfolio/balconies/balcony-05-3c626b82.jpg",
    title: "Остекление выносного балкона коттеджа на опорных колоннах",
    category: "balconies",
    location: "Пригородный коттедж",
    specs: "Белый профиль ПВХ 70 мм · Двухкамерный энергопакет",
    badge: "Балкон на опорах"
  },
  {
    id: "balcony-columns-cottage-facade",
    src: "/images/portfolio/balconies/balcony-06-26d0aa83.jpg",
    title: "Фасадный вид кирпичного коттеджа с остекленным балконом",
    category: "balconies",
    location: "Пригородный коттедж",
    specs: "Комплексное остекление балкона на опорах и фасадных окон",
    badge: "Фасад с балконом"
  },
  {
    id: "balcony-top-floor-roof-extension",
    src: "/images/portfolio/balconies/balcony-07-1ee21426.jpg",
    title: "Балкон последнего этажа с независимой крышей и обшивкой",
    category: "balconies",
    location: "Кирпичный жилой дом",
    specs: "Сварная скатная кровля · Наружная отделка фасадными панелями",
    badge: "Балкон с крышей"
  },
  {
    id: "balcony-first-floor-brick-parapet",
    src: "/images/portfolio/balconies/balcony-08-efb4ba04.jpg",
    title: "П-образное остекление лоджии на кирпичном парапете",
    category: "balconies",
    location: "Жилой фонд, Приморье",
    specs: "Профиль 70 мм · Козырьки и водоотливы с виброизоляцией",
    badge: "Теплая лоджия"
  },
  {
    id: "balcony-corner-highrise-tinted",
    src: "/images/portfolio/balconies/balcony-09-3bf641ae.jpg",
    title: "Угловая лоджия в кирпичной новостройке с тонированными стеклами",
    category: "balconies",
    location: "Жилой комплекс, Приморье",
    specs: "Угловой эркерный соединитель · Тонированные стекла Solar",
    badge: "Угловая лоджия"
  },
  {
    id: "balcony-panoramic-bay-window",
    src: "/images/portfolio/balconies/balcony-10-af7ce6f5.jpg",
    title: "Панорамный эркерный балкон от пола до потолка",
    category: "balconies",
    location: "Многоквартирный дом",
    specs: "Трапециевидное остекление · Усиленный эркерный профиль",
    badge: "Панорамный эркер"
  },
  {
    id: "balcony-second-floor-cottage-terrace",
    src: "/images/portfolio/balconies/balcony-11-d9b4c9aa.jpg",
    title: "Панорамное остекление террасы второго этажа коттеджа",
    category: "balconies",
    location: "Загородный дом",
    specs: "Темно-серый профиль · Зеркальное солнцезащитное напыление",
    badge: "Терраса 2 этажа"
  },
  {
    id: "balcony-raised-steel-terrace",
    src: "/images/portfolio/balconies/balcony-12-f22dfe99.jpg",
    title: "Остекление высокой террасы на металлокаркасе с лестницей",
    category: "balconies",
    location: "Частный сектор",
    specs: "Монтаж на металлокаркасе · Ветрозащитная фурнитура",
    badge: "Терраса на опорах"
  },
  {
    id: "balcony-panoramic-long-gallery",
    src: "/images/portfolio/works/work-41-1f14b64f.jpg",
    title: "Панорамная лоджия от пола до потолка на этапе чистовой отделки",
    category: "balconies",
    location: "Пригородный жилой комплекс",
    specs: "Остекление в пол · Поворотно-откидные створки с микропроветриванием",
    badge: "Панорамная лоджия"
  },

  // --- ПЛАСТИКОВЫЕ ОКНА В КВАРТИРАХ И КОТТЕДЖАХ ---
  {
    id: "win-trapezoid-attic-shpros",
    src: "/images/portfolio/works/work-19-dee7f927.jpg",
    title: "Скошенные трапециевидные окна мансарды со шпросами",
    category: "windows",
    location: "Загородный коттедж",
    specs: "Нестандартная форма под скат крыши · Внутренняя раскладка",
    badge: "Мансардные трапеции"
  },
  {
    id: "win-timber-chalet-second-light",
    src: "/images/portfolio/works/work-21-04d71992.jpg",
    title: "Остекление второго света в строящемся коттедже из бруса",
    category: "windows",
    location: "Коттеджный поселок",
    specs: "Высокие фасадные трапеции со шпросами · Усиленный профиль",
    badge: "Второй свет"
  },
  {
    id: "win-trapezoid-closeup-shpros",
    src: "/images/portfolio/works/work-24-fb478276.jpg",
    title: "Трапециевидные окна со шпросами — крупный план монтажа",
    category: "windows",
    location: "Коттеджный поселок",
    specs: "Точная подгонка углов скоса · Армирование профиля 1.8 мм",
    badge: "Сложная геометрия"
  },
  {
    id: "win-luxury-chalet-woodgrain",
    src: "/images/portfolio/works/work-27-c9f65638.jpg",
    title: "Остекление двухэтажного шале из бруса окнами со шпросами",
    category: "windows",
    location: "Загородная усадьба",
    specs: "Двусторонняя ламинация под дерево · Декоративная раскладка",
    badge: "Усадьба из бруса"
  },
  {
    id: "win-brick-gazebo-shpros-1",
    src: "/images/portfolio/works/work-29-7423c5e1.jpg",
    title: "Остекление кирпичной садовой беседки окнами со шпросами",
    category: "windows",
    location: "Дачный участок",
    specs: "Многостворчатые окна с раскладкой · Надежная фурнитура",
    badge: "Кирпичная беседка"
  },
  {
    id: "win-timber-house-ladder-montage",
    src: "/images/portfolio/works/work-30-979e6bf8.jpg",
    title: "Монтаж ламинированных окон в коттедже из клееного бруса",
    category: "windows",
    location: "Коттеджная застройка",
    specs: "Установка в обсадную коробку · Монтаж по лазерному уровню",
    badge: "Монтаж в брус"
  },
  {
    id: "win-three-sash-grey-siding",
    src: "/images/portfolio/works/work-31-eec00674.jpg",
    title: "Трехстворчатое окно со шпросами на фасаде частного дома",
    category: "windows",
    location: "Пригородный дом",
    specs: "Профиль 70 мм · Теплый стеклопакет со шпросами",
    badge: "Фасадное окно"
  },
  {
    id: "win-brick-gazebo-corner-view",
    src: "/images/portfolio/works/work-32-2ce58345.jpg",
    title: "Остекление беседки из облицовочного кирпича — угловой ракурс",
    category: "windows",
    location: "Дачный участок",
    specs: "Защита от ветра и осадков · Замки и ручки в цвет профиля",
    badge: "Беседка со шпросами"
  },
  {
    id: "win-arched-dormer-sea-view",
    src: "/images/portfolio/works/work-33-b0781224.jpg",
    title: "Арочное окно со шпросами в мансарде с видом на залив",
    category: "windows",
    location: "Прибрежная зона, Приморье",
    specs: "Арочный гиб ПВХ-профиля · Энергосберегающий стеклопакет",
    badge: "Арочное окно"
  },
  {
    id: "win-timber-chalet-finished-view",
    src: "/images/portfolio/works/work-34-56a29c19.jpg",
    title: "Готовое остекление дома из бруса темными окнами со шпросами",
    category: "windows",
    location: "Коттеджная застройка",
    specs: "Ламинация профиля под дерево · Москитные сетки на створках",
    badge: "Дом под ключ"
  },
  {
    id: "win-aerated-concrete-two-story",
    src: "/images/portfolio/works/work-42-ca1c8018.jpg",
    title: "Остекление двухэтажного коттеджа из газобетона: панорамные и стандартные окна",
    category: "windows",
    location: "Строящийся коттедж",
    specs: "Панорамные окна в пол 1 этажа + двухстворчатые окна 2 этажа",
    badge: "Коттедж из блоков"
  },
];
