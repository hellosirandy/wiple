import { Component, Input,
  animate, state, style, transition, trigger } from '@angular/core';
import { Platform } from 'ionic-angular';
import { PhaseState } from '../../enums/enums';

@Component({
  selector: 'category-item',
  templateUrl: 'category-item.html',
  animations: [
    trigger('categoryState', [
      state(PhaseState.Visible, style({
        opacity: 1,
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(600)
      ])
    ])
  ]
})
export class CategoryItemComponent {
  @Input() category: string;
  @Input() amount: number;
  mobile: boolean = false;
  constructor(
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

}
