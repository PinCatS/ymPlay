import { Component, OnInit } from '@angular/core';
import { MetrikaService } from '../shared/metrika/metrika.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styles: [
  ]
})
export class HelloComponent implements OnInit {

  constructor(private metrikaService: MetrikaService) { }

  ngOnInit(): void {
  }

  onBackClick() {
    this.metrikaService.reportGoalReached('home_target', {}, () => {console.log('HOME_TARGET goal reported')});
  }

}
