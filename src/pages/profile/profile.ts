import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { User } from '../../models/models';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  ios: boolean = false;
  currentUser: Observable<User>;
  currentUserKey: string;
  currentUserSub: Subscription;
  profileForm: FormGroup;
  submitTried: boolean = false;

  constructor(
    plt: Platform,
    private user: UserProvider,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
  ) {
    this.ios = plt.is('ios');
  }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillLeave() {
    this.currentUserSub.unsubscribe();
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'profilePic': new FormControl(null),
      'displayName': new FormControl(null, Validators.required)
    });
  }

  async getData() {
    this.currentUserKey = await this.user.getUserKey();
    this.currentUser = this.user.getUser(this.currentUserKey);
    this.currentUserSub = this.currentUser.subscribe(user => {
      this.profileForm.get('displayName').setValue(user.displayName);
      this.profileForm.get('profilePic').setValue(user.photoURL);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.submitTried = true;
    if (this.profileForm.valid) {
      const updates = {
        photoURL: this.profileForm.get('profilePic').value,
        displayName: this.profileForm.get('displayName').value
      }
      this.updateProfile(updates);
    }
  }

  async updateProfile(updates: any) {
    await this.user.updateProfile(this.currentUserKey, updates);
    const toast = this.toastCtrl.create({
      message: 'Profile updated',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
