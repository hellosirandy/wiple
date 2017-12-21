import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ExpenseProvider } from '../../providers/providers';
import { Particle, Piece, Expense } from '../../models/models';

@Component({
  selector: 'user-stats',
  templateUrl: 'user-stats.html'
})
export class UserStatsComponent implements OnChanges {
  @Input() expenses: Expense[];
  @Input() position: 'first' | 'second';
  pie: Piece[] = [];
  pile: Particle[];

  constructor(
    private expense: ExpenseProvider
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) ||
      (changes.position && changes.position.currentValue !== changes.position.previousValue)) {
      const expenses = (changes.expenses ? changes.expenses.currentValue : this.expenses) || [];
      const position = changes.position ? changes.position.currentValue : this.position;
      const compileStats = this.expense.generateStats(expenses, position);
      this.pie = compileStats.pie;
      this.pile = compileStats.pile;
    }
  }

}
