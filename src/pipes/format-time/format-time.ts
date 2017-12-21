import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  
  transform(value: number, format: string) {
    return moment(value).format(format);
  }
}
