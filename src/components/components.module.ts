import { NgModule } from '@angular/core';
import { EditExpensePhaseOneComponent } from './edit-expense-phase-one/edit-expense-phase-one';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryIconComponent } from './category-icon/category-icon';
import { IonicModule } from 'ionic-angular/module';
import { EditExpensePhaseTwoComponent } from './edit-expense-phase-two/edit-expense-phase-two';
import { PipesModule } from '../pipes/pipes.module';
import { EditExpensePhaseThreeComponent } from './edit-expense-phase-three/edit-expense-phase-three';
import { PcDatetimeComponent } from './pc-datetime/pc-datetime';
import { MobileDatetimeComponent } from './mobile-datetime/mobile-datetime';
import { IntegrateStatsComponent } from './integrate-stats/integrate-stats';
import { ExpenseItemComponent } from './expense-item/expense-item';
@NgModule({
	declarations: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    PcDatetimeComponent,
    MobileDatetimeComponent,
    IntegrateStatsComponent,
    ExpenseItemComponent],
	imports: [
    IonicModule,
		NgDatepickerModule,
    ReactiveFormsModule,
    PipesModule
	],
	exports: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    PcDatetimeComponent,
    MobileDatetimeComponent,
    IntegrateStatsComponent,
    ExpenseItemComponent]
})
export class ComponentsModule {}
