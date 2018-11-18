import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Compra } from '../../model/compra/compra.model';
import { CompraService } from '../../services/compra/compra.service';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../model/item/item.model';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {

  compra : Compra ;
  items : any[] = [];
  arrayItems : Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public compraService: CompraService, public itemService: ItemService) {
    this.compra = this.navParams.get("compra");
    this.items = this.compra.arrayItems;
    this.getItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
    this.getItems();
  }

 getItems(){
   this.arrayItems = this.itemService.getItems("powjfijwoeij");
 }



}
