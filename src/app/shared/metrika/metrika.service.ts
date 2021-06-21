import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CounterConfig } from './metrika.config';
import { YANDEX_COUNTERS_CONFIG } from './metrika.module';
import { MetrikaHitOptions, MetrikaOptionsParams } from './model/metrika.model';

@Injectable({
  providedIn: 'root'
})
export class MetrikaService implements OnDestroy {

  private previousUrl = this.router.url;
  private hitSub: Subscription | null = null;


  constructor(
    private router: Router,
    @Inject(YANDEX_COUNTERS_CONFIG) private metrikaConfig: CounterConfig
  ) {
    this._init();
  }

  static getCounterNameById(id: string | number): string {
    return `yaCounter${id}`;
  }

  static getCounterById(id: any): Function {
    return (window as { [key: string]: any })[MetrikaService.getCounterNameById(id)];
  }

  private async _init() {

    await this.checkCounter(this.metrikaConfig.id);

    /* Report navigation to the page to Yandex Metrika */
    const hitSub = this._onNavigationEnd().subscribe(
      () => {
        this.reportHit(this.router.url, this.previousUrl);
        this.previousUrl = this.router.url;
      }
    );

  }

  /**
   *
   * Reports to Yanadex Metrika that the target page was viewed.
   *
   * @param url Target page url
   * @param prevUrl Url from which target page was reached
   * @param options Optional additional options of type MetrikaHitOptions
   *
   * @link https://yandex.ru/support/metrica/objects/hit.html
   */
  reportHit(url: string, prevUrl: string, options?: MetrikaHitOptions): void {

    const metrikaCounter: any = MetrikaService.getCounterById(this.metrikaConfig.id);

    if (metrikaCounter) {
      metrikaCounter.hit(url, {
        ...options,
        referer: prevUrl
      })
    } else {
      console.warn('[ya metrika service] report hit: counter is undefined');
    }
  }

  /**
   *
   * Reports to Yanadex Metrika that the goal was reached.
   *
   * @param target Goal id which is specified on the goal creation page
   * @param params Optional additional parameters of type MetrikaOptionsParams
   * @param callback Optional callback which is called by Yandex Metrika after goal was reported
   * @param callbackCtx Context for the callback's this
   *
   * @link https://yandex.ru/support/metrica/objects/reachgoal.html
   */
  reportGoalReached(target: string, params?: MetrikaOptionsParams, callback = () => {}, callbackCtx?: any): void {

    const metrikaCounter: any = MetrikaService.getCounterById(this.metrikaConfig.id);

    if (metrikaCounter) {
      metrikaCounter.reachGoal(target, params, callback, callbackCtx);
    } else {
      console.warn('[ya metrika service] report goal reached: counter is undefined');
    }
  }

  private _onNavigationEnd(): Observable<Event> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
  }

  /**
   * Listens on `yacounter${id}inited` event which is emitted by Yandex Metrika
   * when couner is loaded on the page.
   *
   * @param id Yandex Metrika counter id
   * @returns resolved promise when counter is loaded to the page
   */
  checkCounter(id: string | number): Promise<boolean> {
    return new Promise((resolve) => {
      const counterName = `yacounter${id}inited`;
      document.addEventListener(counterName, () => {
        resolve(true);
      })
    });
  }

  ngOnDestroy() {
    this.hitSub?.unsubscribe();
  }
}
