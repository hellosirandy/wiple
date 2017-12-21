import { Component, Input,
  animate, state, style, transition, trigger } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Expense } from '../../models/models';
import { PhaseState } from '../../enums/enums';

@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html',
  animations: [
    trigger('expenseState', [
      state(PhaseState.Visible, style({
        opacity: 1,
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(600)
      ])
    ])
  ]
})
export class ExpenseItemComponent {
  @Input('expense') exp: Expense;
  mobile: boolean = false;

  constructor(
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  // handleExpenseClick() {
  //   const modal = this.modalCtrl.create(DisplayExpensePage, { expense: this.exp });
  //   modal.present();
  // }

}
