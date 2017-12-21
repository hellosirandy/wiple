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
import { ChartModule } from 'angular2-highcharts';
import { CategoryItemComponent } from './category-item/category-item';
import { UserStatsComponent } from './user-stats/user-stats';
import { MobileSwitchBarComponent } from './mobile-switch-bar/mobile-switch-bar';

@NgModule({
	declarations: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    PcDatetimeComponent,
    MobileDatetimeComponent,
    IntegrateStatsComponent,
    ExpenseItemComponent,
    CategoryItemComponent,
    UserStatsComponent,
    MobileSwitchBarComponent],
	imports: [
    IonicModule,
		NgDatepickerModule,
    ReactiveFormsModule,
    PipesModule,
    ChartModule
	],
	exports: [EditExpensePhaseOneComponent,
    CategoryIconComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    PcDatetimeComponent,
    MobileDatetimeComponent,
    IntegrateStatsComponent,
    ExpenseItemComponent,
    CategoryItemComponent,
    UserStatsComponent,
    MobileSwitchBarComponent]
})
export class ComponentsModule {}
