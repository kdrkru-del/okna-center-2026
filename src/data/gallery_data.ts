export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'windows' | 'balconies' | 'finishing' | 'facades';
  location: string;
}

export const galleryCategories = [
  { id: 'all', label: 'Все работы' },
  { id: 'windows', label: 'Пластиковые окна' },
  { id: 'balconies', label: 'Балконы и лоджии' },
  { id: 'finishing', label: 'Утепление и отделка' },
  { id: 'facades', label: 'Алюминий и фасады' },
] as const;

export const galleryItems: GalleryItem[] = [
  // --- ПЛАСТИКОВЫЕ ОКНА ---
  {
    id: "win_rehau_panoramic_living",
    src: "/images/bento/bento-rehau-windows.jpg",
    title: "Панорамное остекление просторной гостиной окнами Rehau с энергосберегающими стеклопакетами",
    category: "windows",
    location: "Владивосток, ул. Кирова"
  },
  {
    id: "win_wood_lamination_bay",
    src: "/images/legacy/fa88e5ce2640e3d853524a7973ba151a.jpg",
    title: "Эркерные окна с ламинацией «темный дуб» Renolit и золотыми шпросами",
    category: "windows",
    location: "Пригород, пос. Трудовое"
  },
  {
    id: "win_cottage_dacha_security",
    src: "/images/legacy/1250b8bf7ed7358b942278719faab6d5.jpg",
    title: "Остекление коттеджа энергоэффективными окнами Rehau с защитными решетками",
    category: "windows",
    location: "Владивосток, ст. Садгород"
  },
  {
    id: "win_dacha_summer_house",
    src: "/images/legacy/847c7f1f106f69c5bc24465f9b20bef3.jpg",
    title: "Установка окон с двухсторонней ламинацией и шпросами в загородном доме",
    category: "windows",
    location: "Владивосток, ст. Весенняя"
  },
  {
    id: "win_laminated_natural_oak",
    src: "/images/legacy/full_7sqeCo56.jpg",
    title: "Дизайнерские угловые окна с ламинацией под натуральный дуб в интерьере",
    category: "windows",
    location: "Владивосток, ул. Светланская"
  },
  {
    id: "win_laminated_walnut",
    src: "/images/legacy/7572a65a5821c2fc33ca30a7abf94824.jpg",
    title: "Пластиковые окна цвета «орех» с австрийской фурнитурой Maco и шпросами",
    category: "windows",
    location: "Владивосток, ул. Пушкинская"
  },
  {
    id: "win_three_leaf_living",
    src: "/images/legacy/6ee31abf7022c6bd8a05b535a0fdbceb.jpg",
    title: "Трехстворчатое окно с широким световым проемом и встроенными жалюзи",
    category: "windows",
    location: "Владивосток, ул. Русская"
  },
  {
    id: "win_turn_tilt_white",
    src: "/images/legacy/5d62a55290edb5a644e685a8eff0b6a0.jpg",
    title: "Двухстворчатое пластиковое окно с микропроветриванием и рулонными шторами",
    category: "windows",
    location: "Владивосток, ул. Некрасовская"
  },
  {
    id: "win_blinds_roller_shutter",
    src: "/images/legacy/670d18c69dd29e4036c09b9e6de54e25.jpg",
    title: "Окна ПВХ со встроенными солнцезащитными рулонными жалюзи «Зебра День-Ночь»",
    category: "windows",
    location: "Владивосток, Партизанский пр-т"
  },
  {
    id: "win_wood_laminate_cottage",
    src: "/images/legacy/465abbe7c70345d3a9baf7cc758f2ad9.jpg",
    title: "Окна с двухсторонней ламинацией под дерево в деревянном коттедже",
    category: "windows",
    location: "Пригород, пос. Трудовое"
  },
  {
    id: "win_suburban_dacha_glazing",
    src: "/images/legacy/909824d3674fec397df45f352efcd27a.jpg",
    title: "Остекление фронтона загородного коттеджа трапециевидными окнами ПВХ",
    category: "windows",
    location: "Владивосток, ст. Весенняя"
  },
  {
    id: "win_multichamber_profile_cut",
    src: "/images/legacy/db7eeb03b34b1d5a8cb1d52243b0e21f.jpg",
    title: "Фирменная поворотно-откидная оконная створка Rehau с замкнутым армированием",
    category: "windows",
    location: "Владивосток, выставочный зал"
  },

  // --- БАЛКОНЫ И ЛОДЖИИ ---
  {
    id: "balc_turnkey_panoramic_cabinet",
    src: "/images/bento/bento-balconies-turnkey.jpg",
    title: "Теплая видовая лоджия-кабинет с панорамным остеклением и рабочей зоной",
    category: "balconies",
    location: "Владивосток, ул. Фадеева"
  },
  {
    id: "balc_luxury_finished_interior",
    src: "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg",
    title: "Комплексное остекление и чистовая отделка балкона под ключ со встроенным светом",
    category: "balconies",
    location: "Владивосток, ул. Баляева"
  },
  {
    id: "balc_full_height_warm_pvc",
    src: "/images/legacy/478c0dc97e37141614c8a0796b88c17b.jpg",
    title: "Теплое остекление мансарды и лоджии энергосберегающими 5-камерными рамами",
    category: "balconies",
    location: "Владивосток, ул. Снеговая Падь"
  },
  {
    id: "balc_turnkey_corner_glazing",
    src: "/images/legacy/1dfc145b98c74e9896680cc9ec397d6b.jpg",
    title: "Отделка лоджии деревянной евровагонкой с системой сушки белья и шкафом",
    category: "balconies",
    location: "Владивосток, Океанский пр-т"
  },
  {
    id: "balc_welding_roof_extension",
    src: "/images/legacy/Ns8vYDcL.jpg",
    title: "Сварочные работы, монтаж независимой крыши и остекление балкона с сайдингом",
    category: "balconies",
    location: "Владивосток, ул. Чкалова"
  },
  {
    id: "balc_glazing_with_railings",
    src: "/images/legacy/full_Bx5dmJ34.jpg",
    title: "Уютный остекленный балкон с отделкой под кирпич и широким подоконником",
    category: "balconies",
    location: "Владивосток, ул. Нейбута"
  },
  {
    id: "balc_compact_warm_balcony",
    src: "/images/legacy/full_6l64jnEm.jpg",
    title: "Остекление 3-метрового балкона в кирпичном доме теплыми стеклопакетами",
    category: "balconies",
    location: "Владивосток, ул. Шилкинская"
  },
  {
    id: "balc_high_floor_view",
    src: "/images/legacy/5e955f858dcac7bd4ac1fcf5fb28dc96.jpg",
    title: "Остекление лоджии с солнцезащитными рулонными жалюзи и видом на залив",
    category: "balconies",
    location: "Владивосток, ул. Набережная"
  },
  {
    id: "balc_exterior_vinyl_siding",
    src: "/images/legacy/ef03b9561fddcafaf4657793ca76d6f0.jpg",
    title: "Наружная ветрозащитная обшивка балкона морозостойким сайдингом с установкой ПВХ рам",
    category: "balconies",
    location: "Владивосток, ул. Некрасовская"
  },

  // --- УТЕПЛЕНИЕ И ОТДЕЛКА ---
  {
    id: "fin_wood_balcony_furniture",
    src: "/images/legacy/f270d6f307895b915815537be47eacf2.jpg",
    title: "Комплексная отделка лоджии натуральным деревом со складным столиком и лавкой",
    category: "finishing",
    location: "Владивосток, ул. Кирова"
  },
  {
    id: "fin_composite_thermal_panels",
    src: "/images/legacy/e2a1410ba6597ca740d16822a98d1bd4.jpg",
    title: "Наружная облицовка балконного парапета термопанелями под камень с утеплением",
    category: "finishing",
    location: "Владивосток, ул. Чкалова"
  },
  {
    id: "fin_interior_timber_cottage",
    src: "/images/legacy/5c2fb27469d1b06fc8d7e96a296e945b.jpg",
    title: "Чистовая отделка проемов и двухъярусное остекление в доме из бруса",
    category: "finishing",
    location: "Пригород, пос. Трудовое"
  },
  {
    id: "fin_panoramic_timber_cottage",
    src: "/images/legacy/68140a2c3eb8c772fc55fb4063e6886f.jpg",
    title: "Остекление и финишная отделка входной группы деревянного коттеджа",
    category: "finishing",
    location: "Владивосток, пос. Седанка"
  },

  // --- АЛЮМИНИЙ И ФАСАДЫ ---
  {
    id: "fac_modern_cottage_facade",
    src: "/images/hero/hero-daylight-villa.jpg",
    title: "Панорамное фасадное остекление загородной виллы теплыми архитектурными системами",
    category: "facades",
    location: "Владивосток, пос. Седанка"
  },
  {
    id: "fac_panoramic_daylight_terrace",
    src: "/images/hero/hero-daylight-patio.jpg",
    title: "Панорамное теплое остекление просторной террасы с раздвижными дверями в пол",
    category: "facades",
    location: "Владивосток, пос. Садгород"
  },
  {
    id: "fac_penthouse_panoramic_daylight",
    src: "/images/hero/hero-daylight-penthouse.jpg",
    title: "Витражное стоечно-ригельное остекление пентхауса с панорамным видом на залив",
    category: "facades",
    location: "Владивосток, мыс Эгершельд"
  },
  {
    id: "fac_french_panoramic_floor",
    src: "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg",
    title: "Двухэтажные витражные французские окна в пол в кирпичном особняке",
    category: "facades",
    location: "Владивосток, мыс Чуркин"
  },
  {
    id: "fac_glass_pavilion_architecture",
    src: "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg",
    title: "Архитектурное витражное остекление стеклянного павильона и входных групп",
    category: "facades",
    location: "Владивосток, район Эгершельд"
  },
  {
    id: "fac_sliding_aluminum_doors",
    src: "/images/legacy/Al2fspIs.jpg",
    title: "Теплые алюминиевые окна и крупноформатные раздвижные портальные двери",
    category: "facades",
    location: "Владивосток, ул. Набережная"
  },
  {
    id: "fac_thermal_aluminum_portal",
    src: "/images/legacy/697a6195a6d1109ce8ea9e8ee3c192e9.jpg",
    title: "Алюминиевый фасадный витраж с терморазрывом и треугольным завершением",
    category: "facades",
    location: "Владивосток, ул. Фонтанная"
  },
  {
    id: "fac_entrance_group_aluminum",
    src: "/images/legacy/e25a0f77cfde45e3c6be345e2ffea560.jpg",
    title: "Двухэтажный фасадный витраж и входная группа из теплого алюминиевого профиля",
    category: "facades",
    location: "Владивосток, ул. Октябрьская"
  },
  {
    id: "fac_light_aluminum_loggia",
    src: "/images/legacy/e57d7df2249c224118ce3123ff1fd6a5.jpg",
    title: "Раздвижное алюминиевое остекление балкона с направляющими рельсами",
    category: "facades",
    location: "Владивосток, ул. Амурская"
  },
  {
    id: "fac_multistory_facade_glazing",
    src: "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg",
    title: "Сплошное ленточное остекление фасада многоэтажного жилого дома",
    category: "facades",
    location: "Владивосток, ул. Светланская"
  }
];
