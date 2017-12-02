import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { Invitation } from '../../models/invitation';
import { Couple } from '../../models/couple';

@Injectable()
export class ApiProvider {

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFireDatabase,
    public plt: Platform,
    public storage: Storage,
  ) {}

  getAuthState() {
    return this.auth.authState;
  }

  getOrCreateUser(user):Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.database.list('/users', ref => ref.orderByChild('uid').equalTo(user.uid)).snapshotChanges().subscribe(users => {
        if (users.length > 0) {
          this.storage.set('userKey', users[0].key).then(() => {
            resolve(users[0].payload.val());
          })
        } else {
          const ref = this.database.list('/users').push(user)
          ref.then(() => {
            this.storage.set('userKey', ref.key).then(() => {
              resolve(user);
            })
          });
        }
        subscription.unsubscribe();
      });
    })
  }

  getUser(userKey) {
    return this.database.object(`/users/${userKey}`).snapshotChanges().map(change => {
      return {key: change.payload.key, ...change.payload.val()}
    });
  }

  signout() {
    return this.auth.auth.signOut();
  }

  signinWithEmail(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signupWithEmail(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signinWithFacebook() {
    if (this.plt.is('mobile')) {
      return this.auth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider());
    } else {
      return this.auth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }
  }

  getPartner(partnerKey: string) {
    return this.database.object(`/users/${partnerKey}`).valueChanges();
  }

  getInvitations(userKey: string, type:'inviter'|'invitee') {
    return this.database.list('/invitations', ref => ref.orderByChild(type).equalTo(userKey)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  searchUserByEmail(email: string) {
    return this.database.list('/users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().map(users => users[0]);
  }

  searchUserByKey(userKey: string) {
    return this.database.object(`/users/${userKey}`).snapshotChanges();
  }

  checkSingle(userKey: string) {
    return this.database.object(`/users/${userKey}/partner`).valueChanges();
  }

  sendInvitation(inviter: string, invitee: string) {
    const inv = new Invitation(inviter, invitee);
    return this.database.list('/invitations').push(inv);
  }

  removeInvitation(invKey: string) {
    const ref = this.database.list('/invitations');
    return ref.remove(invKey);
  }

  acceptInvitation(first: string, second: string) {
    const couple = this.database.list('/couples').push(new Couple(first, second));
    return couple.then(_ => {
      return this.database.object(`/users/${first}`).update({couple: couple.key})
    }).then(_ => {
      return this.database.object(`/users/${second}`).update({couple: couple.key});
    });
  }

  breakup(first: string, second: string) {
    return this.database.object(`/users/${first}/partner`).remove().then(_ => {
      return this.database.object(`/users/${second}/partner`).remove();
    });
  }

  getCouple(coupleKey) {
    return this.database.object(`/couples/${coupleKey}`).valueChanges();
  }
}
