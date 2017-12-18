import { AfterViewInit, Component, OnInit, animate, state, style, trigger, transition } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategory } from '../../enums/enums';

@Component({
  selector: 'edit-expense-phase-one',
  templateUrl: 'edit-expense-phase-one.html',
  animations: [
    trigger('phaseState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('next', style({
        opacity: 0,
        transform: 'translateY(300px)'
      })),
      transition('hidden => visible', [
        animate(1000)
      ]),
      transition('visible => next', [
        animate(200)
      ])
    ])
  ]
})
export class EditExpensePhaseOneComponent implements AfterViewInit, OnInit {
  datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear()+1,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0,
  };
  oneForm: FormGroup;
  categories: string[] = [];
  state = 'hidden';
  submitTried = false;
  constructor() {
    
  }

  ngOnInit() {
    this.oneForm = new FormGroup({
      'date': new FormControl(new Date(), Validators.required),
      'category': new FormControl(ExpenseCategory.Else, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
    this.categories = Object.keys(ExpenseCategory).map(k => ExpenseCategory[k]);
  }

  ngAfterViewInit() {
    this.state = 'visible';
  }

  handleCategoryClick(category) {
    this.oneForm.get('category').setValue(category);
  }

  onSubmit() {
    this.submitTried = true;
    this.state = 'next';
  }

}
