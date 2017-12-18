import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'category-icon',
  templateUrl: 'category-icon.html'
})
export class CategoryIconComponent implements OnChanges, OnInit {
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

  ngOnInit() {
    this.imgSrc = `/assets/imgs/expense-category/${this.category}.svg`;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected && changes.selected.currentValue !== changes.selected.previousValue) {
      this.classes = this.getClass();
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
