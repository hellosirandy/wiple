import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

@Pipe({
  name: 'extractExpense',
})
export class ExtractExpensePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Expense[], args) {
    return value ? value.filter(expense => {
      return expense.payType !== 'treat' && expense.firstPaid !== expense.firstExpense;
    }) : [];
  }
}
