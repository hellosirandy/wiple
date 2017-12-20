import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

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

}
