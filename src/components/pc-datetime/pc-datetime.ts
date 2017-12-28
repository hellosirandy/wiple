import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { Expense } from '../../models/models';

@Component({
  selector: 'pc-datetime',
  templateUrl: 'pc-datetime.html'
})
export class PcDatetimeComponent implements OnChanges, OnInit {
  @Input() dateTime;
  @Input() timeInterval;
  @Input() expenses: Expense[];
  @Output() changeTimeInterval = new EventEmitter<any>();
  public myDatePickerOptions: IMyDpOptions = {
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    editableDateField: false,
    dateFormat: 'yyyy/mm/dd',
  };

  public model: any;

  constructor() {

  }

  ngOnInit() {
    const date = new Date(this.dateTime);
    this.model = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() } };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue && changes.expenses.currentValue !== changes.expenses.previousValue) {
      
    }
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
