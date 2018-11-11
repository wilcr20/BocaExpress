import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { UserPrincipalPage } from '../user-principal/user-principal';
import { ListaPage } from '../lista/lista';
import { UserFavoritosPage } from '../user-favoritos/user-favoritos';
import { UserCercanosPage } from '../user-cercanos/user-cercanos';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdminHomePage } from '../admin-home/admin-home';
import {RegistroRestaurantPage} from '../registro-restaurant/registro-restaurant';



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
  tab5Root = RegistroRestaurantPage;
  tab6Root = AdminHomePage;

  public showTab: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authentication : AngularFireAuth,
              public viewCtrl: ViewController,
              public authService: AngularFireAuth) {
  }

  ionViewDidLoad() {
    if (this.authService.auth.currentUser != null){
      this.showTab = true;
    }else{
      this.showTab = false;
    }
  }

}

