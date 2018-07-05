import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserServiceProvider {

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFireDatabase,
  ) {

  }

  getAuthState() {
    return this.auth.authState;
  }

}
