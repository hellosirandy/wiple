import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { UserPopoverPage } from '../../pages/user-popover/user-popover';

@Component({
  selector: 'inapp-navbar',
  templateUrl: 'inapp-navbar.html'
})
export class InappNavbarComponent {
  @Input() partner: boolean=false;
  private mobile: boolean=false;
  
  constructor(
    public navCtrl: NavController,
    platform: Platform,
    public popoverCtrl: PopoverController,
  ) {
    this.mobile = platform.is('mobile');
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(UserPopoverPage);
    popover.present({
      ev: event
    });
  }

}
