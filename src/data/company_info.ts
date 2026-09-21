export interface Office {
  city: string;
  address: string;
  addressNote?: string;
  alternativeAddress?: string;
  phone: string;
  phoneRaw: string;
  email: string;
  schedule: string;
  coordinates: [number, number];
  isMain?: boolean;
  needsVerification?: boolean;
}

export const COMPANY_INFO = {
  name: "Окна Центр",
  legalName: 'Компания «Окна Центр»',
  foundedYear: 2004,
  experienceText: "Работаем с 2004 года",
  slogan: "Окна, балконы и остекление во Владивостоке, Уссурийске и Приморском крае",
  subSlogan: "Производство • доставка • профессиональный монтаж",
  mainPhone: "8 (423) 2-725-725",
  mainPhoneRaw: "+74232725725",
  additionalPhones: [
    { display: "8 (423) 2-733-414", raw: "+74232733414" },
    { display: "8 (423) 2-718-229", raw: "+74232718229" },
    { display: "+7 (994) 010-03-00", raw: "+79940100300" },
    { display: "+7 (950) 2-800-300", raw: "+79502800300" },
    { display: "+7 (914) 704-25-38", raw: "+79147042538" },
  ],
  whatsappNumber: "+79940100300",
  whatsappUrl: "https://wa.me/79940100300?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BE%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F",
  emails: ["okna.c@mail.ru", "okno_ussur@mail.ru"],
  domain: "https://xn--80aknmcbtp7a.xn--p1ai",
  displayDomain: "окнацентр.рф",
  offices: [
    {
      city: "Владивосток",
      address: "ул. Ильичева, д. 29, оф. 8",
      addressNote: "г. Владивосток, ул. Ильичева, д. 29, оф. 8",
      phone: "8 (423) 2-725-725",
      phoneRaw: "+74232725725",
      email: "okna.c@mail.ru",
      schedule: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00, Вс: выходной",
      coordinates: [43.155823, 131.905384],
      isMain: true,
      needsVerification: false,
    },
    {
      city: "Уссурийск",
      address: "ул. Кирова, д. 12, оф. 202",
      addressNote: "г. Уссурийск, ул. Кирова, д. 12, оф. 202",
      phone: "8 (950) 2-800-300",
      phoneRaw: "+79502800300",
      email: "okno_ussur@mail.ru",
      schedule: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00, Вс: выходной",
      coordinates: [43.797204, 131.954201],
      isMain: false,
      needsVerification: false,
    },
  ] as Office[],
  additionalLocations: [
    "Артем",
    "Находка",
    "Большой Камень",
    "Весь Приморский край",
    "Доставка по ДВ: Анадырь, Магадан, Южно-Сахалинск, Петропавловск-Камчатский"
  ],
  workingHours: "Пн–Сб 9:00–18:00",
  guarantee: "Гарантия на выполненные работы по договору",
  freeMeasurement: "Бесплатный выезд на замер",
  brands: ["Rehau", "KBE", "Funke", "Deceuninck", "Alutech (ALT F50, ALT 150)", "Roto"],
};
