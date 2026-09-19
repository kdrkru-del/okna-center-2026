export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'windows' | 'balconies' | 'finishing' | 'facades' | 'repairs';
  location: string;
}

export const galleryCategories = [
  { id: 'all', label: 'Все работы' },
  { id: 'windows', label: 'Пластиковые окна' },
  { id: 'balconies', label: 'Балконы и лоджии' },
  { id: 'finishing', label: 'Утепление и отделка' },
  { id: 'facades', label: 'Алюминий и порталы' },
  { id: 'repairs', label: 'Ремонт и сервис' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    "id": "win_rehau_panoramic_living",
    "src": "/images/bento/bento-rehau-windows.jpg",
    "title": "Панорамное остекление гостиной окнами Rehau с энергосберегающими стеклопакетами",
    "category": "windows",
    "location": "Владивосток, ул. Кирова"
  },
  {
    "id": "win_wood_lamination_bay",
    "src": "/images/legacy/fa88e5ce2640e3d853524a7973ba151a.jpg",
    "title": "Эркерные окна с ламинацией «темный дуб» Renolit и золотыми шпросами",
    "category": "windows",
    "location": "Пригород, пос. Трудовое"
  },
  {
    "id": "win_cottage_dacha_security",
    "src": "/images/legacy/1250b8bf7ed7358b942278719faab6d5.jpg",
    "title": "Остекление коттеджа энергоэффективными окнами Rehau с защитными решетками",
    "category": "windows",
    "location": "Владивосток, ст. Садгород"
  },
  {
    "id": "win_dacha_summer_house",
    "src": "/images/legacy/847c7f1f106f69c5bc24465f9b20bef3.jpg",
    "title": "Установка готовых окон для дачного дома с москитными сетками",
    "category": "windows",
    "location": "Владивосток, ст. Весенняя"
  },
  {
    "id": "win_laminated_natural_oak",
    "src": "/images/legacy/full_7sqeCo56.jpg",
    "title": "Дизайнерские окна с ламинацией под натуральный дуб в интерьере",
    "category": "windows",
    "location": "Владивосток, ул. Светланская"
  },
  {
    "id": "win_laminated_walnut",
    "src": "/images/legacy/7572a65a5821c2fc33ca30a7abf94824.jpg",
    "title": "Пластиковые окна цвета «орех» с австрийской фурнитурой Maco",
    "category": "windows",
    "location": "Владивосток, ул. Пушкинская"
  },
  {
    "id": "win_delivery_standalone",
    "src": "/images/legacy/full_ewAHqpCF.jpg",
    "title": "Поставка партии готовых окон со склада завода для самостоятельного монтажа",
    "category": "windows",
    "location": "Владивосток, склад готовой продукции"
  },
  {
    "id": "win_three_leaf_living",
    "src": "/images/legacy/6ee31abf7022c6bd8a05b535a0fdbceb.jpg",
    "title": "Трехстворчатое окно с широким световым проемом для просторной спальни",
    "category": "windows",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "win_turn_tilt_white",
    "src": "/images/legacy/5d62a55290edb5a644e685a8eff0b6a0.jpg",
    "title": "Двухстворчатое пластиковое окно с микропроветриванием и теплыми откосами",
    "category": "windows",
    "location": "Владивосток, ул. Некрасовская"
  },
  {
    "id": "win_high_floor_view",
    "src": "/images/legacy/5e955f858dcac7bd4ac1fcf5fb28dc96.jpg",
    "title": "Шумозащитное остекление квартиры на высоком этаже с видом на Амурский залив",
    "category": "windows",
    "location": "Владивосток, ул. Набережная"
  },
  {
    "id": "win_blinds_roller_shutter",
    "src": "/images/legacy/670d18c69dd29e4036c09b9e6de54e25.jpg",
    "title": "Окна ПВХ со встроенными рулонными жалюзи системы «Зебра День-Ночь»",
    "category": "windows",
    "location": "Владивосток, Партизанский пр-т"
  },
  {
    "id": "win_french_panoramic_floor",
    "src": "/images/legacy/45027f0d562513ff204e3f1eb597c264.jpg",
    "title": "Французские панорамные окна в пол с выходом на террасу",
    "category": "windows",
    "location": "Владивосток, мыс Чуркин"
  },
  {
    "id": "win_measurement_laser_prep",
    "src": "/images/legacy/8dfab624d3be3abdf4bd567d33074e74.jpg",
    "title": "Точный лазерный замер и подготовка оконного проема инженером компании",
    "category": "windows",
    "location": "Владивосток, объект заказчика"
  },
  {
    "id": "win_modern_cottage_facade",
    "src": "/images/hero/hero-daylight-villa.jpg",
    "title": "Панорамное фасадное остекление загородной резиденции премиум-системами Rehau",
    "category": "windows",
    "location": "Владивосток, пос. Седанка"
  },
  {
    "id": "win_newbuild_installation",
    "src": "/images/legacy/07b0dc69dcbda8a26d09c747cc2eb8c1.jpg",
    "title": "Установка энергоэффективных пластиковых окон в новостройке повышенной комфортности",
    "category": "windows",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "win_wood_laminate_cottage",
    "src": "/images/legacy/465abbe7c70345d3a9baf7cc758f2ad9.jpg",
    "title": "Окна с двухсторонней ламинацией под дерево для частного коттеджа",
    "category": "windows",
    "location": "Пригород, пос. Трудовое"
  },
  {
    "id": "win_brick_house_install",
    "src": "/images/legacy/7dba6f0be5058fae4ae8bb0f43b6aa67.jpg",
    "title": "Монтаж теплого оконного блока в кирпичном доме по ГОСТу с паро- и гидроизоляцией",
    "category": "windows",
    "location": "Владивосток, пр-т 100-летия Владивостока"
  },
  {
    "id": "win_suburban_dacha_glazing",
    "src": "/images/legacy/909824d3674fec397df45f352efcd27a.jpg",
    "title": "Остекление дачного загородного дома надежными поворотно-откидными окнами ПВХ",
    "category": "windows",
    "location": "Владивосток, ст. Весенняя"
  },
  {
    "id": "win_double_glazed_turnkey",
    "src": "/images/legacy/99dbfc657bbb2cc5d99b82775283034b.png",
    "title": "Монтаж двухстворчатого окна с энергосберегающим стеклопакетом и широким подоконником",
    "category": "windows",
    "location": "Владивосток, ул. Калинина"
  },
  {
    "id": "win_multichamber_profile_cut",
    "src": "/images/legacy/db7eeb03b34b1d5a8cb1d52243b0e21f.jpg",
    "title": "Фирменный немецкий профиль Rehau с замкнутым армированием и уплотнителем EPDM",
    "category": "windows",
    "location": "Выставочный зал «Окна Центр»"
  },
  {
    "id": "balc_turnkey_panoramic_cabinet",
    "src": "/images/bento/bento-balconies-turnkey.jpg",
    "title": "Теплая видовая лоджия-кабинет с панорамным остеклением и рабочей зоной",
    "category": "balconies",
    "location": "Владивосток, ул. Фадеева"
  },
  {
    "id": "balc_luxury_finished_interior",
    "src": "/images/legacy/4584baf08d4d0c3367ff109454676224.jpg",
    "title": "Комплексное остекление и чистовая отделка балкона под ключ",
    "category": "balconies",
    "location": "Владивосток, ул. Баляева"
  },
  {
    "id": "balc_warm_study_loggia",
    "src": "/images/legacy/full_LNbRAzwr.jpg",
    "title": "Объединение лоджии с комнатой, теплый пол и рабочее место",
    "category": "balconies",
    "location": "Владивосток, ул. Жигура"
  },
  {
    "id": "balc_panoramic_tinted_solar",
    "src": "/images/legacy/aa09cc7e70d16cfdac3ec4e583b4b82c.jpg",
    "title": "Панорамное остекление балкона с тонированными солнцезащитными стеклами",
    "category": "balconies",
    "location": "Владивосток, ул. Луговая"
  },
  {
    "id": "balc_french_glazing_wide",
    "src": "/images/legacy/bc27c75e17dbf6fddfca54aa15041ac3.jpg",
    "title": "Французское остекление балкона во всю высоту плиты от пола до потолка",
    "category": "balconies",
    "location": "Владивосток, ул. Адмирала Горшкова"
  },
  {
    "id": "balc_full_height_warm_pvc",
    "src": "/images/legacy/478c0dc97e37141614c8a0796b88c17b.jpg",
    "title": "Теплое остекление лоджии 5-камерным профилем с энергосбережением",
    "category": "balconies",
    "location": "Владивосток, ул. Снеговая Падь"
  },
  {
    "id": "balc_turnkey_corner_glazing",
    "src": "/images/legacy/1dfc145b98c74e9896680cc9ec397d6b.jpg",
    "title": "Остекление углового балкона с усиленным стальным эркером",
    "category": "balconies",
    "location": "Владивосток, Океанский пр-т"
  },
  {
    "id": "balc_welding_roof_extension",
    "src": "/images/legacy/Ns8vYDcL.jpg",
    "title": "Сварочные работы, вынос парапета и монтаж независимой крыши на балконе",
    "category": "balconies",
    "location": "Владивосток, ул. Чкалова"
  },
  {
    "id": "balc_glazing_with_railings",
    "src": "/images/legacy/full_Bx5dmJ34.jpg",
    "title": "Остекление балкона с утеплением парапета и установкой козырька",
    "category": "balconies",
    "location": "Владивосток, ул. Нейбута"
  },
  {
    "id": "balc_turnkey_view_bay",
    "src": "/images/legacy/full_tGXkptbc.jpg",
    "title": "Остекление 6-метровой лоджии с панорамным видом на бухту Золотой Рог",
    "category": "balconies",
    "location": "Владивосток, ул. Всеволода Сибирцева"
  },
  {
    "id": "balc_compact_warm_balcony",
    "src": "/images/legacy/full_6l64jnEm.jpg",
    "title": "Остекление стандартного 3-метрового балкона в кирпичном доме",
    "category": "balconies",
    "location": "Владивосток, ул. Шилкинская"
  },
  {
    "id": "balc_exterior_parapet_renovation",
    "src": "/images/legacy/3c1480b5d86aee1ce6ab354a7d8578e7.jpg",
    "title": "Усиление балконной плиты металлокаркасом и установка рам ПВХ",
    "category": "balconies",
    "location": "Владивосток, ул. Карбышева"
  },
  {
    "id": "balc_welding_balcony_prep",
    "src": "/images/legacy/902a3a762c9c5b0ff018c7d2a1724c8b.jpg",
    "title": "Сварочные работы по выносу подоконника вперед на 30 см",
    "category": "balconies",
    "location": "Владивосток, ул. Спортивная"
  },
  {
    "id": "balc_panoramic_white_loggia",
    "src": "/images/legacy/68140a2c3eb8c772fc55fb4063e6886f.jpg",
    "title": "Панорамное остекление лоджии с двухкамерными теплыми стеклопакетами",
    "category": "balconies",
    "location": "Владивосток, ул. Пологая"
  },
  {
    "id": "balc_interior_finished_floor",
    "src": "/images/legacy/5c2fb27469d1b06fc8d7e96a296e945b.jpg",
    "title": "Укладка ламината и установка шкафа-купе на утепленной лоджии",
    "category": "balconies",
    "location": "Владивосток, ул. Тухачевского"
  },
  {
    "id": "balc_showroom_display",
    "src": "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg",
    "title": "Выставочный образец комплексного остекления и отделки лоджии в офисе компании",
    "category": "balconies",
    "location": "Владивосток, ул. Ильичева 29"
  },
  {
    "id": "balc_panoramic_daylight_terrace",
    "src": "/images/hero/hero-daylight-patio.jpg",
    "title": "Панорамное теплое остекление просторной террасы с распашными дверями в пол",
    "category": "balconies",
    "location": "Владивосток, Садгород"
  },
  {
    "id": "balc_turnkey_insulation_cladding",
    "src": "/images/legacy/full_dqNbEp3C.jpg",
    "title": "Комплексное утепление лоджии пеноплексом и чистовая отделка под ключ",
    "category": "balconies",
    "location": "Владивосток, ул. Светланская"
  },
  {
    "id": "balc_exterior_vinyl_siding",
    "src": "/images/legacy/ef03b9561fddcafaf4657793ca76d6f0.jpg",
    "title": "Наружная ветрозащитная обшивка балкона морозостойким виниловым сайдингом",
    "category": "balconies",
    "location": "Владивосток, ул. Некрасовская"
  },
  {
    "id": "fin_warm_insulation_layer",
    "src": "/images/legacy/full_MvfdYNR5.jpg",
    "title": "Многослойное утепление лоджии экструдированным пенополистиролом и фольгоизолом",
    "category": "finishing",
    "location": "Владивосток, ул. Давыдова"
  },
  {
    "id": "fin_cladding_timber_style",
    "src": "/images/legacy/full_Zmez3ZYG.jpg",
    "title": "Внутренняя отделка лоджии экологичной деревянной евровагонкой класса Экстра",
    "category": "finishing",
    "location": "Владивосток, ул. Семеновская"
  },
  {
    "id": "fin_floor_heating_install",
    "src": "/images/legacy/full_R2WWIKwY.jpg",
    "title": "Устройство инфракрасного теплого пола и настил коммерческого линолеума на балконе",
    "category": "finishing",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "fin_under_window_insulation",
    "src": "/images/legacy/f270d6f307895b915815537be47eacf2.jpg",
    "title": "Герметизация швов и утепление парапета под подоконной доской",
    "category": "finishing",
    "location": "Владивосток, ул. Кирова"
  },
  {
    "id": "fin_hanyi_facade_cladding",
    "src": "/images/legacy/36c9e0b66c561160ca46ea78ed441f28.jpg",
    "title": "Облицовка балкона долговечными фасадными термопанелями Ханьи с фактурой кирпича",
    "category": "finishing",
    "location": "Владивосток, ул. Кирова"
  },
  {
    "id": "fin_pvc_panels_walls_ceiling",
    "src": "/images/legacy/49d6fda5234f00ba8013574d4c808d06.jpg",
    "title": "Внутренняя отделка стен и потолка лоджии влагостойкими глянцевыми ПВХ-панелями",
    "category": "finishing",
    "location": "Владивосток, ул. Океанский проспект"
  },
  {
    "id": "fin_composite_thermal_panels",
    "src": "/images/legacy/e2a1410ba6597ca740d16822a98d1bd4.jpg",
    "title": "Внешняя теплоизоляция и декоративная облицовка парапета японскими панелями",
    "category": "finishing",
    "location": "Владивосток, ул. Чкалова"
  },
  {
    "id": "fac_glass_pavilion_architecture",
    "src": "/images/legacy/22b24acef73acbfa491186e6072ea01d.jpg",
    "title": "Архитектурное витражное остекление стеклянного павильона и входных групп",
    "category": "facades",
    "location": "Владивосток, район Эгершельд"
  },
  {
    "id": "fac_sliding_aluminum_doors",
    "src": "/images/legacy/Al2fspIs.jpg",
    "title": "Теплые алюминиевые окна и раздвижные портальные системы",
    "category": "facades",
    "location": "Владивосток, ул. Набережная"
  },
  {
    "id": "fac_panoramic_facade_wall",
    "src": "/images/legacy/410ac12c4c83d68b8a2d0f581ca56670.jpg",
    "title": "Стоечно-ригельное фасадное остекление коммерческого здания",
    "category": "facades",
    "location": "Владивосток, ул. Светланская"
  },
  {
    "id": "fac_thermal_aluminum_portal",
    "src": "/images/legacy/697a6195a6d1109ce8ea9e8ee3c192e9.jpg",
    "title": "Алюминиевые окна и двери с терморазрывом для жилого дома",
    "category": "facades",
    "location": "Владивосток, ул. Фонтанная"
  },
  {
    "id": "fac_entrance_group_aluminum",
    "src": "/images/legacy/e25a0f77cfde45e3c6be345e2ffea560.jpg",
    "title": "Входная группа из теплого алюминиевого профиля со стеклом триплекс",
    "category": "facades",
    "location": "Владивосток, ул. Октябрьская"
  },
  {
    "id": "fac_light_aluminum_loggia",
    "src": "/images/legacy/e57d7df2249c224118ce3123ff1fd6a5.jpg",
    "title": "Легкое алюминиевое остекление лоджии с максимальной площадью света",
    "category": "facades",
    "location": "Владивосток, ул. Амурская"
  },
  {
    "id": "fac_penthouse_panoramic_daylight",
    "src": "/images/hero/hero-daylight-penthouse.jpg",
    "title": "Витражное стоечно-ригельное остекление пентхауса с панорамным видом на залив",
    "category": "facades",
    "location": "Владивосток, мыс Эгершельд"
  },
  {
    "id": "fac_warm_aluminum_entrance_doors",
    "src": "/images/legacy/2489a036e868da93ee6bc1beb53e7061.png",
    "title": "Входная группа и витражи из теплого алюминиевого профиля Alutech со стеклом триплекс",
    "category": "facades",
    "location": "Владивосток, ул. Алеутская"
  },
  {
    "id": "fac_vitrage_aluminum_commercial",
    "src": "/images/legacy/ede42fb630e43f3661c52cb7f8537276.jpg",
    "title": "Фасадные алюминиевые конструкции и витражи для коммерческого здания",
    "category": "facades",
    "location": "Владивосток, ул. Пологая"
  },
  {
    "id": "rep_technician_hardware_drill",
    "src": "/images/legacy/full_m9mZ1RW5.jpg",
    "title": "Замена изношенных поворотно-откидных ножниц и оконных петель мастером сервиса",
    "category": "repairs",
    "location": "Владивосток, вызов на дом"
  },
  {
    "id": "rep_hex_key_adjustment_tight",
    "src": "/images/legacy/full_YFiXhAvx.jpg",
    "title": "Точная регулировка прижима створок шестигранным ключом по сезону (зима/лето)",
    "category": "repairs",
    "location": "Владивосток, ул. Черемуховая"
  },
  {
    "id": "rep_rubber_seal_replacement",
    "src": "/images/legacy/e2b3bb36e79c1f2c1599ede31a508e27.jpg",
    "title": "Замена рассохшегося уплотнителя на немецкую морозостойкую резину EPDM",
    "category": "repairs",
    "location": "Владивосток, ул. Некрасовская"
  },
  {
    "id": "rep_sash_geometry_alignment",
    "src": "/images/legacy/9016ec6d8113c6bbe3a412fc5ca8d248.jpg",
    "title": "Восстановление геометрии провисшей створки с помощью дистанционных подкладок",
    "category": "repairs",
    "location": "Владивосток, ул. Адмирала Кузнецова"
  },
  {
    "id": "rep_hardware_lubrication_cleaning",
    "src": "/images/legacy/d9d8b46482a9062cefce7f34f19f7e4c.jpg",
    "title": "Комплексная чистка, промывка и смазка подвижных механизмов фурнитуры Roto",
    "category": "repairs",
    "location": "Владивосток, ул. Овчинникова"
  },
  {
    "id": "rep_double_glazed_unit_swap",
    "src": "/images/legacy/e5962becc20e99773c441e7d9e904a49.jpg",
    "title": "Срочная замена треснувшего стеклопакета на энергосберегающий с аргоном",
    "category": "repairs",
    "location": "Владивосток, ул. Вилкова"
  },
  {
    "id": "rep_hinge_covers_hardware",
    "src": "/images/legacy/a520945140f656caf5c8752cb9a70e02.jpg",
    "title": "Установка декоративных накладок на петли и регулировка микролифта створки",
    "category": "repairs",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "rep_draft_elimination_service",
    "src": "/images/legacy/47c6748fcff7594469286ac152d35f29.jpg",
    "title": "Устранение продувания и промерзания оконного шва по контуру рамы",
    "category": "repairs",
    "location": "Владивосток, ул. Луговая"
  },
  {
    "id": "rep_hardware_adjustment_geometry",
    "src": "/images/legacy/2548e887046d383917d5f9257db03de7.jpg",
    "title": "Регулировка геометрии створки, настройка плотного прижима фурнитуры Roto",
    "category": "repairs",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "rep_lock_child_safety_handles",
    "src": "/images/legacy/3f4d7f43e03ccec3c7ac05f930b3d171.png",
    "title": "Установка ручек с замком от детей и замена замковых механизмов",
    "category": "repairs",
    "location": "Владивосток, ул. Ильичева"
  },
  {
    "id": "rep_full_lubrication_maintenance",
    "src": "/images/legacy/full_6tXcBN5Z.png",
    "title": "Профессиональное сервисное обслуживание, очистка и смазка оконных механизмов",
    "category": "repairs",
    "location": "Владивосток, ул. Давыдова"
  }
];
