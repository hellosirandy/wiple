import { Pipe, PipeTransform } from '@angular/core';
import { Expense, User } from '../../models/models';
import { PayType } from '../../enums/enums';

@Pipe({
  name: 'specialExpense',
})
export class SpecialExpensePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Expense, firstUser: User, secondUser: User) {
    if (value) {
      if (value.payType === PayType.Treat) {
        if (value.firstPaid > 0) {
          return (firstUser ? firstUser.displayName : '') + '\'s Treat';
        } else {
          return (secondUser ? secondUser.displayName : '') + '\'s Treat';
        }
      } else if (value.payType === PayType.Wiple) {
        return 'Wiple Pay';
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
