import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPage } from './check/check';
import { LandingPage } from './landing/landing';
import { SigninPage } from './signin/signin';
import { SignupPage } from './signup/signup';
import { MainAppPage } from './main-app/main-app';
import { ConnectPage } from './connect/connect';
import { ProfilePopoverPage } from './profile-popover/profile-popover';
import { EditExpensePage } from './edit-expense/edit-expense';
import { ComponentsModule } from '../components/components.module';
import { NgDatepickerModule } from 'ng2-datepicker';
import { PipesModule } from '../pipes/pipes.module';
import { DisplayExpensePage } from './display-expense/display-expense';
import { WiplePayPage } from './wiple-pay/wiple-pay';
import { DebtsPage } from './debts/debts';

@NgModule({
	declarations: [
		CheckPage,
		LandingPage,
		SigninPage,
		MainAppPage,
		ConnectPage,
		SignupPage,
		ProfilePopoverPage,
		EditExpensePage, 
		DisplayExpensePage,
		DebtsPage,
		WiplePayPage,
	],
	imports: [
		IonicPageModule.forChild(CheckPage),
		IonicPageModule.forChild(LandingPage),
		IonicPageModule.forChild(SigninPage),
		IonicPageModule.forChild(MainAppPage),
		IonicPageModule.forChild(ConnectPage),
		IonicPageModule.forChild(SignupPage),
		IonicPageModule.forChild(ProfilePopoverPage),
		IonicPageModule.forChild(EditExpensePage),
		IonicPageModule.forChild(DisplayExpensePage),
		IonicPageModule.forChild(DebtsPage),
		IonicPageModule.forChild(WiplePayPage),
		ComponentsModule,
		NgDatepickerModule,
		PipesModule
	],
	exports: [
		CheckPage,
		LandingPage,
		SigninPage,
		MainAppPage,
		ConnectPage,
		SignupPage,
		ProfilePopoverPage,
		EditExpensePage,
		DisplayExpensePage,
		DebtsPage,
		WiplePayPage
	],
	providers: [
		
	]
})
export class PagesModule {}
