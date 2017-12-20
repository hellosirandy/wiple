import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pc-datetime',
  templateUrl: 'pc-datetime.html'
})
export class PcDatetimeComponent {
  @Input() dateTime;
  @Input() timeInterval;
  @Output() changeTimeInterval = new EventEmitter<any>();

  constructor() {

  }

  changeType(timeInterval) {
    if (timeInterval !== this.timeInterval) {
      const dateTime = this.dateTime;
      this.changeTimeInterval.emit({ timeInterval, dateTime });
    }
  }

  changeDateTime() {
    const timeInterval = this.timeInterval;
    const dateTime = this.dateTime;
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

}
