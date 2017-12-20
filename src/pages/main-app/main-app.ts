import { Component } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { CoupleProvider, UserProvider, ExpenseProvider } from '../../providers/providers';
import { Couple, Expense } from '../../models/models';
import { ProfilePopoverPage } from '../profile-popover/profile-popover';
import { EditExpensePage } from '../edit-expense/edit-expense';
import { TimeInterval } from '../../enums/enums';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html',
})
export class MainAppPage {
  mobile: boolean=false;
  cp: Couple;
  coupleKey: string;
  dateTime = Date.now();
  timeInterval = TimeInterval.Month;
  expenses: Observable<Expense[]>;

  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform,
    public popoverCtrl: PopoverController,
    public user: UserProvider,
  ) {
    this.mobile = plt.is('mobile')
  }

  ionViewDidLoad() {
    this.couple.getCouple().then(obs => {
      obs.subscribe(couple => {
        this.cp = couple;
      });
    });
    this.couple.getCoupleKey().then(coupleKey => {
      this.coupleKey = coupleKey;
      this.changeTimeInterval({ dateTime: this.dateTime, timeInterval: this.timeInterval });
    });
  }

  changeTimeInterval(event) {
    this.dateTime = event.dateTime;
    this.timeInterval = event.timeInterval;
    this.expenses = this.expense.getExpense(this.coupleKey, this.timeInterval, this.dateTime);
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(ProfilePopoverPage);
    popover.present({
      ev: event
    });
  }

  handleNewExpenseClick() {
    this.navCtrl.push(EditExpensePage);
  }

}
