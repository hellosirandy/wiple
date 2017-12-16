import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';
import { SignupPage } from '../signup/signup';
import { CheckPage } from '../check/check';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  submitTried: boolean = false;

  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.submitTried = true;
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email').value;
      const password = this.signinForm.get('password').value;
      this.user.signinWithEmail(email, password).then(_ => {
        this.navCtrl.push(CheckPage, {}, { animate: true });
      }).catch(err => {
        this.errorMessage = err.message;
      });
    }
  }

  signinWithFacebook() {
    this.user.signinWithFacebook().then(_ => {
      this.navCtrl.push(CheckPage, {}, { animate: true });
    });
  }

  goSignup() {
    this.navCtrl.push(SignupPage);
  }

}
