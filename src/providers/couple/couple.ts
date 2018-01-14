import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Couple } from '../../models/models';

@Injectable()
export class CoupleProvider {

  constructor(
    private afDatabase: AngularFireDatabase,
    private events: Events,
    private storage: Storage
  ) {
  }

  async setCouple(coupleKey: string) {
    if (coupleKey) {
      await this.storage.set('coupleKey', coupleKey);
    } else {
      await this.storage.remove('coupleKey');
    }
    this.events.publish('couple:setcouple');
  }

  getCoupleKey() {
    return this.storage.get('coupleKey');
  }

  getCouple(): Promise<Couple> {
    return new Promise((resolve, reject) => {
      this.storage.get('coupleKey').then(coupleKey => {
        this.afDatabase.object<Couple>(`/couples/${coupleKey}`).valueChanges().take(1).subscribe(cp => {
          resolve(cp);
        });
      });
    });
  }

  async breakup() {
    const coupleKey = await this.getCoupleKey();
    await this.afDatabase.object(`/couples/${coupleKey}`).remove();
    await this.afDatabase.object(`/expenses/${coupleKey}`).remove();
  }

}
