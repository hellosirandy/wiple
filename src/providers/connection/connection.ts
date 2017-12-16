import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Couple, Invitation } from '../../models/models';
import { Storage } from '@ionic/Storage';

@Injectable()
export class ConnectionProvider {

  constructor(
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
  ) {

  }

  getInvitations(userKey: string, type: 'invitee'|'inviter') {
    return this.afDatabase.list<Invitation>('/invitations', ref=>ref.orderByChild(type).equalTo(userKey)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  sendInvitation(inviter: string, invitee: string) {
    const inv: Invitation = { inviter, invitee };
    return this.afDatabase.list('/invitations').push(inv);
  }

  removeInvitation(invKey: string) {
    return this.afDatabase.object(`/invitations/${invKey}`).remove();
  }

  async acceptInvitation(first: string, second: string) {
    const newCouple: Couple = { first, second };
    const ref = await this.afDatabase.list('/couples').push(newCouple);
    await this.afDatabase.object(`/users/${first}`).update({couple: ref.key});
    await this.afDatabase.object(`/users/${second}`).update({couple: ref.key});
    await this.storage.set('coupleKey', ref.key);
  }

}
