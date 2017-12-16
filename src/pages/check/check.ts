import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { LandingPage } from '../landing/landing';
@Component({
  selector: 'page-check',
  templateUrl: 'check.html',
})
export class CheckPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getAuthState().subscribe(user => {
      if (user) {
        console.log(user.toJSON());
      } else {
        this.navCtrl.setRoot(LandingPage);
      }
    });
  }

  signOut() {
    this.user.signOut();
  }

}
