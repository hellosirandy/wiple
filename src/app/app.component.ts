import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CheckPage } from '../pages/check/check';
import { CoupleProvider } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CheckPage;
  coupleKey: string;

  constructor(
    couple: CoupleProvider,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
    couple.getCoupleKey().then(coupleKey => {
      this.coupleKey = coupleKey;
    });
  }
}

