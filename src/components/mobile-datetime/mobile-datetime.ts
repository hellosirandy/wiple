import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Interval } from '../../models/models';
import { CoupleProvider, ExpenseProvider } from '../../providers/providers';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'mobile-datetime',
  templateUrl: 'mobile-datetime.html'
})
export class MobileDatetimeComponent implements OnInit {
  @Input() dateTime;
  @Input() timeInterval;
  @Output() changeTimeInterval = new EventEmitter<any>();
  public model: any;
  yearRange: Interval = { start: new Date().getFullYear(), end: new Date().getFullYear() };
  month: number = 0;
  year: number = 0;

  public datepickerOptions: IMyDpOptions = {
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    editableDateField: false,
    dateFormat: 'yyyy/mm/dd',
  }

  constructor(
    private couple: CoupleProvider,
    private expense: ExpenseProvider
  ) {

  }

  ngOnInit() {
    const date = new Date(this.dateTime);
    this.model = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    this.month = date.getMonth();
    console.log(this.month);
    
    this.year = date.getFullYear();
    this.getData();
  }

  async getData() {
    const coupleKey = await this.couple.getCoupleKey();
    this.yearRange = await this.expense.getYearRange(coupleKey);
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

  onMonthChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(this.year, event);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

  onYearChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(event, this.month);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

  onDateChange(event) {
    const timeInterval = this.timeInterval;
    const dateTime = new Date(event.jsdate);
    this.changeTimeInterval.emit({ timeInterval, dateTime });
  }

}
