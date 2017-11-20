import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { User } from '../../models/user';
import { Storage } from '@ionic/Storage';

@Injectable()
export class UserProvider {

  constructor(
    public api: ApiProvider,
    private storage: Storage,
  ) {
  }

  signupWithEmail(email:string, password:string, displayName:string) {
    return new Promise((resolve, reject) => {
      this.api.signupWithEmail(email, password).then(user => {
        this.api.getOrCreateUser(new User(user.uid, displayName, user.email)).subscribe(u => {
          this.storage.set('user', u);
          resolve();
        });
      }).catch(err => {
        reject(err);
      });
    })
  }

  signinWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      this.api.signinWithEmail(email, password).then(user => {
        this.api.getOrCreateUser(new User(user.uid, '', user.email)).subscribe(u => {
          this.storage.set('user', u);
          resolve();
        });
      }).catch(err => {
        reject(err);
      });
    })
    
  }

  signinWithFacebook() {
    return new Promise((resolve, reject) => {
      this.api.signinWithFacebook().then(user => {
        this.api.getOrCreateUser(new User(user.user.uid, user.user.displayName, user.user.email, user.user.photoURL)).subscribe(u => {
          this.storage.set('user', u);
          resolve();
        });
      });
    })
  }

  signout() {
    this.api.signout();
    this.storage.remove('user');
  }

}
