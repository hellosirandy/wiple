import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

@Pipe({
  name: 'yearRange',
})
export class YearRangePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(expenses: Expense[]) {
    let array: number[]=[];
    if (expenses) {
      expenses.sort((a, b) => {
        return a.dateTime - b.dateTime;
      });
      const start = new Date(expenses[0].dateTime).getFullYear();
      const end = new Date(expenses[expenses.length-1].dateTime).getFullYear();
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      console.log(expenses);
      
      console.log(start, end, expenses.length);
    }
    
    return array;
  }
}
