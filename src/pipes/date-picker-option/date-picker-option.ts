import { Pipe, PipeTransform } from '@angular/core';
import { TimeInterval } from '../../enums/enums';
import { IMyDpOptions } from 'mydatepicker';
@Pipe({
  name: 'datePickerOption',
})
export class DatePickerOptionPipe implements PipeTransform {
  
  transform(value: any, ...args) {
    const datepickerOptions: IMyDpOptions = {
      showClearDateBtn: false,
      openSelectorOnInputClick: true,
      editableDateField: false,
      dateFormat: 'yyyy/mm/dd',
    }
    return datepickerOptions;
  }
}
