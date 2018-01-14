import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Expense, Particle, Piece, Interval } from '../../models/models';
import { PayType, ExpenseCategoryColors } from '../../enums/enums';

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

  getExpense(coupleKey: string, timeInterval?, selectedTime?) {
    if (timeInterval && selectedTime) {
      const start = moment(selectedTime).startOf(timeInterval).valueOf();
      const end = moment(selectedTime).endOf(timeInterval).valueOf();
      return this.afDatabase.list(`/expenses/${coupleKey}`, 
        ref => ref.orderByChild('dateTime').startAt(start).endAt(end))
        .snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })).filter((e: Expense) => e.payType !== PayType.Wiple);
        }
      );
    } else {
      return this.afDatabase.list(`/expenses/${coupleKey}`, ref => ref.orderByChild('dateTime'))
        .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
    }
  }
  generateStats(expenses: Expense[], position: 'first' | 'second' | null = null) {
    let pile: any = {};
    for (let exp of expenses) {
      const amount = this.getAmount(exp, position);
      if (amount > 0) {
        if (pile[exp.category]) {
          pile[exp.category].total += amount;
          pile[exp.category].expenses.push(exp);
        } else {
          pile[exp.category] = <Particle> { category: exp.category, total: amount, expenses: [exp] }
        }
      }
    }
    pile = Object.keys(pile).map(key => pile[key]).sort((a, b) => b.total - a.total);
    const pie: Piece[] = this.generatePie(pile);
    return { pie, pile };
  }

  generatePie(pile: Particle[]) {
    return pile.map(p => <Piece> { name: p.category, y: p.total, color: ExpenseCategoryColors[p.category] });
  }

  getAmount(expense: Expense, position: 'first' | 'second' | null = null) {
    if (position) {
      return position === 'first' ? expense.firstExpense : expense.secondExpense;
    } else {
      return expense.firstExpense + expense.secondExpense;
    }
  }

  removeExpense(coupleKey, expense) {
    return this.afDatabase.object(`/expenses/${coupleKey}/${expense.key}`).remove();
  }

  getYearRange(coupleKey): Promise<Interval> {
    return new Promise((resolve, reject) => {
      this.afDatabase.list<Expense>(`/expenses/${coupleKey}`, ref => ref.orderByChild('dateTime').limitToFirst(1))
      .valueChanges().take(1).subscribe(start => {
        this.afDatabase.list<Expense>(`/expenses/${coupleKey}`, ref => ref.orderByChild('dateTime').limitToLast(1))
        .valueChanges().take(1).subscribe(end => {
          resolve({ start: new Date(start[0].dateTime).getFullYear(), end: new Date(end[0].dateTime).getFullYear() });
        });
      });
    })
    
  }
}
