import { NgModule } from '@angular/core';
import { ProfilePicPipe } from './profile-pic/profile-pic';
import { DatePickerOptionPipe } from './date-picker-option/date-picker-option';
import { TotalExpensePipe } from './total-expense/total-expense';
import { PieChartOptionPipe } from './pie-chart-option/pie-chart-option';
import { ExpenseAmountPipe } from './expense-amount/expense-amount';
@NgModule({
	declarations: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe,
    PieChartOptionPipe,
    ExpenseAmountPipe],
	imports: [],
	exports: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe,
    PieChartOptionPipe,
    ExpenseAmountPipe]
})
export class PipesModule {}
