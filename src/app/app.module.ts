import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {ContactsPage} from "../pages/contacts/contacts";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SettingsPage} from "../pages/settings/settings";
import {WeatherProvider} from '../providers/weather/weather';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {Network} from "@ionic-native/network";
import {ToastProvider} from '../providers/toast/toast';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactsPage,
    HomePage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactsPage,
    HomePage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider,
    ToastProvider
  ]
})
export class AppModule {}

