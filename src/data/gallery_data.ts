export interface GalleryItem {
  id: string;
  src: string;
  photos?: string[];
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
  // --- 1. КЛЮЧЕВЫЕ ОБЪЕКТЫ И ЖК ---
  ...KEY_OBJECTS,

  // --- 2. ПЛАСТИКОВЫЕ ОКНА (КАЖДАЯ КАРТОЧКА — УНИКАЛЬНЫЙ ОБЪЕКТ) ---
  {
    id: "win-rehau-panoramic-living",
    src: "/images/bento/bento-rehau-windows.jpg",
    title: "Панорамное остекление просторной гостиной профилем Rehau с энергосбережением",
    category: "windows",
    location: "Жилой комплекс, Приморье",
    specs: "Профиль Rehau 70 мм · Мультифункциональное стекло",
    badge: "Rehau 70 мм"
  },
  {
    id: "win-timber-chalet-second-light",
    src: "/images/portfolio/works/work-21-04d71992.jpg",
    photos: [
      "/images/portfolio/works/work-21-04d71992.jpg",
      "/images/portfolio/works/work-24-fb478276.jpg"
    ],
    title: "Остекление второго света и трапециевидные окна со шпросами в коттедже из бруса",
    category: "windows",
    location: "Коттеджный поселок",
    specs: "Высокие фасадные трапеции со шпросами · Усиленный профиль",
    badge: "Второй свет · 2 фото"
  },
  {
    id: "win-wood-lamination-bay",
    src: "/images/legacy/fa88e5ce2640e3d853524a7973ba151a.jpg",
    title: "Эркерные окна с ламинацией «темный дуб» Renolit и золотыми шпросами",
    category: "windows",
    location: "Пригород, пос. Трудовое",
    specs: "Эркерная труба · Ламинация Renolit · Золотая раскладка",
    badge: "Эркер под дуб"
  },
  {
    id: "win-timber-house-montage",
    src: "/images/portfolio/works/work-30-979e6bf8.jpg",
    photos: [
      "/images/portfolio/works/work-30-979e6bf8.jpg",
      "/images/portfolio/works/work-34-56a29c19.jpg"
    ],
    title: "Остекление коттеджа из клееного бруса темными ламинированными окнами со шпросами",
    category: "windows",
    location: "Коттеджная застройка, Приморье",
    specs: "Монтаж в обсадную коробку · Ламинация под дерево · Москитные сетки",
    badge: "Коттедж из бруса · 2 фото"
  },
  {
    id: "win-cottage-dacha-security",
    src: "/images/legacy/1250b8bf7ed7358b942278719faab6d5.jpg",
    title: "Остекление загородного дома энергоэффективными окнами Rehau с защитными решетками",
    category: "windows",
    location: "ст. Садгород",
    specs: "Теплый 5-камерный профиль · Противовзломная фурнитура",
    badge: "Загородный дом"
  },
  {
    id: "win-brick-gazebo-shpros",
    src: "/images/portfolio/works/work-29-7423c5e1.jpg",
    photos: [
      "/images/portfolio/works/work-29-7423c5e1.jpg",
      "/images/portfolio/works/work-32-2ce58345.jpg"
    ],
    title: "Остекление кирпичной садовой беседки многостворчатыми окнами со шпросами",
    category: "windows",
    location: "Дачный участок, Приморье",
    specs: "Раздвижные и поворотные створки · Декоративная белая раскладка",
    badge: "Кирпичная беседка · 2 фото"
  },
  {
    id: "win-laminated-natural-oak",
    src: "/images/legacy/full_7sqeCo56.jpg",
    title: "Дизайнерские угловые окна с ламинацией под натуральный дуб в интерьере",
    category: "windows",
    location: "Частный сектор, Приморье",
    specs: "Угловой соединитель · Фактурная ламинация с двух сторон",
    badge: "Натуральный дуб"
  },
  {
    id: "win-laminated-walnut",
    src: "/images/legacy/7572a65a5821c2fc33ca30a7abf94824.jpg",
    title: "Пластиковые окна цвета «орех» с австрийской фурнитурой Maco и шпросами",
    category: "windows",
    location: "Жилой фонд, Приморье",
    specs: "Фурнитура Maco Multi-Matic · Микропроветривание",
    badge: "Цвет «орех»"
  },
  {
    id: "win-three-leaf-living",
    src: "/images/legacy/6ee31abf7022c6bd8a05b535a0fdbceb.jpg",
    title: "Трехстворчатое окно с широким световым проемом и встроенными жалюзи",
    category: "windows",
    location: "Многоквартирный дом",
    specs: "Профиль 70 мм · Подоконник Danke · Встроенные жалюзи",
    badge: "3-створчатое окно"
  },
  {
    id: "win-turn-tilt-white",
    src: "/images/legacy/5d62a55290edb5a644e685a8eff0b6a0.jpg",
    title: "Двухстворчатое пластиковое окно с микропроветриванием и рулонными шторами",
    category: "windows",
    location: "Квартирный фонд",
    specs: "4-ступенчатое проветривание · Энергосберегающий стеклопакет",
    badge: "Квартира под ключ"
  },
  {
    id: "win-blinds-roller-shutter",
    src: "/images/legacy/670d18c69dd29e4036c09b9e6de54e25.jpg",
    title: "Окна ПВХ с солнцезащитными рулонными жалюзи «Зебра День-Ночь»",
    category: "windows",
    location: "Пригородный дом",
    specs: "Точная подгонка под створку · Без сверления рамы",
    badge: "Жалюзи «Зебра»"
  },
  {
    id: "win-wood-laminate-cottage",
    src: "/images/legacy/465abbe7c70345d3a9baf7cc758f2ad9.jpg",
    title: "Окна с двухсторонней ламинацией под дерево в брусовом коттедже",
    category: "windows",
    location: "Пригород, пос. Трудовое",
    specs: "Установка в деревянный сруб с учетом усадки",
    badge: "Окна в брус"
  },
  {
    id: "win-suburban-dacha-glazing",
    src: "/images/legacy/909824d3674fec397df45f352efcd27a.jpg",
    title: "Остекление фронтона загородного дома трапециевидными окнами ПВХ",
    category: "windows",
    location: "ст. Весенняя",
    specs: "Косые и трапециевидные рамы под скат кровли",
    badge: "Фронтон мансарды"
  },
  {
    id: "win-three-sash-grey-siding",
    src: "/images/portfolio/works/work-31-eec00674.jpg",
    title: "Трехстворчатое окно со шпросами на фасаде частного дома с сайдингом",
    category: "windows",
    location: "Пригородный дом",
    specs: "Профиль 70 мм · Теплый стеклопакет со шпросами",
    badge: "Фасадное окно"
  },
  {
    id: "win-arched-dormer-sea-view",
    src: "/images/portfolio/works/work-33-b0781224.jpg",
    title: "Арочное окно со шпросами в мансардной комнате с видом на залив",
    category: "windows",
    location: "Прибрежная зона, Приморье",
    specs: "Арочный гиб ПВХ-профиля · Энергосберегающий стеклопакет",
    badge: "Арочное окно"
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
  {
    id: "win-trapezoid-attic-shpros",
    src: "/images/portfolio/works/work-19-dee7f927.jpg",
    title: "Скошенные трапециевидные окна мансарды со шпросами под скат крыши",
    category: "windows",
    location: "Загородный коттедж",
    specs: "Нестандартная геометрия · Внутренняя раскладка 18 мм",
    badge: "Мансардные трапеции"
  },
  {
    id: "win-luxury-chalet-woodgrain",
    src: "/images/portfolio/works/work-27-c9f65638.jpg",
    title: "Остекление двухэтажного шале из бруса окнами со шпросами и террасой",
    category: "windows",
    location: "Загородная усадьба",
    specs: "Двусторонняя ламинация под дерево · Декоративная раскладка",
    badge: "Усадьба из бруса"
  },

  // --- 3. БАЛКОНЫ И ЛОДЖИИ (КАЖДАЯ КАРТОЧКА — УНИКАЛЬНЫЙ ОБЪЕКТ) ---
  {
    id: "balc-turnkey-panoramic-cabinet",
    src: "/images/bento/bento-balconies-turnkey.jpg",
    title: "Теплая видовая лоджия-кабинет с панорамным остеклением и рабочей зоной",
    category: "balconies",
    location: "Жилой комплекс, Приморье",
    specs: "Панорамное остекление в пол · Утепление Изопинк · Теплый пол",
    badge: "Лоджия-кабинет"
  },
  {
    id: "balc-columns-cottage",
    src: "/images/portfolio/balconies/balcony-05-3c626b82.jpg",
    photos: [
      "/images/portfolio/balconies/balcony-05-3c626b82.jpg",
      "/images/portfolio/balconies/balcony-06-26d0aa83.jpg"
    ],
    title: "Остекление выносного балкона коттеджа на опорных колоннах",
    category: "balconies",
    location: "Пригородный кирпичный коттедж",
    specs: "Белый профиль ПВХ 70 мм · Комплексное фасадное остекление",
    badge: "Балкон на опорах · 2 фото"
  },
  {
    id: "balc-luxury-finished-interior",
    src: "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg",
    title: "Комплексное остекление и чистовая отделка балкона под ключ со встроенным светом",
    category: "balconies",
    location: "Квартирный фонд, Приморье",
    specs: "Влагостойкие стеновые панели · Точечные светильники · Настил пола",
    badge: "Отделка под ключ"
  },
  {
    id: "balc-full-height-warm-pvc",
    src: "/images/legacy/478c0dc97e37141614c8a0796b88c17b.jpg",
    title: "Теплое остекление мансарды и лоджии энергосберегающими 5-камерными рамами",
    category: "balconies",
    location: "Жилой квартал, Приморье",
    specs: "Профиль 70 мм · 2-камерный стеклопакет 40 мм с аргоном",
    badge: "Теплый балкон"
  },
  {
    id: "balc-top-floor-roof",
    src: "/images/portfolio/balconies/balcony-07-1ee21426.jpg",
    title: "Балкон последнего этажа с независимой крышей и наружной обшивкой",
    category: "balconies",
    location: "Кирпичный жилой дом",
    specs: "Сварная кровля из профнастила с шумоизоляцией · Фасадные панели",
    badge: "Балкон с крышей"
  },
  {
    id: "balc-turnkey-corner-glazing",
    src: "/images/legacy/1dfc145b98c74e9896680cc9ec397d6b.jpg",
    title: "Отделка лоджии деревянной евровагонкой с системой сушки белья и шкафом",
    category: "balconies",
    location: "Жилой дом, Приморье",
    specs: "Евровагонка класс А · Встроенный шкаф · Потолочная сушилка «Лиана»",
    badge: "Евровагонка"
  },
  {
    id: "balc-first-floor-brick",
    src: "/images/portfolio/balconies/balcony-08-efb4ba04.jpg",
    title: "П-образное остекление лоджии первого этажа на кирпичном парапете",
    category: "balconies",
    location: "Жилой дом, Приморье",
    specs: "Профиль 70 мм · Козырьки и водоотливы с виброизоляцией",
    badge: "Теплая лоджия"
  },
  {
    id: "balc-corner-highrise",
    src: "/images/portfolio/balconies/balcony-09-3bf641ae.jpg",
    title: "Угловая лоджия в кирпичной новостройке с тонированными стеклами",
    category: "balconies",
    location: "Жилой комплекс, Приморье",
    specs: "Угловой соединитель 90° · Солнцезащитные стекла Solar",
    badge: "Угловая лоджия"
  },
  {
    id: "balc-panoramic-bay",
    src: "/images/portfolio/balconies/balcony-10-af7ce6f5.jpg",
    title: "Панорамный эркерный балкон от пола до потолка на фасаде дома",
    category: "balconies",
    location: "Многоквартирный дом",
    specs: "Трапециевидное остекление · Усиленный эркерный профиль",
    badge: "Панорамный эркер"
  },
  {
    id: "balc-welding-roof-extension",
    src: "/images/legacy/Ns8vYDcL.jpg",
    title: "Сварочные работы, монтаж независимой крыши и остекление балкона с сайдингом",
    category: "balconies",
    location: "Панельный дом, Приморье",
    specs: "Сварочный каркас · Вынос плиты · Ветрозащитный сайдинг",
    badge: "Вынос балкона"
  },
  {
    id: "balc-cottage-terrace",
    src: "/images/portfolio/balconies/balcony-11-d9b4c9aa.jpg",
    title: "Панорамное остекление террасы второго этажа коттеджа в темном профиле",
    category: "balconies",
    location: "Загородный дом",
    specs: "Темно-серый профиль · Зеркальное солнцезащитное напыление",
    badge: "Терраса 2 этажа"
  },
  {
    id: "balc-raised-steel-terrace",
    src: "/images/portfolio/balconies/balcony-12-f22dfe99.jpg",
    title: "Остекление высокой веранды на металлокаркасе со стальной лестницей",
    category: "balconies",
    location: "Частный сектор, Приморье",
    specs: "Монтаж на металлокаркасе · Ветрозащитная фурнитура",
    badge: "Терраса на опорах"
  },
  {
    id: "balc-glazing-with-railings",
    src: "/images/legacy/full_Bx5dmJ34.jpg",
    title: "Уютный остекленный балкон с отделкой под кирпич и широким подоконником",
    category: "balconies",
    location: "Жилой квартал",
    specs: "Декоративная плитка под кирпич · Глянцевый подоконник Danke",
    badge: "Отделка кирпич"
  },
  {
    id: "balc-compact-warm-balcony",
    src: "/images/legacy/full_6l64jnEm.jpg",
    title: "Остекление 3-метрового балкона в кирпичном доме теплыми стеклопакетами",
    category: "balconies",
    location: "Кирпичный дом",
    specs: "Профиль 60 мм · Двухкамерный стеклопакет 32 мм",
    badge: "3 метра"
  },
  {
    id: "balc-panoramic-long-gallery",
    src: "/images/portfolio/works/work-41-1f14b64f.jpg",
    title: "Панорамная лоджия от пола до потолка на этапе чистовой отделки",
    category: "balconies",
    location: "Пригородный жилой комплекс",
    specs: "Остекление в пол · Поворотно-откидные створки с микропроветриванием",
    badge: "Панорамная лоджия"
  },
  {
    id: "balc-high-floor-view",
    src: "/images/legacy/5e955f858dcac7bd4ac1fcf5fb28dc96.jpg",
    title: "Остекление лоджии с солнцезащитными рулонными жалюзи и видом на залив",
    category: "balconies",
    location: "Видовой дом, Приморье",
    specs: "Теплый контур · Жалюзи на каждой створке",
    badge: "Видовая лоджия"
  },
  {
    id: "balc-exterior-vinyl-siding",
    src: "/images/legacy/ef03b9561fddcafaf4657793ca76d6f0.jpg",
    title: "Наружная ветрозащитная обшивка балкона морозостойким сайдингом",
    category: "balconies",
    location: "Жилой массив, Приморье",
    specs: "Сайдинг Döcke · Ветро-влагозащитная мембрана",
    badge: "Обшивка сайдингом"
  },
  {
    id: "balc-wood-furniture",
    src: "/images/legacy/f270d6f307895b915815537be47eacf2.jpg",
    title: "Комплексная отделка лоджии натуральным деревом со столиком и лавкой",
    category: "balconies",
    location: "Городской дом, Приморье",
    specs: "Натуральная сосна · Складная мебель на заказ",
    badge: "Мебель на балкон"
  },
  {
    id: "balc-composite-panels",
    src: "/images/legacy/e2a1410ba6597ca740d16822a98d1bd4.jpg",
    title: "Наружная облицовка балконного парапета термопанелями под камень",
    category: "balconies",
    location: "Кирпичный дом, Приморье",
    specs: "Фасадные панели «Ханьи» · Утепление пеноплэксом",
    badge: "Панели Ханьи"
  },

  // --- 4. АЛЮМИНИЙ, ВИТРАЖИ И ПОРТАЛЫ (КАЖДАЯ КАРТОЧКА — УНИКАЛЬНЫЙ ОБЪЕКТ) ---
  {
    id: "fac-modular-house-portals",
    src: "/images/portfolio/works/work-35-37c3432f.jpg",
    photos: [
      "/images/portfolio/works/work-35-37c3432f.jpg",
      "/images/portfolio/works/work-36-5afd5904.jpg",
      "/images/portfolio/works/work-37-b8c935bb.jpg",
      "/images/portfolio/works/work-38-08f212b7.jpg",
      "/images/portfolio/works/work-40-6a26f500.jpg"
    ],
    title: "Панорамные раздвижные порталы и фасадное остекление модульного дома в цвете антрацит",
    category: "facades",
    location: "Современный загородный модульный дом",
    specs: "Раздвижные подъемно-сдвижные порталы в пол · Цвет антрацит · Террасный выход",
    badge: "Модульный дом · 5 фото"
  },
  {
    id: "fac-hospital-entrance-lobby",
    src: "/images/portfolio/works/work-11-0d7a3898.jpg",
    photos: [
      "/images/portfolio/works/work-11-0d7a3898.jpg",
      "/images/portfolio/works/work-12-b090d201.jpg"
    ],
    title: "Остекленный входной тамбур и фасадные витражи административного здания",
    category: "facades",
    location: "Приморский край",
    specs: "Теплый алюминиевый профиль · Стеклянная распашная дверь · Закаленный триплекс",
    client: "Медицинский комплекс",
    badge: "Входной тамбур · 2 фото"
  },
  {
    id: "fac-sliding-portal-deck",
    src: "/images/portfolio/works/work-14-9bd3d680.jpg",
    title: "Раздвижной панорамный портал с выходом на открытую террасу из декинга",
    category: "facades",
    location: "Загородный дом, Приморье",
    specs: "Портальная раздвижная система · Низкий безбарьерный порог в пол",
    badge: "Раздвижной портал"
  },
  {
    id: "fac-wood-house-portal",
    src: "/images/portfolio/works/work-15-8ef9a3c3.jpg",
    title: "Раздвижной портал под темный дуб с внутрипольным конвектором в деревянном доме",
    category: "facades",
    location: "Загородная резиденция",
    specs: "Ламинация «темный дуб» · Энергосберегающий стеклопакет 44 мм",
    badge: "Панорамный портал"
  },
  {
    id: "fac-cottage-stained-glass",
    src: "/images/portfolio/works/work-13-c085b343.jpg",
    title: "Витражное остекление первого этажа коттеджа с зеркальной тонировкой Solar",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Тонированные солнцезащитные стекла · Темно-коричневый профиль",
    badge: "Витраж коттеджа"
  },
  {
    id: "fac-timber-house-veranda",
    src: "/images/portfolio/works/work-16-25c9019d.jpg",
    title: "Остекленная входная веранда дома из бруса со стеклянной дверью",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Остекление в пол · Входная пластиковая дверь со стеклопакетом",
    badge: "Входная веранда"
  },
  {
    id: "fac-arched-entrance-cottage",
    src: "/images/portfolio/works/work-18-af4a1ae5.jpg",
    title: "Арочная входная группа со стеклянной дверью и радиальными шпросами",
    category: "facades",
    location: "Частный коттедж, Приморье",
    specs: "Арочная фрамуга с лучевой раскладкой · Индивидуальный проект",
    badge: "Арочная группа"
  },
  {
    id: "fac-commercial-anthracite",
    src: "/images/portfolio/works/work-20-0d799fd4.jpg",
    title: "Алюминиевая входная группа и витраж 2 этажа бизнес-центра в цвете антрацит",
    category: "facades",
    location: "Офисный центр, Приморье",
    specs: "Теплый алюминий · Двустворчатая распашная дверь",
    badge: "Бизнес-центр"
  },
  {
    id: "fac-winter-pavilion",
    src: "/images/portfolio/works/work-22-f5c20034.jpg",
    title: "Теплое панорамное остекление зимней садовой беседки в темном профиле",
    category: "facades",
    location: "Загородный участок, Приморье",
    specs: "Двухкамерные стеклопакеты · Ламинация в шоколадный цвет",
    badge: "Зимняя беседка"
  },
  {
    id: "fac-commercial-tinted",
    src: "/images/portfolio/works/work-23-22f1f076.jpg",
    title: "Витражное остекление торгового павильона с зеркальным солнцезащитным стеклом",
    category: "facades",
    location: "Коммерческий сектор, Приморье",
    specs: "Зеркальная тонировка Solar · Декоративное обрамление",
    badge: "Торговый витраж"
  },
  {
    id: "fac-frame-house-panoramic",
    src: "/images/portfolio/works/work-26-b20475ba.jpg",
    title: "Панорамное остекление каркасного дома на сваях с мансардным блоком",
    category: "facades",
    location: "Пригородный поселок",
    specs: "Витринные окна в пол 1 этажа · Скошенный мансардный блок",
    badge: "Каркасный дом"
  },
  {
    id: "fac-barnhouse-black",
    src: "/images/portfolio/works/work-28-819c4402.jpg",
    title: "Фасадное остекление дома в стиле барнхаус в черном матовом профиле",
    category: "facades",
    location: "Загородный дом, Приморье",
    specs: "Черная матовая ламинация · Скошенные окна под конек крыши",
    badge: "Барнхаус"
  },
  {
    id: "fac-french-panoramic-floor",
    src: "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg",
    title: "Двухэтажные витражные французские окна в пол в кирпичном особняке",
    category: "facades",
    location: "Приморский край",
    specs: "Панорамные двухэтажные проемы · Закаленный триплекс",
    badge: "Французские окна"
  },
  {
    id: "fac-glass-pavilion",
    src: "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg",
    title: "Архитектурное витражное остекление стеклянного павильона и входных групп",
    category: "facades",
    location: "Прибрежная зона, Приморье",
    specs: "Стоечно-ригельная фасадная система · Закаленное стекло",
    badge: "Стеклянный павильон"
  },
  {
    id: "fac-sliding-aluminum-doors",
    src: "/images/legacy/Al2fspIs.jpg",
    title: "Теплые алюминиевые окна и крупноформатные раздвижные портальные двери",
    category: "facades",
    location: "Загородная резиденция, Приморье",
    specs: "Теплый алюминий Alutech · Подъемно-сдвижная фурнитура",
    badge: "Теплый алюминий"
  },
  {
    id: "fac-thermal-portal",
    src: "/images/legacy/697a6195a6d1109ce8ea9e8ee3c192e9.jpg",
    title: "Алюминиевый фасадный витраж с терморазрывом и треугольным завершением",
    category: "facades",
    location: "Частный коттедж, Приморье",
    specs: "Терморазрыв 34 мм · Треугольный архитектурный блок",
    badge: "Фасадный витраж"
  },
  {
    id: "fac-multistory-facade",
    src: "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg",
    title: "Сплошное ленточное остекление фасада многоэтажного жилого дома",
    category: "facades",
    location: "Жилой фонд, Приморье",
    specs: "Ленточное остекление фасада · Монтаж по ГОСТ",
    badge: "Ленточный фасад"
  },
  {
    id: "fac-villa-panoramic",
    src: "/images/hero/hero-daylight-villa.jpg",
    title: "Панорамное фасадное остекление загородной виллы теплыми системами",
    category: "facades",
    location: "пос. Седанка",
    specs: "Архитектурный фасад · Энергосбережение",
    badge: "Загородная вилла"
  },
  {
    id: "fac-penthouse-panoramic",
    src: "/images/hero/hero-daylight-penthouse.jpg",
    title: "Витражное стоечно-ригельное остекление пентхауса с видом на залив",
    category: "facades",
    location: "мыс Эгершельд, Приморье",
    specs: "Стоечно-ригельная система · Панорамный вид",
    badge: "Пентхаус"
  }
];
