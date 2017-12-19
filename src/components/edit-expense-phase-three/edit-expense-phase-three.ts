import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren,
  animate, state, style, transition, trigger } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, User } from '../../models/models';
import { PayType, PhaseState } from '../../enums/enums';

@Component({
  selector: 'edit-expense-phase-three',
  templateUrl: 'edit-expense-phase-three.html',
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
export class EditExpensePhaseThreeComponent implements AfterViewInit, OnInit {
  @ViewChildren('whoFirstSection') sections: QueryList<ElementRef>;
  @ViewChild('customInput') customInput: ElementRef;
  @Input() firstUser: User;
  @Input() secondUser: User;
  @Input() exp: Expense;
  @Output() continue = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();
  totalAmount = 0;
  thirdForm: FormGroup;
  whoFirstHeight = 0;
  customInputHeight = 0;
  state = PhaseState.Visible;

  constructor() {
    
  }

  ngOnInit() {
    this.totalAmount = this.exp.firstExpense + this.exp.secondExpense;
    if (this.exp.payType === PayType.Allpay && this.exp.firstPaid === 0 && this.exp.secondPaid === 0) {
      this.exp.firstPaid = this.exp.firstExpense;
      this.exp.secondPaid = this.exp.secondExpense;
    }
    const whoTreat = (this.exp.payType === 'treat' && this.exp.secondPaid > 0) ? 'second' : 'first';
    const whoPaidFirst = (this.exp.payType === 'payfirst' && this.exp.secondPaid > 0) ? 'second' : 'first';
    this.thirdForm = new FormGroup({
      'treat': new FormGroup({
        'which': new FormControl(whoTreat, Validators.required)
      }),
      'payfirst': new FormGroup({
        'which': new FormControl(whoPaidFirst, Validators.required)
      }),
      'custom': new FormGroup({
        'first': new FormControl(this.exp.firstPaid ? this.exp.firstPaid : this.exp.firstExpense, Validators.required),
        'second': new FormControl(this.exp.secondPaid ? this.exp.secondPaid : this.exp.secondExpense, Validators.required)
      })
    });
    this.thirdForm.get('custom').valueChanges.subscribe(changes => {
      if (changes.first !== this.exp.firstPaid) {
        this.exp.firstPaid = changes.first;
        this.exp.secondPaid = this.totalAmount - changes.first;
        this.thirdForm.get('custom.second').setValue(this.exp.secondPaid);
      } else if (changes.second !== this.exp.secondPaid) {
        this.exp.firstPaid = this.totalAmount - changes.second;
        this.exp.secondPaid = changes.second;
        this.thirdForm.get('custom.first').setValue(this.exp.firstPaid);
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.whoFirstHeight = this.sections.first.nativeElement.scrollHeight;
      this.customInputHeight = this.customInput.nativeElement.scrollHeight;
    }, 0);
  }

  handleImgClick(formGroupName: string, which: string) {
    this.thirdForm.get(`${formGroupName}.which`).setValue(which);
    this.updateAmount();
  }

  updatePayType(payType) {
    this.exp.payType = payType;
    this.updateAmount();
  }

  updateAmount() {
    if (this.exp.payType === PayType.Allpay) {
      this.exp.firstPaid = this.exp.secondPaid = this.totalAmount / 2;
    } else if (this.exp.payType === PayType.Treat || this.exp.payType === PayType.Payfirst) {
      if (this.thirdForm.get(`${this.exp.payType}.which`).value === 'first') {
        this.exp.firstPaid = this.totalAmount;
        this.exp.secondPaid = 0;
      } else {
        this.exp.firstPaid = 0;
        this.exp.secondPaid = this.totalAmount;
      }
    } else if (this.exp.payType === PayType.Custom) {
      this.exp.firstPaid = Number(this.thirdForm.get('custom.first').value);
      this.exp.secondPaid = Number(this.thirdForm.get('custom.second').value);
    }
  }

  handleBackClick() {
    this.state = PhaseState.Back;
    setTimeout(() => {
      this.back.emit(this.exp);
    }, 300);
  }

  onSubmit() {
    this.continue.emit(this.exp);
  }

}
