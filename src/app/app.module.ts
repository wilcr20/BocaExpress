import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Importacion de pages a usar
import { HomePage } from '../pages/home/home';
import {UserGatePage} from '../pages/user-gate/user-gate';
import {AdminHomePage} from '../pages/admin-home/admin-home';
import { AdminLocalPage } from '../pages/admin-local/admin-local';
import { AdminComprasPage } from '../pages/admin-compras/admin-compras';
import { AdminPlatillosPage } from '../pages/admin-platillos/admin-platillos';
import { AdminBandejaPage } from '../pages/admin-bandeja/admin-bandeja';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserGatePage,   // se colocan las paginas importadas a usar en aplicacion
    AdminHomePage,
    AdminLocalPage,
    AdminComprasPage,
    AdminPlatillosPage,
    AdminBandejaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,          // se colocan las paginas importadas a usar en aplicacion
    UserGatePage,
    AdminHomePage,
    AdminLocalPage,
    AdminComprasPage,
    AdminPlatillosPage,
    AdminBandejaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
