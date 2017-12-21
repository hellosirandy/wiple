import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { Couple, Expense, User } from '../../models/models';
import { ExpenseCategory, PayType } from '../../enums/enums';
import { CoupleProvider, ExpenseProvider, UserProvider } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-expense',
  templateUrl: 'edit-expense.html',
})
export class EditExpensePage {
  mobile: boolean = false;
  exp: Expense;
  phase = 1;
  firstUser: Observable<User>;
  secondUser: Observable<User>;
  coupleKey: string;

  constructor(
    private couple: CoupleProvider,
    private expense: ExpenseProvider,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform,
    private user: UserProvider
  ) {
    this.mobile = plt.is('mobile');
    this.initExpense();
  }

  ionViewDidLoad() {
    this.getData();
  }

  async getData() {
    this.coupleKey = await this.couple.getCoupleKey();
    const couple: Couple = await this.couple.getCouple();
    this.firstUser = this.user.getUser(couple.first);
    this.secondUser = this.user.getUser(couple.second);
  }

  initExpense() {
    const exp = this.navParams.get('expense');
    if (exp) {
      this.exp = exp;
    } else {
      const newExp: Expense = {
        together: true,
        category: ExpenseCategory.Else,
        description: '',
        date: Date.now(),
        reverseDate: -Date.now(),
        firstExpense: 0,
        secondExpense: 0,
        firstPaid: 0,
        secondPaid: 0,
        payType: PayType.Allpay,
      }
      this.exp = newExp;
    }
  }

  continue(event) {
    Object.assign(this.exp, event);
    this.phase ++;
  }

  back(event) {
    Object.assign(this.exp, event);
    this.phase--;
  }

  saveExpense(event) {
    Object.assign(this.exp, event);
    const loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Saving expense...'
    });
    loading.present();
    (<any>this.expense.saveExpense(this.coupleKey, this.exp)).then(_ => {
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

}
