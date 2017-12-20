import { Component } from '@angular/core';

/**
 * Generated class for the ExpenseItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent {

  text: string;

  constructor() {
    console.log('Hello ExpenseItemComponent Component');
    this.text = 'Hello World';
  }

}
