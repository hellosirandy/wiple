import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

@Pipe({
  name: 'totalExpense',
})
export class TotalExpensePipe implements PipeTransform {
  
  transform(value: Expense[], position) {
    if (value) {
      const amounts = value.map(e => {
        if (position === 'integrate') {
          return e.firstExpense + e.secondExpense;
        } else if (position === 'first') {
          return e.firstExpense;
        } else {
          return e.secondExpense;
        }
      });
      return amounts.reduce((a, b) => {
        return a + b;
      }, 0);
    } else {
      return 0;
    }
    
  }
}
