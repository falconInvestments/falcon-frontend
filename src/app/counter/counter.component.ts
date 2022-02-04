import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})

export class CounterComponent implements OnInit {
  @Input()
  count: number = 0;


  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
