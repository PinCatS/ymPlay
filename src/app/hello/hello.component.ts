import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styles: [
  ]
})
export class HelloComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick() {
    // const ym = (window as { [key: string]: any })['ym'];
    // ym(81474229,'reachGoal','"home_target"');
  }

}
