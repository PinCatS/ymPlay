export interface CounterConfig {
  id: string | number;
  type?: 0 | 1;
  params?: any;
  userParams?: any;
  defer?: boolean;
  clickmap?: boolean;
  trackLinks?: boolean;
  childIframe?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ecommerce?: string | boolean | [];
  triggerEvent?: boolean;
  alternative?: boolean;
}

export class YandexCounterConfig  implements CounterConfig {
  id: string | number = 'yandex-metrika-config';
  type: 0 | 1 = 0;
  params: any;
  userParams: any;
  defer = true;
  clickmap = true;
  trackLinks = true;
  childIframe = false;
  accurateTrackBounce = true;
  webvisor = false;
  trackHash = false;
  ecommerce?: string | boolean | [];
  triggerEvent? = true;
  alternative?: boolean;
}
