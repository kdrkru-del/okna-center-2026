export interface NavItem {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
}

export interface NavSection {
  id: string;
  label: string;
  href: string;
  megaMenu?: {
    featuredTitle: string;
    featuredDesc: string;
    featuredImage: string;
    featuredLink: string;
    categories: {
      title: string;
      items: NavItem[];
    }[];
  };
  simpleItems?: NavItem[];
}

export const MAIN_NAVIGATION: NavSection[] = [
  {
    id: "windows",
    label: "Окна",
    href: "/kupit_plastikovye_okna_vladivostok",
    megaMenu: {
      featuredTitle: "Немецкие системы Rehau & Funke",
      featuredDesc: "Шумоизоляция и энергосбережение для приморского климата. Монтаж по ГОСТ.",
      featuredImage: "/images/bento/bento-rehau-windows.jpg",
      featuredLink: "/profil_dlya_okon",
      categories: [
        {
          title: "Продажа и монтаж",
          items: [
            { label: "Пластиковые окна (купить)", href: "/kupit_plastikovye_okna_vladivostok", desc: "С установкой под ключ и без монтажа" },
            { label: "Установка окон по ГОСТ", href: "/ustanovka_plastikovykh_okon_vo_vladivostokie", desc: "3-слойный теплый шов, гарантия 5 лет" },
            { label: "Замена старых окон", href: "/zamena_plastic_okon_vladivostok", desc: "Демонтаж старых рам, монтаж без пыли" },
          ],
        },
        {
          title: "Специальные серии",
          items: [
            { label: "Окна под дерево (ламинация)", href: "/okna_pod_derevo_vladivostok", desc: "40+ оттенков дуба, ореха, сосны Renolit" },
            { label: "Окна для дачи и дома", href: "/okna_dlya_dachi_vladivostok", desc: "Готовые недорогие окна от 4 000 ₽" },
            { label: "Профили Rehau, KBE, Funke", href: "/profil_dlya_okon", desc: "Сравнение 3-х и 5-камерных систем" },
            { label: "Жалюзи и рулонные шторы", href: "/ievro_zhaliuzi", desc: "Зебра, Roll, кассетные системы" },
          ],
        },
      ],
    },
  },
  {
    id: "balconies",
    label: "Балконы и лоджии",
    href: "/osteklenie_balkona_vladivostok",
    megaMenu: {
      featuredTitle: "Балконы и лоджии под ключ",
      featuredDesc: "Комплексное остекление, сварочные работы, вынос парапета и чистовая отделка за 3-5 дней.",
      featuredImage: "/images/bento/bento-balconies-turnkey.jpg",
      featuredLink: "/lodgia_pod_klyuch_vladivostok",
      categories: [
        {
          title: "Остекление и перепланировка",
          items: [
            { label: "Остекление балконов", href: "/osteklenie_balkona_vladivostok", desc: "Теплый ПВХ и раздвижной алюминий" },
            { label: "Лоджия под ключ", href: "/lodgia_pod_klyuch_vladivostok", desc: "Утепление и превращение в комнату" },
            { label: "Ремонт балконов (сварка)", href: "/riemont_balkonov_vo_vladivostokie", desc: "Усиление плиты, вынос, независимая крыша" },
            { label: "Ремонт лоджий", href: "/riemont_lodzhii_vo_vladivostokie", desc: "Кабинет или лаунж-зона с теплым полом" },
          ],
        },
        {
          title: "Материалы и утепление",
          items: [
            { label: "Утепление лоджий", href: "/uteplenie_lodgiy_vladivostok", desc: "Изопинк, ПСБС, Пенофол" },
            { label: "Отделочные материалы", href: "/otdielochnyie_matierialy", desc: "Панели МДФ, ПВХ, влагостойкий ламинат" },
            { label: "Фасадные панели Ханьи", href: "/panieli_khani", desc: "Японский стиль: камень, кирпич, утепление" },
            { label: "Виниловый сайдинг", href: "/vinilovyi_saidingh", desc: "Внешняя защита парапета от тайфунов" },
          ],
        },
      ],
    },
  },
  {
    id: "aluminum",
    label: "Алюминий",
    href: "/alyuminievye_okna_vladivostok",
    simpleItems: [
      { label: "Алюминиевые окна", href: "/alyuminievye_okna_vladivostok", desc: "Теплые панорамные системы, покраска RAL" },
      { label: "Двери и фасады ALT F50 / 150", href: "/aliuminiievyie_okna_i_dvieri", desc: "Стоечно-ригельные витражи, входные группы" },
    ],
  },
  {
    id: "repairs",
    label: "Ремонт",
    href: "/remont_plastikovyh_okon_vladivostok",
    simpleItems: [
      { label: "Ремонт пластиковых окон", href: "/remont_plastikovyh_okon_vladivostok", desc: "Прайс-лист, замена фурнитуры и стеклопакетов" },
      { label: "Регулировка окон", href: "/regulirovka_plastikovykh_okon_vladivostok", desc: "Устранение сквозняков, настройка прижима зима/лето" },
    ],
  },
  {
    id: "projects",
    label: "Наши работы",
    href: "/ghalierieia_rabot",
  },
  {
    id: "prices",
    label: "Цены",
    href: "/ceny",
  },
  {
    id: "about",
    label: "О компании",
    href: "/okonnaia_kompaniia_vladivostok",
  },
  {
    id: "contacts",
    label: "Контакты",
    href: "/contacts",
  },
];
