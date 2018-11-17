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
import {ShoppingPage} from '../pages/shopping/shopping';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './firebase.credentials';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth'

import { PlatilloService } from '../services/platillo/platillo.service';
import { FavoritoService } from '../services/favorito/favorito.service';
import { searchbarService } from '../services/searchbar/searchbar.service';

//Multimedia
import {FileChooser} from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';


import { LoginService } from '../services/login/login.service';
import { CompraService } from '../services/compra/compra.service';
import {adminService} from '../services/adminService/admin.service';
import { PerfilService } from '../services/perfil/perfil.service';
import { RestauranteService } from '../services/restaurante/restaurante.service';
<<<<<<< HEAD
import { ShoppingHistoryPage } from '../pages/shopping-history/shopping-history';

=======
import { ShoppingService } from '../services/shopping/shopping.service';
import { ItemService } from '../services/item/item.service';
>>>>>>> a9ffb9e0012c715e7abe7453e61f9a2269fccbe7

@NgModule({
  declarations: [
    MyApp,
    AdminHomePage,
    AdminLocalPage,
    AdminComprasPage,
    AdminPlatillosPage,
    AdminBandejaPage,
    UserPrincipalPage,
    UserFavoritosPage,
    UserHistorialComprasPage,
    ProductoPage,
    CompraPage,
    RegistroPage,
    LoginPage,
    TabsPage,
    ListaPage,
    SeeRestaurantPage,
    RegistroRestaurantPage,
    ShoppingPage,
    ShoppingHistoryPage
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
    UserFavoritosPage,
    UserHistorialComprasPage,
    ProductoPage,
    CompraPage,
    RegistroPage,
    LoginPage,
    TabsPage,
    ListaPage,
    SeeRestaurantPage,
    RegistroRestaurantPage,
    ShoppingPage,
    ShoppingHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,File,FileChooser,FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlatilloService,
    FavoritoService,
    LoginService,
    CompraService,
    searchbarService,
    LoginService,
    adminService,
    PerfilService,
    RestauranteService,
<<<<<<< HEAD


=======
    ShoppingService,
    ItemService
>>>>>>> a9ffb9e0012c715e7abe7453e61f9a2269fccbe7
  ]
})
export class AppModule {}
