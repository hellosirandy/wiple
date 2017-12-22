import { Component, Input,
  animate, state, style, transition, trigger } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { PhaseState } from '../../enums/enums';
import { DisplayExpensePage } from '../../pages/display-expense/display-expense';

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
  @Input('expense') exp;
  mobile: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  handleExpenseClick() {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: this.exp });
    modal.present();
  }
}
