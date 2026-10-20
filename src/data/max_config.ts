export interface MaxManager {
  id: 'manager_1' | 'manager_2';
  number: 1 | 2;
  name: string;
  label: string;
  url: string;
}

export const MAX_MANAGERS: readonly [MaxManager, MaxManager] = [
  {
    id: 'manager_1',
    number: 1,
    name: 'Менеджер №1',
    label: 'Менеджер 1',
    url: 'https://max.ru/u/f9LHodD0cOLXKdqpp2tL6ePp-scANUSxlpdj83p8hSzo299GYAmptikyU7g',
  },
  {
    id: 'manager_2',
    number: 2,
    name: 'Менеджер №2',
    label: 'Менеджер 2',
    url: 'https://max.ru/u/f9LHodD0cOJgLgv2-V0_drbKxFJdTDdDx6c3-JXwKhMv-v1LSgKFi7WDc84',
  },
] as const;

export const MAX_BRAND = {
  buttonText: 'MAX',
  iconPath: '/images/icons/max-logo.svg',
  brandbookUrl: 'https://go.max.ru/brandbook',
  counterNamespace: 'oknacentr_rf_prod',
  maxCounterKey: 'max_rr_v2',
  leadCounterKey: 'lead_rr_v2',
} as const;
