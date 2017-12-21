import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileStatsDisplay } from '../../enums/enums';
import { Expense } from '../../models/models';

@Component({
  selector: 'mobile-switch-bar',
  templateUrl: 'mobile-switch-bar.html'
})
export class MobileSwitchBarComponent {
  @Input() firstUser;
  @Input() secondUser;
  @Input() select = MobileStatsDisplay.Integrate;
  @Input() expenses: Expense[] = [];
  @Output('switchMobileSelect') switch = new EventEmitter<string>();

  constructor() {
  }
  switchMobileSelect(select: MobileStatsDisplay) {
    if (this.select !== select) {
      this.switch.emit(select);
    }
  }

}
