import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/Storage';

import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';

import { NgDatepickerModule } from 'ng2-datepicker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseConfig } from '../environments/environments';
import { UserProvider } from '../providers/user/user';
import { ConnectionProvider } from '../providers/connection/connection';
import { CoupleProvider } from '../providers/couple/couple';
import { ComponentsModule } from '../components/components.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig, 'wiple'),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    PagesModule,
    NgDatepickerModule,
    ComponentsModule,
    BrowserAnimationsModule
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
    CoupleProvider
  ]
})
export class AppModule {}
