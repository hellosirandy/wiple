import { Component } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { CoupleProvider, UserProvider } from '../../providers/providers';
import { Couple } from '../../models/models';
import { ProfilePopoverPage } from '../profile-popover/profile-popover';

@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html',
})
export class MainAppPage {
  mobile: boolean=false;
  cp: Couple;

  constructor(
    public couple: CoupleProvider,
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
    })
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(ProfilePopoverPage);
    popover.present({
      ev: event
    });
  }

}
