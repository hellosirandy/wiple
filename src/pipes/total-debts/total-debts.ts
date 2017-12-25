import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../models/models';

/**
 * Generated class for the TotalDebtsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'totalDebts',
})
export class TotalDebtsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Expense[], position: string) {
    return value ? value.map(exp => {
      const debt = exp.payType === 'treat' ? 0 : exp.firstPaid - exp.firstExpense;
      return position === 'first' ? debt : -debt;
    }).reduce((a, b) => {
      return a + b;
    }, 0) : 0;
  }
}
