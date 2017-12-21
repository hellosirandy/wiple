import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
  animate, state, style, transition, trigger } from '@angular/core';
import { PhaseState } from '../../enums/enums';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, Expense } from '../../models/models';

@Component({
  selector: 'edit-expense-phase-two',
  templateUrl: 'edit-expense-phase-two.html',
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
export class EditExpensePhaseTwoComponent implements AfterViewChecked, OnInit {
  @ViewChild('same') sameDiv: ElementRef;
  @ViewChild('diff') diffDiv: ElementRef;
  @Input() firstUser: User;
  @Input() secondUser: User;
  @Input() exp: Expense;
  @Output() continue = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();
  state = PhaseState.Visible;
  secondForm: FormGroup;
  submitTried = false;
  amountType = '';
  sameDivHeight = 0;
  diffDivHeight = 0;

  constructor() {
    
  }

  ngOnInit() {
    const total = this.exp.firstExpense + this.exp.secondExpense;
    if (total === 0) {
      this.amountType = '';
    } else if (this.exp.firstExpense === this.exp.secondExpense) {
      this.amountType = 'same';
    } else {
      this.amountType = 'diff';
    }
    this.secondForm = new FormGroup({
      'same': new FormGroup({
        'amount': new FormControl(total > 0 ? total : null, Validators.required)
      }),
      'diff': new FormGroup({
        'firstAmount': new FormControl(total > 0 ? this.exp.firstExpense : null, Validators.required),
        'secondAmount': new FormControl(total > 0 ? this.exp.secondExpense : null, Validators.required)
      })
    });
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.sameDivHeight = this.sameDiv.nativeElement.scrollHeight;
      this.diffDivHeight = this.diffDiv.nativeElement.scrollHeight;
    }, 0);
  }
  
  onSubmit() {
    this.submitTried = true;
    if ((this.amountType === 'same' && this.secondForm.get('same').valid)
      || (this.amountType === 'diff' && this.secondForm.get('diff').valid)) {
      this.state = PhaseState.Continue;
      const data = this.saveData();
      setTimeout(() => {
        this.continue.emit(data);
      }, 200);
    }
  }

  handleButtonClick(amountType) {
    this.amountType = amountType;
  }

  handleBackClick() {
    this.state = PhaseState.Back;
    const data = this.saveData();
    setTimeout(() => {
      this.back.emit(data);
    }, 300);
  }

  saveData() {
    let firstExpense = 0, secondExpense = 0;
    if (this.amountType === 'same') {
      firstExpense = secondExpense = Number(this.secondForm.get('same.amount').value) / 2 || 0;
    } else {
      firstExpense = Number(this.secondForm.get('diff.firstAmount').value) || 0;
      secondExpense = Number(this.secondForm.get('diff.secondAmount').value) || 0;
    }
    return { firstExpense, secondExpense };
  }

}
