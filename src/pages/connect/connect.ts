import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { ProfilePopoverPage } from '../profile-popover/profile-popover';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectionProvider, UserProvider } from '../../providers/providers';
import { Invitation } from '../../models/models';
import { CheckPage } from '../check/check';
import { ConnectionStatus } from '../../enums/enums';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage implements OnInit {
  searchForm: FormGroup;
  status = ConnectionStatus.Search;
  submitTried: boolean=false;
  foundUser: any;
  foundProfilePic: string;
  currentUserKey: string;
  sentInvitations: Invitation[]=[];
  receivedInvitations: Invitation[]=[];
  invitations: Invitation[]=[];
  sentInvSub;
  receivedInvSub;
  mobile: boolean = false;

  currentInvitation: Invitation;

  constructor(
    public connection: ConnectionProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform,
    public popoverCtrl: PopoverController,
    public user: UserProvider
  ) {
    this.mobile = plt.is('mobile');
  }

  ionViewDidLoad() {
    this.loadInvitations();
  }

  ionViewWillLeave() {
    this.sentInvSub.unsubscribe();
    this.receivedInvSub.unsubscribe();
  }

  async loadInvitations() {
    this.currentUserKey = await this.user.getUserKey();
    this.user.getCurrentUser().then(obs => {
      obs.subscribe(user => {
        if (user.couple) {
          this.navCtrl.setRoot(CheckPage, {}, { animate: true });
        }
      })
    });
    this.sentInvSub = this.connection.getInvitations(this.currentUserKey, 'inviter').subscribe(invs => {
      this.sentInvitations = invs;
      this.updateInvs();
    });
    this.receivedInvSub = this.connection.getInvitations(this.currentUserKey, 'invitee').subscribe(invs => {
      this.receivedInvitations = invs;
      this.updateInvs();
    });
  }

  updateInvs() {
    this.invitations = this.sentInvitations.concat(this.receivedInvitations);
    this.currentInvitation = this.invitations[0];
    if (this.currentInvitation) {
      const foundUserKey = this.currentInvitation.invitee === this.currentUserKey ? this.currentInvitation.inviter : this.currentInvitation.invitee;
      this.user.searchUserByKey(foundUserKey).subscribe(user => {
        this.foundUser = user;
        this.foundProfilePic = this.user.getProfilePic(user);
        if (this.currentUserKey === this.currentInvitation.invitee) {
          this.status = ConnectionStatus.Received;
        } else {
          this.status = ConnectionStatus.Sent;
        }
      });
    } else {
      this.handleTryOtherClick();
    }
  }
  
  ngOnInit() {
    this.searchForm = new FormGroup({
      'email': new FormControl(null, Validators.email)
    });
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(ProfilePopoverPage);
    popover.present({
      ev: event
    });
  }

  onSubmit() {
    this.submitTried = true;
    if (this.searchForm.valid) {
      const email = this.searchForm.get('email').value;
      this.user.searchUserByEmail(email).subscribe((user: any) => {
        if (user) {
          this.foundUser = user;
          this.foundProfilePic = this.user.getProfilePic(user);
          this.status = ConnectionStatus.Found;
        } else {
          this.status = ConnectionStatus.Notfound;
        }
      });
    }
  }

  handleTryOtherClick() {
    this.foundUser = null;
    this.foundProfilePic = '';
    this.searchForm.reset();
    this.submitTried = false;
    this.status = ConnectionStatus.Search;
  }

  handleSendClick() {
    this.connection.sendInvitation(this.currentUserKey, this.foundUser.key);
  }

  removeInvitation() {
    this.connection.removeInvitation((<any>this.invitations[0]).key);
  }

  acceptInvitation() {
    this.connection.acceptInvitation(this.currentInvitation.inviter, this.currentInvitation.invitee).then(_ => {
      this.removeInvitation();
    });
  }

}
