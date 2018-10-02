import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { CercanosPage } from '../cercanos/cercanos'
import { HistorialComprasPage} from '../historial-compras/historial-compras'
import { FavoritosPage } from '../favoritos/favoritos';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  private cercanoPage;
  private historialPage;
  private favoritosPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {

      this.cercanoPage = CercanosPage;
      this.favoritosPage = FavoritosPage;
      this.historialPage = HistorialComprasPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  openPage(page) {
    this.cercanoPage = page;
  }

}
