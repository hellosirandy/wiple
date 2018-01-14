import { Pipe, PipeTransform } from '@angular/core';
import { Expense, Interval } from '../../models/models';

@Pipe({
  name: 'yearRange',
})
export class YearRangePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(yearRange: Interval) {
    const array = new Array(yearRange.end - yearRange.start).fill(1).map((_, k) => k + yearRange.start);
    return array;
  }
}
