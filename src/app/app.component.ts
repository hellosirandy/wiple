import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CheckPage } from '../pages/check/check';
import { CoupleProvider, UserProvider } from '../providers/providers';
import { DebtsPage } from '../pages/debts/debts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = CheckPage;
  coupleKey: string;

  constructor(
    private couple: CoupleProvider,
    platform: Platform, 
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
    this.coupleKey = await this.couple.getCoupleKey();
  }

  handleSignoutClick() {
    this.user.signOut();
  }

  handleDebtsClick() {
    this.nav.push(DebtsPage, { coupleKey: this.coupleKey });
  }
}

