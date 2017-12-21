import { Component } from '@angular/core';

/**
 * Generated class for the UserStatsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-stats',
  templateUrl: 'user-stats.html'
})
export class UserStatsComponent {

  text: string;

  constructor() {
    console.log('Hello UserStatsComponent Component');
    this.text = 'Hello World';
  }

}
