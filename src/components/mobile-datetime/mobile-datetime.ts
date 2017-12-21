import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mobile-datetime',
  templateUrl: 'mobile-datetime.html'
})
export class MobileDatetimeComponent {
  @Input() dateTime;
  @Input() timeInterval;
  @Output() changeTimeInterval = new EventEmitter<any>();

  constructor() {

  }

  changeType(timeInterval) {
    const dateTime = this.dateTime;
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

  changeDateTime() {
    const timeInterval = this.timeInterval;
    const dateTime = this.dateTime;
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

}
