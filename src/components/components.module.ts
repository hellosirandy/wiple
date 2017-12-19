import { NgModule } from '@angular/core';
import { EditExpensePhaseOneComponent } from './edit-expense-phase-one/edit-expense-phase-one';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryIconComponent } from './category-icon/category-icon';
import { IonicModule } from 'ionic-angular/module';
import { EditExpensePhaseTwoComponent } from './edit-expense-phase-two/edit-expense-phase-two';
import { PipesModule } from '../pipes/pipes.module';
import { EditExpensePhaseThreeComponent } from './edit-expense-phase-three/edit-expense-phase-three';
@NgModule({
	declarations: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent],
	imports: [
    IonicModule,
		NgDatepickerModule,
    ReactiveFormsModule,
    PipesModule
	],
	exports: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent]
})
export class ComponentsModule {}
