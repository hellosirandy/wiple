import { NgModule } from '@angular/core';
import { EditExpensePhaseOneComponent } from './edit-expense-phase-one/edit-expense-phase-one';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryIconComponent } from './category-icon/category-icon';
import { IonicModule } from 'ionic-angular/module';
@NgModule({
	declarations: [EditExpensePhaseOneComponent,
    CategoryIconComponent],
	imports: [
    IonicModule,
		NgDatepickerModule,
		ReactiveFormsModule
	],
	exports: [EditExpensePhaseOneComponent,
    CategoryIconComponent]
})
export class ComponentsModule {}
