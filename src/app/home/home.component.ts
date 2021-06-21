import { Component, OnInit } from '@angular/core';
import { MetrikaService } from '../shared/metrika/metrika.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private metrikaService: MetrikaService) { }

  ngOnInit(): void {
  }

  onHelloClick() {
    const counter: {[key: string]: any} = MetrikaService.getCounterById(81474229);
    counter['hit']('/hello', {
      title: 'Hello page',
      referer: '/'
    });
    // const ym = (window as { [key: string]: any })['ym'];
    // ym(81474229, 'hit', '#hello', {
    //   title: 'Hello page',
    //   referer: 'https://pincats.github.io/ymPlay/'
    // });

    // console.log('[home] onHelloClick');
  }
}
