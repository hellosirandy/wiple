import { NgModule } from '@angular/core';
import { ProfilePicPipe } from './profile-pic/profile-pic';
import { DatePickerOptionPipe } from './date-picker-option/date-picker-option';
import { TotalExpensePipe } from './total-expense/total-expense';
import { PieChartOptionPipe } from './pie-chart-option/pie-chart-option';
import { ExpenseAmountPipe } from './expense-amount/expense-amount';
import { BarChartOptionPipe } from './bar-chart-option/bar-chart-option';
import { FormatTimePipe } from './format-time/format-time';
import { DebtPipe } from './debt/debt';
import { ExtractExpensePipe } from './extract-expense/extract-expense';
import { TotalDebtsPipe } from './total-debts/total-debts';
import { SpecialExpensePipe } from './special-expense/special-expense';
import { YearRangePipe } from './year-range/year-range';
@NgModule({
	declarations: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe,
    PieChartOptionPipe,
    ExpenseAmountPipe,
    BarChartOptionPipe,
    FormatTimePipe,
    DebtPipe,
    ExtractExpensePipe,
    TotalDebtsPipe,
    SpecialExpensePipe,
    YearRangePipe],
	imports: [],
	exports: [
    ProfilePicPipe,
    DatePickerOptionPipe,
    TotalExpensePipe,
    PieChartOptionPipe,
    ExpenseAmountPipe,
    BarChartOptionPipe,
    FormatTimePipe,
    DebtPipe,
    ExtractExpensePipe,
    TotalDebtsPipe,
    SpecialExpensePipe,
    YearRangePipe]
})
export class PipesModule {}
