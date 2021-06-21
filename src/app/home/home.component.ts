import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHelloClick() {
    const ym = (window as { [key: string]: any })['ym'];
    ym(81474229, 'hit', '#hello', {
      title: 'Hello page',
      referer: 'https://pincats.github.io/ymPlay/'
    });

    console.log('[home] onHelloClick');
  }
}
