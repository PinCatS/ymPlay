import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterConfig, YandexCounterConfig } from './metrika.config';
import { countersFactory, metrikaInitializerFactory } from './metrika.factory';


export const YANDEX_COUNTERS_CONFIG_AOT = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIG_AOT');
export const YANDEX_COUNTERS_CONFIG = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIG');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MetrikaModule {
  static forRoot(config: CounterConfig): ModuleWithProviders<MetrikaModule> {
    return {
      ngModule: MetrikaModule,
      providers: [
        {
          provide: YANDEX_COUNTERS_CONFIG_AOT,
          useValue: config,
        },
        {
          provide: YANDEX_COUNTERS_CONFIG,
          useFactory: countersFactory,
          deps: [YANDEX_COUNTERS_CONFIG_AOT]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: metrikaInitializerFactory,
          deps: [YANDEX_COUNTERS_CONFIG],
          multi: true,
        },
      ],
    };
  }
}
