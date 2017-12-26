import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { Couple, User } from '../../models/models';
import { CoupleProvider, UserProvider } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { EditExpensePage } from '../edit-expense/edit-expense';
import { WiplePayPage } from '../wiple-pay/wiple-pay';

@Component({
  selector: 'page-display-expense',
  templateUrl: 'display-expense.html',
})
export class DisplayExpensePage {
  ios = false;
  exp;
  cp: Couple;
  coupleKey: string;
  firstUser: Observable<User>;
  secondUser: Observable<User>;

  constructor(
    private couple: CoupleProvider,
    private navCtrl: NavController,
    private navParams: NavParams,
    plt: Platform,
    private user: UserProvider,
    private viewCtrl: ViewController
  ) {
    this.ios = plt.is('ios');
    this.exp = this.navParams.get('expense');
  }

  ionViewDidLoad() {
    this.getData();  
  }

  async getData() {
    this.cp = await this.couple.getCouple();
    this.coupleKey = await this.couple.getCoupleKey();
    this.firstUser = this.user.getUser(this.cp.first);
    this.secondUser = this.user.getUser(this.cp.second);  
  }

  remove() {

  }

  edit() {
    if (this.exp.payType === 'wiple') {
      this.navCtrl.push(WiplePayPage, { coupleKey: this.coupleKey, expense: this.exp });
    } else {
      this.navCtrl.push(EditExpensePage, { coupleKey: this.coupleKey, expense: this.exp });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
