import { AfterContentChecked, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Expense, Particle, Piece } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
import { TimeInterval } from '../../enums/enums';
import { DisplayExpensePage } from '../../pages/display-expense/display-expense';

@Component({
  selector: 'integrate-stats',
  templateUrl: 'integrate-stats.html'
})
export class IntegrateStatsComponent implements AfterContentChecked, OnChanges {
  @ViewChildren('expenseList') expenseList : QueryList<ElementRef>;
  @Input() expenses: Expense;
  @Input() timeInterval: TimeInterval;
  @Output() scrollToCategory = new EventEmitter<ElementRef>();
  pie: Piece[]=[];
  pile: Particle[];
  mobile: boolean = false;
  expenseListHeights: number[];
  selectedList: number=-1;

  constructor(
    private expense: ExpenseProvider,
    private modalCtrl: ModalController,
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

  ngAfterContentChecked() {
    this.expenseListHeights = this.expenseList ? this.expenseList.toArray().map(ele => {
      return ele.nativeElement.scrollHeight;
    }) : [];
  }

  handleCategoryClick(index: number) {
    if (this.selectedList === index) {
      this.selectedList = -1;
    } else {
      this.selectedList = index;
      this.scrollToCategory.emit(this.expenseList.toArray()[index]);
    }
  }

  handleExpenseClick(expense) {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: expense });
    modal.present();
  }

}
