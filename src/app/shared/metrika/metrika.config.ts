export interface CounterConfig {
  id: string | number;
  params?: any;
  defer?: boolean;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;
}

export class YandexCounterConfig  implements CounterConfig {
  id: string | number = 'yandex-metrika-config';
  params: any;
  defer = true;
  clickmap = true;
  trackLinks = true;
  accurateTrackBounce = true;
  webvisor = false;
  trackHash = false;
  ecommerce?: string;
  triggerEvent? = true;
  alternative?: boolean;
}
