import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Item } from '../../model/item/item.model'
import { ItemService} from '../../services/item/item.service'


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

   item : Item = {
    idPlatillo: '',
    idCliente:  '',
    cantidad:   0
   }

   cantidad = null;


   ItemList: Observable<any[]> 

  
   platillosItems:  any[] = [];

   listaItems:      any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public shoppingService: ShoppingService,
              public platilloService: PlatilloService,
              public toastCtrl: ToastController,
              public auth : AngularFireAuth,
              public itemService: ItemService,
              public loadingCtrl: LoadingController) {

              this.getPlatillos();
              this.myShopping();
              this.myItem();
  }

  deleteItem(platillo: any){

    try {

      this.itemService.removeItem(platillo.itemKey).then( ref => {

        this.platillosItems.splice(platillo.platillo, 1);
        this.listaItems.splice(platillo.platillo.key, 1);
        this.getPlatillos();
        this.myItem();
      

      });
      
    

    } catch (error) {

      console.log(error);
    }
  }

  myItem(){

    if(this.auth.auth.currentUser != null){


      this.ItemList.forEach( ItemList => {
          ItemList.forEach( item => {

            if(item.idCliente == this.auth.auth.currentUser.uid){

              this.platilloList.forEach( PlatilloList => {
                PlatilloList.forEach( platillo => {

                  if(item.idPlatillo === platillo.key){

                    let result = this.listaItems.find( platillo => platillo === platillo.key);

                    console.log("Item result "+result);
    
                    console.log(result);
                    //significa no repetir datos
                    if(result == undefined){
        
                      this.platillosItems.push({platillo:platillo,cantidad: item.cantidad,itemKey: item.key });
                      this.listaItems.push(platillo.key);
        
                    }

                  }

                });
              });

            }
          });

      });

    }else{

      const toast = this.toastCtrl.create({
        message: 'Tienes que estar logueado para ver tus Items!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }
  

  addItem(platillo: any){


    try {

      if(this.cantidad != null){

        
        this.item.idPlatillo = platillo.platillo.key;
        this.item.idCliente  = this.auth.auth.currentUser.uid;
        this.item.cantidad   = this.cantidad;

        this.itemService.addItem(this.item).then(ref =>{

          this.removeElement(platillo);
          this.getPlatillos();


          this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 1000,
            dismissOnPageChange: true
        }).present();

        });
      

      }else{

        const toast = this.toastCtrl.create({
          message: 'Procura seleccionar cantidad!!!',
          duration: 2000,
          position: 'top'
        });
        toast.present();

      }
      
    } catch (error) {
      console.log(error);
    }

  }

  removeElement(platillo: any){


    try {

      this.shoppingService.removePlatillo(platillo.shoppingKey).then(ref => {
        this.platillos.splice(platillo.platillo, 1);
        this.lista.splice(platillo.platillo.key, 1);
        this.getPlatillos();
        this.myShopping();
        
      });

    } catch (error) {

      console.log(error);
    }
  }
  
  onItemSelection(selection) {

    this.cantidad = selection;
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

    //obtengo los items
    this.ItemList = this.itemService.getItemList()
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

                        let result = this.lista.find( platillo => platillo === elementPlatillo.key);

                        console.log("shopping result "+result);
    
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
