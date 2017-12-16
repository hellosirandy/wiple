import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  submitTried: boolean = false;

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
      console.log(this.signinForm);
      
    }
  }

  async signinWithFacebook() {
    await this.user.signinWithFacebook();
  }

}
