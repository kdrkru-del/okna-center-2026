/**
 * Multi-city configuration and smart city detector for Okna Center.
 * Supports: Владивосток, Уссурийск, Артём, Пригород / Другой.
 * 
 * Automatically detects initial city from UTM campaigns (e.g. Ussuriysk repair campaign 715735406),
 * landing query parameters, or stored session preferences, while allowing users to change city explicitly.
 */

export type SupportedCity = 'Владивосток' | 'Уссурийск' | 'Артём' | 'Пригород / Другой';

export interface CityContact {
  city: SupportedCity;
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
  address: string;
}

export const CITIES_LIST: SupportedCity[] = [
  'Владивосток',
  'Уссурийск',
  'Артём',
  'Пригород / Другой',
];

export const CITY_CONTACTS: Record<SupportedCity, CityContact> = {
  'Владивосток': {
    city: 'Владивосток',
    phoneDisplay: '8 (423) 2-725-725',
    phoneRaw: '+74232725725',
    email: 'okna.c@mail.ru',
    address: 'ул. Ильичева, д. 29, оф. 8',
  },
  'Уссурийск': {
    city: 'Уссурийск',
    phoneDisplay: '8 (950) 2-800-300',
    phoneRaw: '+79502800300',
    email: 'okno_ussur@mail.ru',
    address: 'ул. Кирова, д. 12, оф. 202',
  },
  'Артём': {
    city: 'Артём',
    phoneDisplay: '8 (423) 2-725-725',
    phoneRaw: '+74232725725',
    email: 'okna.c@mail.ru',
    address: 'ул. Ильичева, д. 29, оф. 8',
  },
  'Пригород / Другой': {
    city: 'Пригород / Другой',
    phoneDisplay: '8 (423) 2-725-725',
    phoneRaw: '+74232725725',
    email: 'okna.c@mail.ru',
    address: 'ул. Ильичева, д. 29, оф. 8',
  },
};

const CITY_STORAGE_KEY = 'okna_selected_city';

/**
 * Detects the user's initial city based on session storage, UTM tags, and landing path.
 */
export function detectInitialCity(): SupportedCity {
  if (typeof window === 'undefined') return 'Владивосток';

  try {
    // 1. Explicit user selection stored in session
    const saved = window.sessionStorage.getItem(CITY_STORAGE_KEY) as SupportedCity;
    if (saved && CITY_CONTACTS[saved]) {
      return saved;
    }

    // 2. Check query string and stored UTM parameters
    const search = window.location.search.toLowerCase();
    const storedUtm = window.sessionStorage.getItem('_okna_stored_utms') || '';
    const pathname = window.location.pathname.toLowerCase();
    const combined = `${search} ${storedUtm.toLowerCase()} ${pathname}`;

    // Ussuriysk campaign (715735406) or keyword tokens
    if (
      combined.includes('715735406') ||
      combined.includes('ussur') ||
      combined.includes('уссурийск') ||
      combined.includes('ussuriysk')
    ) {
      return 'Уссурийск';
    }

    // Artem campaign / tokens
    if (
      combined.includes('artem') ||
      combined.includes('артём') ||
      combined.includes('артем')
    ) {
      return 'Артём';
    }
  } catch {
    // ignore
  }

  return 'Владивосток';
}

/**
 * Persists user's explicit city selection and notifies UI components.
 */
export function saveSelectedCity(city: SupportedCity): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(CITY_STORAGE_KEY, city);
    window.dispatchEvent(new CustomEvent('okna_city_changed', { detail: city }));
  } catch {
    // ignore
  }
}

/**
 * Returns contact details for the specified city.
 */
export function getCityContact(city?: string): CityContact {
  const c = (city as SupportedCity) || 'Владивосток';
  return CITY_CONTACTS[c] || CITY_CONTACTS['Владивосток'];
}
