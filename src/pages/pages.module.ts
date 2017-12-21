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
		DisplayExpensePage
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
		DisplayExpensePage
	],
	providers: [
		
	]
})
export class PagesModule {}
