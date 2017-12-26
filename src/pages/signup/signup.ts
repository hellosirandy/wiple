import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';
import { CheckPage } from '../check/check';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  submitTried: boolean = false;

  errorMessage: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, [Validators.required, this.validatePassword.bind(this)]),
      'displayName': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.submitTried = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const displayName = this.signupForm.get('displayName').value;
    if (this.signupForm.valid) {
      this.user.signupWithEmail(email, password, displayName).then(_ => {
        this.navCtrl.push(CheckPage, {}, { animate: true });
      }).catch(err => {
        this.errorMessage = err.message;
      });
    }
  }

  validatePassword(): { [s: string]: boolean } {
    if (this.signupForm && this.signupForm.get('password').value !== this.signupForm.get('confirmPassword').value) {
      return { 'Different with password': true };
    }
    return null;
  }

}
