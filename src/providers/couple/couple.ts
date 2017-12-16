import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Couple } from '../../models/models';

@Injectable()
export class CoupleProvider {

  constructor(
    public afDatabase: AngularFireDatabase,
    public storage: Storage
  ) {
  }

  setCouple(coupleKey: string) {
    return this.storage.set('coupleKey', coupleKey);
  }

  getCoupleKey() {
    return this.storage.get('coupleKey');
  }

  async getCouple() {
    const coupleKey = await this.storage.get('coupleKey');
    return this.afDatabase.object<Couple>(`/couples/${coupleKey}`).valueChanges().take(1);
  }

}
