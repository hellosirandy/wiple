import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'category-icon',
  templateUrl: 'category-icon.html'
})
export class CategoryIconComponent implements OnChanges {
  @Input() button = false;
  @Input() selected = false;
  @Input() category: string;

  mobile = false;
  imgSrc = '';
  classes: string[] = [];

  constructor(
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.selected && changes.selected.currentValue !== changes.selected.previousValue)
      || (changes.category && changes.category.currentValue !== changes.category.previousValue)) {
      this.classes = this.getClass();
      if (changes.category) {
        this.imgSrc = `/assets/imgs/expense-category/${changes.category.currentValue}.svg`;
      }
    }
  }

  getClass() {
    const classes = [this.category];
    if (this.button) {
      classes.push('button');
      if (this.selected) {
        classes.push('selected');
      }
    } 
    if (this.mobile) {
      classes.push('mobile');
    }
    return classes;
  }

}
