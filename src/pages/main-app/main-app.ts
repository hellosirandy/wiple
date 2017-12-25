import { Component } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { CoupleProvider, UserProvider, ExpenseProvider } from '../../providers/providers';
import { Couple, Expense, User } from '../../models/models';
import { ProfilePopoverPage } from '../profile-popover/profile-popover';
import { EditExpensePage } from '../edit-expense/edit-expense';
import { TimeInterval, MobileStatsDisplay } from '../../enums/enums';
import { Observable } from 'rxjs/Observable';
import { DebtsPage } from '../debts/debts';

@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html',
})
export class MainAppPage {
  mobile: boolean=false;
  cp: Couple;
  coupleKey: string;
  dateTime = Date.now();
  timeInterval = TimeInterval.Day;
  expenses: Observable<Expense[]>;
  firstUser: Observable<User>;
  secondUser: Observable<User>;
  mobileSelect = MobileStatsDisplay.Integrate;

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
    this.getData();
  }

  async getData() {
    this.cp = await this.couple.getCouple();
    this.firstUser = this.user.getUser(this.cp.first);
    this.secondUser = this.user.getUser(this.cp.second);
    this.coupleKey = await this.couple.getCoupleKey();
    this.changeTimeInterval({ dateTime: this.dateTime, timeInterval: this.timeInterval });
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

  handleDebtsClick() {
    this.navCtrl.push(DebtsPage, {  coupleKey: this.coupleKey });
  }

}
