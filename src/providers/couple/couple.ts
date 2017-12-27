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

  setCouple(coupleKey: string) {
    return this.storage.set('coupleKey', coupleKey).then(_ => {
      this.events.publish('couple:setcouple', coupleKey);
    });
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

  breakup(couple) {
    console.log(couple.key);
    
  }

}
