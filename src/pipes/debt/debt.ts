import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

@Pipe({
  name: 'debt',
})
export class DebtPipe implements PipeTransform {
  
  transform(value: Expense, position: 'first'|'second') {
    const debt = value.payType === 'treat' ? 0 : value.firstPaid - value.firstExpense;
    return position === 'first' ? debt : -debt;
  }
}
