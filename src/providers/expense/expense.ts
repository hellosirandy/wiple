import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Expense, Particle, Piece } from '../../models/models';
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
          // pile[exp.category] = new Particle(exp.category, amount, [exp]);
        }
      }
    }
    pile = Object.keys(pile).map(key => pile[key]).sort((a, b) => b.total - a.total);
    const pie: Piece[] = this.generatePie(pile);
    return { pie, pile };
  }

  generatePie(pile: Particle[]) {
    return pile.map(p => <Piece> { name: p.category, y: p.total, color: ExpenseCategoryColors[p.category] });
    // return pile.map(p => new Piece(p.category, p.total, ExpenseCategoryColos[p.category]));
  }

  getAmount(expense: Expense, position: 'first' | 'second' | null = null) {
    if (position) {
      return position === 'first' ? expense.firstExpense : expense.secondExpense;
    } else {
      return expense.firstExpense + expense.secondExpense;
    }
  }
}
