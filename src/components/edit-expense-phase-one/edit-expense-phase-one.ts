import { Component, EventEmitter, Input, OnInit, Output,
  animate, state, style, trigger, transition
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategory, PhaseState } from '../../enums/enums';
import { Expense } from '../../models/models';

@Component({
  selector: 'edit-expense-phase-one',
  templateUrl: 'edit-expense-phase-one.html',
  animations: [
    trigger('phaseState', [
      state(PhaseState.Visible, style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state(PhaseState.Continue, style({
        opacity: 0,
        transform: 'translateX(-300px)'
      })),
      state(PhaseState.Back, style({
        opacity: 0,
        transform: 'translateX(300px)'
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(600)
      ]),
      transition(`${PhaseState.Visible} => ${PhaseState.Continue}`, [
        animate('300ms ease')
      ]),
      transition(`${PhaseState.Visible} => ${PhaseState.Back}`, [
        animate('300ms ease')
      ])
    ])
  ]
})
export class EditExpensePhaseOneComponent implements OnInit {
  @Input() exp: Expense;
  @Output() continue = new EventEmitter<any>();
  firstForm: FormGroup;
  categories: string[] = [];
  state = PhaseState.Visible;
  submitTried = false;
  constructor() {
    
  }

  ngOnInit() {
    this.firstForm = new FormGroup({
      'dateTime': new FormControl(this.exp.dateTime, Validators.required),
      'category': new FormControl(this.exp.category, Validators.required),
      'description': new FormControl(this.exp.description, Validators.required)
    });
    this.categories = Object.keys(ExpenseCategory).map(k => ExpenseCategory[k]);
  }

  handleCategoryClick(category) {
    this.firstForm.get('category').setValue(category);
  }

  onSubmit() {
    this.submitTried = true;
    if (this.firstForm.valid) {
      this.state = PhaseState.Continue;
      setTimeout(() => {
        this.continue.emit(this.firstForm.getRawValue());
      }, 300);
    }
    
  }

}
