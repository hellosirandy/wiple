import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  backgroundImage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public plt: Platform
  ) {
    this.backgroundImage = 'url(/assets/imgs/cover-' + (plt.isLandscape() ? 'hor' : 'ver') + '.png)';
  }

  ionViewDidLoad() {

  }

  goSignIn() {
    this.navCtrl.push(SigninPage);
  }

}
