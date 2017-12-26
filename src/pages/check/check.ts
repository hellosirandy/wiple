import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CoupleProvider, UserProvider } from '../../providers/providers';
import { LandingPage } from '../landing/landing';
import { MainAppPage } from '../main-app/main-app';

import { User } from '../../models/models';
import { ConnectPage } from '../connect/connect';

@Component({
  selector: 'page-check',
  templateUrl: 'check.html',
})
export class CheckPage {

  constructor(
    public couple: CoupleProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getAuthState().take(1).subscribe(user => {
      if (user) {
        this.setUser(user.toJSON());
      } else {
        this.navCtrl.setRoot(LandingPage);
      }
    });
  }

  async setUser(authUser: any) {
    const user: User = await this.user.setUser(authUser);
    if (user.couple) {
      await this.couple.setCouple(user.couple);
      this.navCtrl.setRoot(MainAppPage);    
    } else {
      this.navCtrl.setRoot(ConnectPage);    
    }
  }

}
