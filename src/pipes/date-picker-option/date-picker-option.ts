import { Pipe, PipeTransform } from '@angular/core';
import { TimeInterval } from '../../enums/enums';
@Pipe({
  name: 'datePickerOption',
})
export class DatePickerOptionPipe implements PipeTransform {
  
  transform(value: string, ...args) {
    let displayFormat: string;
    if (value === TimeInterval.Year) {
      displayFormat = 'YYYY';
    } else if (value === TimeInterval.Month) {
      displayFormat = 'YYYY/MM';
    } else if (value === TimeInterval.Day) {
      displayFormat = 'YYYY/MM/DD';
    }
    const datepickerOptions = {
      minYear: 1970,
      maxYear: new Date().getFullYear() + 1,
      displayFormat: displayFormat,
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 0,
    }
    return datepickerOptions;
  }
}
