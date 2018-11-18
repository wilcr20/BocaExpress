import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { CompraService } from '../../services/compra/compra.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Compra } from '../../model/compra/compra.model';
import { ShopDetailPage } from '../shop-detail/shop-detail';

/**
 * Generated class for the ShoppingHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-history',
  templateUrl: 'shopping-history.html',
})
export class ShoppingHistoryPage {

  compras : Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, comprasService : CompraService, authService : AngularFireAuth) {

    if(authService.auth.currentUser != null){
    this.compras = comprasService.getCompras(authService.auth.currentUser.uid);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingHistoryPage');
  }

  verDetalle(compra : Compra){

      this.navCtrl.push(ShopDetailPage,{compra});
  }
}
