import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainAppPage } from './main-app';

@NgModule({
  declarations: [
    MainAppPage,
  ],
  imports: [
    IonicPageModule.forChild(MainAppPage),
  ],
})
export class MainAppPageModule {}
