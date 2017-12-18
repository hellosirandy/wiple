import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
@Component({
  selector: 'page-edit-expense',
  templateUrl: 'edit-expense.html',
})
export class EditExpensePage {
  mobile: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  ionViewDidLoad() {
  }

}
