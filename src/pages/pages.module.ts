import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPage } from './check/check';
import { LandingPage } from './landing/landing';
import { SigninPage } from './signin/signin';

@NgModule({
	declarations: [
		CheckPage,
		LandingPage,
		SigninPage
	],
	imports: [
		IonicPageModule.forChild(CheckPage),
		IonicPageModule.forChild(LandingPage),
		IonicPageModule.forChild(SigninPage),
	],
	exports: [
		CheckPage,
		LandingPage,
		SigninPage
	],
	providers: [
		
	]
})
export class PagesModule {}
