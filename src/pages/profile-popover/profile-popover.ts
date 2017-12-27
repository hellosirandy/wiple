import { Component } from '@angular/core';
import { ModalController, NavController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { CheckPage } from '../check/check';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-profile-popover',
  templateUrl: 'profile-popover.html',
})
export class ProfilePopoverPage {

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController, 
    private user: UserProvider,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
  }

  handleProfileClick() {
    this.viewCtrl.dismiss();
    const modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }

  handleSignoutClick() {
    this.user.signOut().then(() => {
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(CheckPage, {}, { animate: true });
    });
  }

}
