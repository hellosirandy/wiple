import { Component, Input } from '@angular/core';
import { Expense } from '../../models/models';

@Component({
  selector: 'integrate-stats',
  templateUrl: 'integrate-stats.html'
})
export class IntegrateStatsComponent {
  @Input() expenses: Expense

  constructor() {
  }

}
