import { AfterViewChecked, Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Expense, Particle, Piece } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
import { TimeInterval } from '../../enums/enums';

@Component({
  selector: 'integrate-stats',
  templateUrl: 'integrate-stats.html'
})
export class IntegrateStatsComponent implements AfterViewChecked, OnChanges {
  @ViewChildren('expenseList') expenseList : QueryList<ElementRef>;
  @Input() expenses: Expense;
  @Input() timeInterval: TimeInterval;
  pie: Piece[]=[];
  pile: Particle[];
  mobile: boolean = false;
  expenseListHeights: number[];
  selectedList: number=-1;

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

  ngAfterViewChecked() {
    this.expenseListHeights = this.expenseList.toArray().map(ele => {
      return ele.nativeElement.scrollHeight;
    });
  }

  handleCategoryClick(index: number) {
    this.selectedList === index ? this.selectedList = -1 : this.selectedList = index;
  }

}
