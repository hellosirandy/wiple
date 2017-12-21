import { NgModule } from '@angular/core';
import { ProfilePicPipe } from './profile-pic/profile-pic';
import { DatePickerOptionPipe } from './date-picker-option/date-picker-option';
import { TotalExpensePipe } from './total-expense/total-expense';
@NgModule({
	declarations: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe],
	imports: [],
	exports: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe]
})
export class PipesModule {}
