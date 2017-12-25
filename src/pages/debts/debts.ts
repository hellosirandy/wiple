import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ExpenseProvider, CoupleProvider } from '../../providers/providers';
import { DisplayExpensePage } from '../display-expense/display-expense';
import { WiplePayPage } from '../wiple-pay/wiple-pay';

@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage {
  @ViewChild('footer') footer: ElementRef;
  coupleKey: string;
  ios: boolean = false;
  footerTitle: string = 'Total';
  footerHeight: number = 0;
  expenses: Observable<any[]>;
  position: 'first'|'second';

  constructor(
    private couple: CoupleProvider,
    private expense: ExpenseProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    navParams: NavParams,
    plt: Platform,
  ) {
    this.coupleKey = navParams.get('coupleKey');
    this.ios = plt.is('ios');    
  }

  ionViewDidLoad() {
    if (this.footer) {
      this.footerHeight = this.footer.nativeElement.offsetHeight;
    }
    this.expenses = this.expense.getExpense(this.coupleKey);
    this.getData();
  }

  async getData() {
    const couple = await this.couple.getCouple();
    if (this.coupleKey === couple.first) {
      this.position = 'first';
    } else {
      this.position = 'second';
    }
  }

  handleExpenseClick(expense) {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: expense });
    modal.present();
  }

  handleWipleClick() {
    this.navCtrl.push(WiplePayPage, { coupleKey: this.coupleKey });
    
  }
}
