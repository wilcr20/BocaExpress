import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  tipo: string = "Carrito";
  
  //todos los shopping
  shoppingList: Observable<any[]>
  //todos los platillos
  platilloList: Observable<any[]>

   //lista de platillos que si son favorotos del usuario
   platillos:  any[] = [];

   lista:      any[] = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public shoppingService: ShoppingService,
              public platilloService: PlatilloService,
              public toastCtrl: ToastController,
              public auth : AngularFireAuth) {

              this.getPlatillos();
              this.myShopping();
  }



  getPlatillos(){

    //obtengo los platillos
    this.platilloList = this.platilloService.getPlatilloList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c =>({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
    .map(changes => changes.reverse());

    //obtengo los shopping
    this.shoppingList = this.shoppingService.getPlatilloList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c =>({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
    .map(changes => changes.reverse());
  }

  myShopping(){

    if(this.auth.auth.currentUser != null){

      this.shoppingList.forEach( shopping => {
          shopping.forEach( elementShopping => {
            
            if( elementShopping.idCliente == this.auth.auth.currentUser.uid){
              
              this.platilloList.forEach( platillos => {
                  platillos.forEach( elementPlatillo => {
                    
                    if(elementShopping.idPlatillo == elementPlatillo.key){

                        let result = this.lista.find( platillo => platillo == elementPlatillo.key);
    
                        console.log(result);

                        //significa no repetir datos
                        if(result == undefined){
        
                          this.platillos.push({platillo:elementPlatillo, shoppingKey: elementShopping.key });
                          this.lista.push(elementPlatillo.key);
        
                        }
                    }

                  });
              });
            }

          });
      });

    }else{

      const toast = this.toastCtrl.create({
        message: 'Tienes que estar logueado para ver tu carrito de compra!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }


  ionViewDidLoad() {}

}
