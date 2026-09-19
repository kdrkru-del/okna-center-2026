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
    "id": "win_cottage_classic_white",
    "src": "/images/legacy/b100bb11e3db0f0f4c3bdfe2d1ac9a08.jpg",
    "title": "Комплексное остекление загородного дома двухкамерными стеклопакетами",
    "category": "windows",
    "location": "Надеждинский район"
  },
  {
    "id": "win_dacha_summer_house",
    "src": "/images/legacy/847c7f1f106f69c5bc24465f9b20bef3.jpg",
    "title": "Установка готовых окон для дачного дома с москитными сетками",
    "category": "windows",
    "location": "Владивосток, ст. Весенняя"
  },
  {
    "id": "win_dacha_compact",
    "src": "/images/legacy/fbe2f688a51def14d6a7f620bfa8480f.jpg",
    "title": "Монтаж поворотно-откидного окна в загородном коттедже",
    "category": "windows",
    "location": "г. Артём"
  },
  {
    "id": "win_laminated_natural_oak",
    "src": "/images/legacy/full_7sqeCo56.jpg",
    "title": "Дизайнерские окна с ламинацией под натуральный дуб в интерьере",
    "category": "windows",
    "location": "Владивосток, ул. Светланская"
  },
  {
    "id": "win_laminated_wood_cottage",
    "src": "/images/legacy/3d8fb82694b5c96b3091bed0a9e05b60.jpg",
    "title": "Остекление деревянного дома ламинированными окнами ПВХ",
    "category": "windows",
    "location": "Пригород, пос. Соловей Ключ"
  },
  {
    "id": "win_laminated_brown_frame",
    "src": "/images/legacy/5b4bcb9b6fed188c26eb07b00198edc6.jpg",
    "title": "Окна с двухсторонней ламинацией и скрытыми петлями",
    "category": "windows",
    "location": "Владивосток, пр-т 100-летия Владивостока"
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
    "id": "win_two_leaf_panel_house",
    "src": "/images/legacy/bb29ad933dc6eaae626635edcf31d0a3.jpg",
    "title": "Замена старых деревянных рам на теплые окна Rehau в панельном доме",
    "category": "windows",
    "location": "Владивосток, ул. Борисенко"
  },
  {
    "id": "win_standard_brick_house",
    "src": "/images/legacy/fcb89289c37f743430c7df17674a69db.jpg",
    "title": "Монтаж пластиковых окон в кирпичном доме с широкими теплыми подоконниками",
    "category": "windows",
    "location": "Владивосток, ул. Алеутская"
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
    "id": "win_installation_ready_open",
    "src": "/images/legacy/e4c8f8f5e9d29ccea4e4cbef9097489d.jpg",
    "title": "Установленное окно с открытой створкой на зимнем проветривании",
    "category": "windows",
    "location": "Владивосток, ул. Калинина"
  },
  {
    "id": "win_brick_wall_sealed",
    "src": "/images/legacy/4ba37885cb51fd3f76c969ae74f75ed6.jpg",
    "title": "Монтаж пластикового окна в кирпичной кладке с защитной пароизоляцией",
    "category": "windows",
    "location": "Владивосток, ул. Океанский пр-т"
  },
  {
    "id": "win_living_renovation",
    "src": "/images/legacy/3d8db2b6efeddffa4a1bb4efd1ce5931.jpg",
    "title": "Энергосберегающие окна в процессе комплексного ремонта квартиры",
    "category": "windows",
    "location": "Владивосток, ул. Толстого"
  },
  {
    "id": "win_cottage_mansard",
    "src": "/images/legacy/14ea25c6eb0cc63a9666d58313d31b00.jpg",
    "title": "Монтаж окон в мансардном этаже загородного дома",
    "category": "windows",
    "location": "Пригород, урочище Соловей Ключ"
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
    "id": "balc_facade_glazing_residential",
    "src": "/images/legacy/4e9864818496da13fc2a00f80cab08d5.jpg",
    "title": "Внешнее остекление лоджии с установкой отливов и нащельников",
    "category": "balconies",
    "location": "Владивосток, ул. Кирова"
  },
  {
    "id": "balc_warm_frame_interior",
    "src": "/images/legacy/29a6764291109061736d7bdc6e7f721d.jpg",
    "title": "Монтаж теплого контура остекления перед внутренней чистовой отделкой",
    "category": "balconies",
    "location": "Владивосток, ул. Котельникова"
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
    "id": "balc_turnkey_clean_finish",
    "src": "/images/legacy/c3a84d78bc8efa995a25b97481f9e47a.jpg",
    "title": "Чистовая отделка лоджии влагостойкими панелями с установкой точечных светильников",
    "category": "balconies",
    "location": "Владивосток, ул. Сабанеева"
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
    "id": "balc_brick_loggia_glazed",
    "src": "/images/legacy/e81f4bb067a78cd9738aa774363538ae.jpg",
    "title": "Остекление лоджии в кирпичной новостройке профилем Funke",
    "category": "balconies",
    "location": "г. Уссурийск, ул. Ленина"
  },
  {
    "id": "balc_showroom_display",
    "src": "/images/legacy/2a64735301341e2bcc1ff10380187519.jpg",
    "title": "Выставочный образец комплексного остекления и отделки лоджии в офисе компании",
    "category": "balconies",
    "location": "Владивосток, ул. Ильичева 29"
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
    "id": "fin_turnkey_loggia_plaster",
    "src": "/images/legacy/c2f5538fc26b2cf2f4615bde2d239d64.jpg",
    "title": "Утепление стен, монтаж влагостойкого гипсокартона и чистовая покраска",
    "category": "finishing",
    "location": "Владивосток, пр-т Красного Знамени"
  },
  {
    "id": "fin_floor_heating_install",
    "src": "/images/legacy/full_R2WWIKwY.jpg",
    "title": "Устройство инфракрасного теплого пола и настил коммерческого линолеума на балконе",
    "category": "finishing",
    "location": "Владивосток, ул. Русская"
  },
  {
    "id": "fin_wall_ceiling_lighting",
    "src": "/images/legacy/24944a510b2fc9015cce8e90fe862a29.jpg",
    "title": "Монтаж натяжного потолка со встроенными спотами на утепленной лоджии",
    "category": "finishing",
    "location": "Владивосток, ул. Бестужева"
  },
  {
    "id": "fin_side_wall_cupboard",
    "src": "/images/legacy/9bf786c0e60e99f3bfdffe86ecf1dc09.jpg",
    "title": "Изготовление встроенного влагостойкого шкафа на балконе по индивидуальным размерам",
    "category": "finishing",
    "location": "Владивосток, ул. Верхнепортовая"
  },
  {
    "id": "fin_under_window_insulation",
    "src": "/images/legacy/f270d6f307895b915815537be47eacf2.jpg",
    "title": "Герметизация швов и утепление парапета под подоконной доской",
    "category": "finishing",
    "location": "Владивосток, ул. Кирова"
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
    "id": "fac_sliding_balcony_system",
    "src": "/images/legacy/c40edb113acdd0f9dd1abc7874e9a218.jpg",
    "title": "Раздвижное холодное алюминиевое остекление балкона системы Provedal",
    "category": "facades",
    "location": "Владивосток, ул. Прапорщика Комарова"
  },
  {
    "id": "fac_wide_sliding_terrace",
    "src": "/images/legacy/c98ac3a796213e2049d480f2d81fd3e8.jpg",
    "title": "Панорамные алюминиевые раздвижные створки с защитой от тайфунов",
    "category": "facades",
    "location": "Владивосток, ул. Батарейная"
  },
  {
    "id": "fac_glazed_veranda_doors",
    "src": "/images/legacy/7bacd600b5337e3d9ec2d663ba87bbbd.jpg",
    "title": "Остекление террасы и веранды алюминиевыми распашными дверями",
    "category": "facades",
    "location": "Пригород, пос. Трудовое"
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
    "id": "fac_balcony_sliding_frame",
    "src": "/images/legacy/e6d23e86d7ce60e65c236700b0772d7c.jpg",
    "title": "Алюминиевая раздвижная конструкция с фетровым уплотнителем",
    "category": "facades",
    "location": "Владивосток, ул. Хабаровская"
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
    "id": "rep_handle_child_safety_lock",
    "src": "/images/legacy/825326a09165343c1dd3be3f2b6ec387.jpg",
    "title": "Установка ручки с детским замком безопасности и защита от случайного открывания",
    "category": "repairs",
    "location": "Владивосток, ул. Нейбута"
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
    "id": "rep_strike_plate_setting",
    "src": "/images/legacy/bfc6e5150df44920b5b67fbc4411c1bb.jpg",
    "title": "Замена ответных планок фурнитуры и настройка плавного хода ручки",
    "category": "repairs",
    "location": "Владивосток, ул. Снеговая"
  }
];
