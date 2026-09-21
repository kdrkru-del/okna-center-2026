export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  schedule: string;
  isMain: boolean;
  coords: [number, number];
}

export const CONTACTS = {
  companyName: "Окна-Центр",
  brandName: "ОКНА ЦЕНТР",
  legalName: 'Компания «Окна Центр»',
  foundedYear: 2004,
  experienceYears: 22,
  slogan: "Окна, балконы и архитектурное остекление",
  city: "Владивосток",
  region: "Приморский край",
  domain: "https://xn--80aknmcbtp7a.xn--p1ai",
  displayDomain: "окнацентр.рф",

  phones: {
    mainDisplay: "8 (423) 2-725-725",
    mainRaw: "+74232725725",
    ussuriyskDisplay: "8 (924) 260-63-50",
    ussuriyskRaw: "+79242606350",
    additional: [
      { display: "8 (423) 2-733-414", raw: "+74232733414" },
      { display: "8 (423) 2-718-229", raw: "+74232718229" },
      { display: "+7 (994) 010-03-00", raw: "+79940100300" },
      { display: "+7 (914) 704-25-38", raw: "+79147042538" },
    ],
  },

  whatsapp: {
    display: "+7 (994) 010-03-00",
    number: "79940100300",
    url: "https://wa.me/79940100300?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%80%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BE%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F",
  },

  emails: ["okna.c@mail.ru", "okno_ussur@mail.ru"],

  offices: [
    {
      city: "Владивосток",
      address: "ул. Ильичева, д. 29, оф. 8",
      phone: "8 (423) 2-725-725",
      phoneRaw: "+74232725725",
      email: "okna.c@mail.ru",
      schedule: "Пн-Пт 9:00 - 18:00, Сб 10:00 - 16:00",
      isMain: true,
      coords: [43.155823, 131.905384],
    },
    {
      city: "Уссурийск",
      address: "ул. Кирова, д. 12, оф. 202",
      phone: "8 (924) 260-63-50",
      phoneRaw: "+79242606350",
      email: "okno_ussur@mail.ru",
      schedule: "Пн-Пт 9:00 - 18:00, Сб 10:00 - 15:00",
      isMain: false,
      coords: [43.797204, 131.954201],
    },
  ] as OfficeLocation[],

  deliveryAreas: [
    "Владивосток",
    "Уссурийск",
    "Артем",
    "Надеждинский район",
    "Находка",
    "Большой Камень",
    "Приморский край",
  ],

  farEastShipping: [
    "Камчатка (Петропавловск-Камчатский)",
    "Сахалин (Южно-Сахалинск)",
    "Магадан",
    "Чукотка (Анадырь)",
  ],

  workScheduleSummary: "Пн–Сб 9:00–18:00",
  guaranteeSummary: "5 лет гарантии по официальному договору",
  measurementSummary: "Бесплатный выезд замерщика 0 ₽ по Владивостоку и Уссурийску",
};
