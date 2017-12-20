import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Expense } from '../../models/models';
import { PayType } from '../../enums/enums';

@Injectable()
export class ExpenseProvider {

  constructor(
    private afDatabase: AngularFireDatabase
  ) {
  }

  saveExpense(coupleKey, expense) {
    if (expense.key) {
      const expenseKey = expense.key;
      delete expense.key;
      return this.afDatabase.object(`/expenses/${coupleKey}/${expenseKey}`).set(expense);
    } else {
      return this.afDatabase.list(`/expenses/${coupleKey}`).push(expense);
    }
  }

  getExpense(coupleKey: string, timeInterval, selectedTime) {
    if (timeInterval && selectedTime) {
      const start = moment(selectedTime).startOf(timeInterval).valueOf();
      const end = moment(selectedTime).endOf(timeInterval).valueOf();
      return this.afDatabase.list(`/expenses/${coupleKey}`, 
        ref => ref.orderByChild('date').startAt(start).endAt(end))
        .snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })).filter((e: Expense) => e.payType !== PayType.Wiple);
        }
      );
    }
    
  }

}
