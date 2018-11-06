import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';



// Camara
import { Camera} from '@ionic-native/camera';


// Importacion de pages a usar
import {AdminHomePage} from '../pages/admin-home/admin-home';
import { AdminLocalPage } from '../pages/admin-local/admin-local';
import { AdminComprasPage } from '../pages/admin-compras/admin-compras';
import { AdminPlatillosPage } from '../pages/admin-platillos/admin-platillos';
import { AdminBandejaPage } from '../pages/admin-bandeja/admin-bandeja';
import { UserPrincipalPage } from '../pages/user-principal/user-principal';
import { UserCercanosPage } from '../pages/user-cercanos/user-cercanos';
import { UserHistorialComprasPage } from '../pages/user-historial-compras/user-historial-compras';
import { UserFavoritosPage } from '../pages/user-favoritos/user-favoritos';
import { ProductoPage } from '../pages/producto/producto';
import { CompraPage } from '../pages/compra/compra';
import {LoginPage} from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import {  TabsPage } from '../pages/tabs/tabs';
import {  ListaPage } from '../pages/lista/lista';
import { SeeRestaurantPage } from '../pages/see-restaurant/see-restaurant';
import {RegistroRestaurantPage} from '../pages/registro-restaurant/registro-restaurant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './firebase.credentials';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth'

import { PlatilloService } from '../services/platillo/platillo.service';
import { FavoritoService } from '../services/favorito/favorito.service';
import { searchbarService } from '../services/searchbar/searchbar.service';

import { LoginService } from '../services/login/login.service';
import { CompraService } from '../services/compra/compra.service';
import {adminService} from '../services/adminService/admin.service';
import { PerfilService } from '../services/perfil/perfil.service';



@NgModule({
  declarations: [
    MyApp,
    AdminHomePage,
    AdminLocalPage,
    AdminComprasPage,
    AdminPlatillosPage,
    AdminBandejaPage,
    UserPrincipalPage,
    UserCercanosPage,
    UserFavoritosPage,
    UserHistorialComprasPage,
    ProductoPage,
    CompraPage,
    RegistroPage,
    LoginPage,
    TabsPage,
    ListaPage,
    SeeRestaurantPage,
    RegistroRestaurantPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,        // se colocan las paginas importadas a usar en aplicacion
    AdminHomePage,
    AdminLocalPage,
    AdminComprasPage,
    AdminPlatillosPage,
    AdminBandejaPage,
    UserPrincipalPage,
    UserCercanosPage,
    UserFavoritosPage,
    UserHistorialComprasPage,
    ProductoPage,
    CompraPage,
    RegistroPage,
    LoginPage,
    TabsPage,
    ListaPage,
    SeeRestaurantPage,
    RegistroRestaurantPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlatilloService,
    FavoritoService,
    LoginService,
    CompraService,
    searchbarService,
    LoginService,
    adminService,
    PerfilService

  ]
})
export class AppModule {}
