import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/Storage';

import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';

import { NgDatepickerModule } from 'ng2-datepicker';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseConfig } from '../environments/environments';
import { UserProvider } from '../providers/user/user';
import { ConnectionProvider } from '../providers/connection/connection';
import { CoupleProvider } from '../providers/couple/couple';
import { ComponentsModule } from '../components/components.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from '../pipes/pipes.module';
import { ExpenseProvider } from '../providers/expense/expense';

declare var require: any
export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: 'instant',
          // inputBlurring: false,
        }
      }
    }),
    AngularFireModule.initializeApp(FirebaseConfig, 'wiple'),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    PagesModule,
    NgDatepickerModule,
    ComponentsModule,
    BrowserAnimationsModule,
    PipesModule,
    ChartModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ConnectionProvider,
    CoupleProvider,
    ExpenseProvider,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
  ]
})
export class AppModule {}
