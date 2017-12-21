import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../models/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public plt: Platform,
    public storage: Storage,
  ) {
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  getUserKey() {
    return this.storage.get('userKey');
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  signinWithFacebook() {
    if (this.plt.is('mobile')) {
      return this.afAuth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider());
    } else {
      return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }
  }

  signinWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupWithEmail(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      return user.updateProfile({displayName: displayName});
    });
  }

  setUser(authUser: any):Promise<User> {
    return new Promise((resolve, reject) => {
      this.afDatabase.object(`/users/${authUser.uid}`).valueChanges().take(1).subscribe((user: User) => {
        if (user) {
          this.storage.set('userKey', authUser.uid).then(_ => {
            resolve(<User>user);
          });
        } else {
          const newUser: User = { 
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            providerData: authUser.providerData[0],
          }
          this.afDatabase.object(`/users/${authUser.uid}`).set(newUser).then(_ => {
            return this.storage.set('userKey', authUser.uid);
          }).then(_ => {
            resolve(<User>newUser);
          })
        }
      })
    });
  }

  searchUserByEmail(email: string) {
    return this.afDatabase.list(`/users`, ref => ref.orderByChild('email').equalTo(email))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))[0];
      }).take(1);
  }

  searchUserByKey(userKey: string) {
    return this.afDatabase.object(`/users/${userKey}`).snapshotChanges().map(change => {
      return {key: change.payload.key, ...change.payload.val()}
    });
  }

  getProfilePic(user: User, size: any=null) {
    if (user) {
      if (user.photoURL) {
        if (size === 'large') {
          if (user.providerData && user.providerData.providerId === 'facebook.com') {
            return `https://graph.facebook.com/${user.providerData.uid}/picture?type=large`;
          }
        } else if (typeof size === 'number') {
          return `https://graph.facebook.com/${user.providerData.uid}/picture?width=${size}`;
        }
        return user.photoURL;
      } else if (user.gender && user.gender === 'female') {
        return '/assets/imgs/girl.svg';
      } else {
        return '/assets/imgs/boy.svg';
      }
    } else {
      return '/assets/imgs/boy.svg';
    }
  }

  async getCurrentUser() {
    const userKey = await this.storage.get('userKey');
    return this.afDatabase.object<User>(`/users/${userKey}`).valueChanges();
  }

  getUser(userKey: string): Observable<User> {
    return this.afDatabase.object<User>(`/users/${userKey}`).valueChanges();
  }

  manuallyAddUser() {
    const newUser: User = {
      displayName: '曾勤',
      email: 'jeanzeng123@yahoo.com.tw',
      photoURL: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/14716305_10207194528757545_6502043043758082357_n.jpg?oh=d1a075f6541a0da8b9dce6c602140f01&oe=5AA0E9C0',
      providerData: {
        displayName: '曾勤',
        email: 'jeanzeng123@yahoo.com.tw',
        photoURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/14716305_10207194528757545_6502043043758082357_n.jpg?oh=eae84d00d13cda8333402ac340155fb3&oe=5AC876C0",
        providerId: "facebook.com",
        uid: "10210079018467985"
      }
    }
    return this.afDatabase.object<User>('/users/Iqb6ddch7EcvuC1GFzvDHv7XXg62').set(newUser);
  }

}
