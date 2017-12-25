import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, User } from '../../models/models';
import { ExpenseCategory, PayType } from '../../enums/enums';
import { Observable } from 'rxjs/Observable';
import { ExpenseProvider, CoupleProvider, UserProvider } from '../../providers/providers';

@Component({
  selector: 'page-wiple-pay',
  templateUrl: 'wiple-pay.html',
})
export class WiplePayPage implements OnInit {
  wiplePayForm: FormGroup;
  coupleKey: string;
  wiple: Expense;
  firstUser: Observable<User>;
  secondUser: Observable<User>;
  submitTried: boolean = false;

  constructor(
    private couple: CoupleProvider,
    private expense: ExpenseProvider,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    navParams: NavParams,
    private user: UserProvider,
  ) {
    this.coupleKey = navParams.get('coupleKey');
    const exp = navParams.get('expense');
    if (exp) {
      this.wiple = exp
    } else {
      this.wiple = {
        together: true,
        category: ExpenseCategory.Else,
        description: '',
        dateTime: Date.now(),
        reverseDateTime: -Date.now(),
        firstExpense: 0,
        secondExpense: 0,
        firstPaid: 0,
        secondPaid: 0,
        payType: PayType.Wiple
      }
    }
  }

  ionViewDidLoad() {
    this.getData();
  }

  ngOnInit() {
    const amount = this.wiple.firstPaid + this.wiple.secondPaid;
    const pay = this.wiple.secondPaid > 0 ? 'second' : 'first';
    this.wiplePayForm = new FormGroup({
      'description': new FormControl(this.wiple.description, null),
      'date': new FormControl(this.wiple.dateTime, Validators.required),
      'amount': new FormControl(amount !== 0 ? amount : null, Validators.required),
      'pay': new FormControl(pay, Validators.required)
    });
  }

  async getData() {
    const couple = await this.couple.getCouple();
    this.firstUser = this.user.getUser(couple.first);
    this.secondUser = this.user.getUser(couple.second);
  }

  handleTransitionClick() {
    const item = this.wiplePayForm.get('pay');
    if (item.value === 'first') {
      item.setValue('second');
    } else {
      item.setValue('first');
    }
  }

  onSubmit() {
    this.submitTried = true;
    if (this.wiplePayForm.valid) {
      const loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Wipling...'
      });
      loading.present();
      let description = this.wiplePayForm.get('description').value;
      const amount = Number(this.wiplePayForm.get('amount').value);
      let firstExpense, firstPaid, secondExpense, secondPaid;
      if (this.wiplePayForm.get('pay').value === 'first') {
        firstExpense = 0;
        firstPaid = amount;
        secondExpense = amount;
        secondPaid = 0;
      } else {
        firstExpense = amount;
        firstPaid = 0;
        secondExpense = 0;
        secondPaid = amount;
      }
      description = this.wiplePayForm.get('description').value ? this.wiplePayForm.get('description').value : 'Wiple Pay';
      this.wiple.description = description;
      this.wiple.firstExpense = firstExpense;
      this.wiple.secondExpense = secondExpense;
      this.wiple.firstPaid = firstPaid;
      this.wiple.secondPaid = secondPaid;
      this.wiple.dateTime = Number(this.wiplePayForm.get('date').value);
      (<any>this.expense.saveExpense(this.coupleKey, this.wiple)).then(_ => {
        loading.dismiss();
        this.navCtrl.pop();
      });
    }
  }

}
