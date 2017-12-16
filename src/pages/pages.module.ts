import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPage } from './check/check';
import { LandingPage } from './landing/landing';
import { SigninPage } from './signin/signin';
import { SignupPage } from './signup/signup';
import { MainAppPage } from './main-app/main-app';
import { ConnectPage } from './connect/connect';
import { ProfilePopoverPage } from './profile-popover/profile-popover';

@NgModule({
	declarations: [
		CheckPage,
		LandingPage,
		SigninPage,
		MainAppPage,
		ConnectPage,
		SignupPage,
		ProfilePopoverPage
	],
	imports: [
		IonicPageModule.forChild(CheckPage),
		IonicPageModule.forChild(LandingPage),
		IonicPageModule.forChild(SigninPage),
		IonicPageModule.forChild(MainAppPage),
		IonicPageModule.forChild(ConnectPage),
		IonicPageModule.forChild(SignupPage),
		IonicPageModule.forChild(ProfilePopoverPage),
	],
	exports: [
		CheckPage,
		LandingPage,
		SigninPage,
		MainAppPage,
		ConnectPage,
		SignupPage,
		ProfilePopoverPage
	],
	providers: [
		
	]
})
export class PagesModule {}
