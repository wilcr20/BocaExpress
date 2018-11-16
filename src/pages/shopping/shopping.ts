import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Item } from '../../model/item/item.model'
import { ItemService} from '../../services/item/item.service'
import { CompraService } from '../../services/compra/compra.service';
import { Compra } from '../../model/compra/compra.model';


@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  //tipo para mover el slice
  tipo: string = "Carrito";
  //cantidad que se le agrega cuando se crea un item
  cantidad = null;
  //total de la compra que se le agrega a una compra
  total = 0;
  
  //todos los shopping
  shoppingList: Observable<any[]>
  //todos los platillos
  platilloList: Observable<any[]>
  //todos los items
  ItemList: Observable<any[]> 

   //lista de platillos que si son favorotos del usuario
   platillos:  any[] = [];
   lista:      any[] = [];

   //lista de items que si son del usuario
   platillosItems:  any[] = [];
   listaItems:      any[] = [];

   //array que se le agrega a la compra
   arrayItem: any[] = [];

   item : Item = {
    idPlatillo: '',
    idCliente:  '',
    cantidad:   0,
    estado: false,
    estadoRestuante: false
   }

   compra : Compra = {
    estado     : false,
    idCliente  : '',
    arrayItems : [],
    total : 0
   }


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public shoppingService: ShoppingService,
              public platilloService: PlatilloService,
              public toastCtrl: ToastController,
              public auth : AngularFireAuth,
              public itemService: ItemService,
              public loadingCtrl: LoadingController,
              public compraService: CompraService) {

              this.getPlatillos();
              this.myShopping();
              this.myItem();
  }


  //Func: agrega una compra si se cumplen las restricciones
  addCompra(){
    try {

      if(this.total > 0){

        this.compra.arrayItems = this.arrayItem;
        this.compra.idCliente  = this.auth.auth.currentUser.uid;
        this.compra.total      = this.total;
        this.compra.estado     = false;
    
        this.compraService.addCompra(this.compra).then( ref =>{
    
          this.arrayItem.forEach( key =>{

            this.updateItemById(key);

          });

          this.total     = 0;
          this.arrayItem = [];
          this.platillosItems = [];
          this.listaItems = [];
          this.getPlatillos();
          this.myItem();

          this.mensajeToast('Has agregado una compra!');
  
        });

      }else{

        this.mensajeToast('Debes seleccionar almenos un item!');
  
      }
    } catch (error) {
      this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
    }
    
  }

  //Func: lo que hace es obtener los checks y relizar la suma de los precios
  datachanged(e:any, item: any){

    let key: string = item.itemKey;

    let result = this.arrayItem.find( itemKey => itemKey == key);

    if(e.checked == true){

      if(result == undefined){

        this.arrayItem.push( key );
 
        this.total = this.total + (+item.cantidad * +item.platillo.precio);
       
      }

    }else{

      if(result != undefined){

        this.arrayItem.splice(item.itemKey, 1);

        this.total = this.total - (+item.cantidad * +item.platillo.precio);
    
      }
    
    }
  }

  updateItemById(key: String){
    try {

      this.ItemList.forEach( itemList => {
        itemList.forEach( item => {

          if(item.key == key){

            item.estado = true;

            this.itemService.updateItem(item,key).then( ref =>{
             
              this.platillosItems = [];
              this.listaItems = [];
              this.getPlatillos();
              this.myItem();
            });
          }
        });
      });

    } catch (error) {
      this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
    }

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
      this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
    }
  }


  myItem(){

    let key: string = "";

    if(this.auth.auth.currentUser != null){

      this.ItemList.forEach( ItemList => {
          ItemList.forEach( item => {

            if(item.idCliente == this.auth.auth.currentUser.uid){

              this.platilloList.forEach( PlatilloList => {
                PlatilloList.forEach( platillo => {

                  if(item.idPlatillo === platillo.key){

                    key = platillo.key;

                    let result = this.listaItems.find( platillo => platillo == key);

                    if(result == undefined){
        
                      if(item.estado == false){

                        this.platillosItems.push({platillo:platillo,cantidad: item.cantidad,itemKey: item.key });
                        this.listaItems.push(platillo.key);
                      }
        
                    }
                  }
                });
              });

            }
          });

      });

    }else{

      this.mensajeToast('Tienes que estar logueado para ver tus Items!');

    }
  }
  

  addItem(platillo: any){
    try {

      if(this.cantidad != null){

        this.item.idPlatillo = platillo.platillo.key;
        this.item.idCliente  = this.auth.auth.currentUser.uid;
        this.item.cantidad   = this.cantidad;
        this.item.estado     = false;

        this.itemService.addItem(this.item).then(ref =>{

          this.removeElement(platillo);
          this.getPlatillos();
          this.mensajeLoading('Please wait...');

        });
      }else{

        this.mensajeToast('Procura seleccionar cantidad!!!');
      }
      
    } catch (error) {
      this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
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
      this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
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

      this.mensajeToast('Tienes que estar logueado para ver tu carrito de compra!');

    }
  }


  mensajeLoading(mensaje: any){

    this.loadingCtrl.create({
      content: mensaje,
      duration: 200,
      dismissOnPageChange: true
    }).present();

  }

  mensajeToast(mensaje: any){

    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'top'
    });
    toast.present();

  }

  ionViewDidLoad() {}

}
