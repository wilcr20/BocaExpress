import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserPrincipalPage } from '../pages/user-principal/user-principal';
import { UserHistorialComprasPage } from '../pages/user-historial-compras/user-historial-compras';
import {  TabsPage} from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = UserPrincipalPage;
  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public menuCtrl: MenuController,
              public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public authService: AngularFireAuth) {


    //habilitar este menu para las demas paginas
    this.menuCtrl.swipeEnable(true, 'main-menu');

    this.pages = [
      { title: 'Historial', component: UserHistorialComprasPage },
    ];

    this.initializeApp();

  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == UserPrincipalPage){

      this.nav.setRoot(UserPrincipalPage);

    } else {

      this.nav.push(page.component);
    }
  }



}
