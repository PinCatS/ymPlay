export interface CounterConfig {
  id: string | number;
  params?: any;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ut?: string;
  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;
}

export class YandexCounterConfig  implements CounterConfig {
  id: string | number = 'yandex-metrika-config';
  params: any;
  clickmap = true;
  trackLinks = true;
  accurateTrackBounce = true;
  webvisor = false;
  trackHash = true;
  ut = 'noindex';
  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;
}
