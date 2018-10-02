import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//templates 
import { PrincipalPage } from '../pages/principal/principal'
import { CercanosPage } from '../pages/cercanos/cercanos'
import { HistorialComprasPage} from '../pages/historial-compras/historial-compras'
import { FavoritosPage } from '../pages/favoritos/favoritos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    PrincipalPage,
    HistorialComprasPage,
    FavoritosPage,
    CercanosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,
    HistorialComprasPage,
    FavoritosPage,
    CercanosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
