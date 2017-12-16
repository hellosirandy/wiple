import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { CheckPage } from '../check/check';

@Component({
  selector: 'page-profile-popover',
  templateUrl: 'profile-popover.html',
})
export class ProfilePopoverPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
  }

  handleProfileClick() {
    // this.navCtrl.push(ProfilePage);
  }

  handleSignoutClick() {
    this.user.signOut().then(() => {
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(CheckPage, {}, { animate: true });
    });
  }

}
