import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Expense, Particle, Piece } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
import { TimeInterval } from '../../enums/enums';

@Component({
  selector: 'integrate-stats',
  templateUrl: 'integrate-stats.html'
})
export class IntegrateStatsComponent implements OnChanges {
  @Input() expenses: Expense;
  @Input() timeInterval: TimeInterval;
  pie: Piece[]=[];
  pile: Particle[];
  mobile: boolean = false;

  constructor(
    private expense: ExpenseProvider,
    plt: Platform,
  ) {
    this.mobile = plt.is('mobile');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue && changes.expenses.currentValue !== changes.expenses.previousValue) {
      const compileStats = this.expense.generateStats(changes.expenses.currentValue);
      this.pie = compileStats.pie;
      this.pile = compileStats.pile;
    }
  }

}
