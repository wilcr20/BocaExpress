import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserPrincipalPage } from '../user-principal/user-principal';
import { ListaPage } from '../lista/lista';
import { UserFavoritosPage } from '../user-favoritos/user-favoritos';
import { UserCercanosPage } from '../user-cercanos/user-cercanos';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  
  tab1Root = UserPrincipalPage;
  tab2Root = UserCercanosPage;
  tab3Root = UserFavoritosPage;
  tab4Root = ListaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
