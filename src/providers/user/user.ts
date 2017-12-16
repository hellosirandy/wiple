import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';

@Injectable()
export class UserProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public plt: Platform,
  ) {
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

  signinWithFacebook() {
    if (this.plt.is('mobile')) {
      return this.afAuth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider());
    } else {
      return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }
  }

}
