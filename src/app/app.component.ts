import { Component, ViewChild } from '@angular/core';
import { Events, Platform, ModalController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CheckPage } from '../pages/check/check';
import { UserProvider, CoupleProvider } from '../providers/providers';
import { DebtsPage } from '../pages/debts/debts';
import { LandingPage } from '../pages/landing/landing';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = CheckPage;
  coupleKey: string;

  constructor(
    private couple: CoupleProvider,
    private events: Events,
    platform: Platform, 
    private modalCtrl: ModalController,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private user: UserProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
    this.getData();
  }

  async getData() {
    this.events.subscribe('couple:setcouple', async () => {
      this.coupleKey = await this.couple.getCoupleKey();
      
    });
  }

  handleSignoutClick() {
    this.user.signOut().then(_ => {
      this.nav.setRoot(LandingPage, {}, {animate: true});
    });
  }

  handleDebtsClick() {
    this.nav.push(DebtsPage, { coupleKey: this.coupleKey });
  }

  handleProfileClick() {
    const modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }
}

