import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-check',
  templateUrl: 'check.html',
})
export class CheckPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this.user.getAuthState().subscribe(user => {
      if (user) {
        this.navCtrl.push('')
      }
      
    });
  }

}
