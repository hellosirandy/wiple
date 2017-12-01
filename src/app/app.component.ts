import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InitialPage } from '../pages/initial/initial';
import { ProfilePage } from '../pages/profile/profile';
import { DebtsPage } from '../pages/debts/debts';
import { UserProvider } from '../providers/user/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = InitialPage;
  partnerKey: string;

  constructor(
    platform: Platform, 
    public user: UserProvider,
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.user.getCurrentUserKey().then(userKey => {
      this.user.getPartner(userKey).subscribe((partnerKey: string) => {
        this.partnerKey = partnerKey;
        console.log(partnerKey);
        
      });
    });
  }

  handleProfileClick() {
    this.nav.push(ProfilePage);
  }

  handleDebtsClick() {
    this.nav.push(DebtsPage);
  }

  handleSignoutClick() {
    this.user.signout().then(_ => {
      this.nav.setRoot(InitialPage, {}, {animate: true});
    })
  }
}

