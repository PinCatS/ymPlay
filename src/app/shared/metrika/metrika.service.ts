import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CounterConfig } from './metrika.config';
import { YANDEX_COUNTERS_CONFIG } from './metrika.module';

@Injectable({
  providedIn: 'root'
})
export class MetrikaService implements OnDestroy {

  private previousUrl = this.router.url;
  private hitSub: Subscription | null = null;

  private reachGoalSubject = new Subject<any>();
  reachGoal$ = this.reachGoalSubject.asObservable();


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
        this._reportHit(this.router.url, this.previousUrl);
        this.previousUrl = this.router.url;
      }
    );

  }

  private _reportHit(url: string, prevUrl: string) {
      console.log(`[ya netrika service] report hit for ${this.metrikaConfig.id}: url ${url}, prevUrl ${prevUrl}`);

      const metrikaCounter: any = MetrikaService.getCounterById(this.metrikaConfig.id);

      if (metrikaCounter) {
        metrikaCounter.hit(url, {
          referer: prevUrl
        })
      } else {
        console.warn('[ya netrika service] report hit: counter is undefined');
      }
  }

  private _onNavigationEnd(): Observable<Event> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
  }

  checkCounter(id: string | number): Promise<boolean> {
    return new Promise((resolve) => {
      const counterName = `yacounter${id}inited`;
      document.addEventListener(counterName, () => {
        console.log(`Counter ${id} loaded`);
        resolve(true);
      })
    });
  }

  ngOnDestroy() {
    this.hitSub?.unsubscribe();
  }
}
