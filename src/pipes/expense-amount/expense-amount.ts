import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

@Pipe({
  name: 'expenseAmount',
})
export class ExpenseAmountPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Expense, ...args) {
    if (value) {
      return value.firstExpense + value.secondExpense;
    } else {
      return 0;
    }
  }
}
