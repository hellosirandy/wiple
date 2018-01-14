import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { Expense, Interval } from '../../models/models';
import { ExpenseProvider, CoupleProvider } from '../../providers/providers';

@Component({
  selector: 'pc-datetime',
  templateUrl: 'pc-datetime.html'
})
export class PcDatetimeComponent implements OnInit {
  @Input() dateTime;
  @Input() timeInterval;
  @Output() changeTimeInterval = new EventEmitter<any>();
  yearRange: Interval = { start: new Date().getFullYear(), end: new Date().getFullYear() };
  month: number = 0;
  year: number = 0;

  public datepickerOptions: IMyDpOptions = {
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    editableDateField: false,
    dateFormat: 'yyyy/mm/dd',
  }
  public model: any;

  constructor(
    private couple: CoupleProvider,
    private expense: ExpenseProvider,
  ) {

  }

  ngOnInit() {
    const date = new Date(this.dateTime);
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.model = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate() } };
    this.getData();
    
  }

  async getData() {
    const coupleKey = await this.couple.getCoupleKey();
    this.yearRange = await this.expense.getYearRange(coupleKey);
  }

  changeType(timeInterval) {
    if (timeInterval !== this.timeInterval) {
      const dateTime = this.dateTime;
      this.changeTimeInterval.emit({ timeInterval, dateTime });
    }
  }

  onMonthChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(this.year, event);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

  onYearChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(event, 0);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

  onDateChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(event.jsdate);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }
}
