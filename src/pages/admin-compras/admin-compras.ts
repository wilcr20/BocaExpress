
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { PerfilService } from '../../services/perfil/perfil.service';
import {CompraService} from '../../services/compra/compra.service'
import { ItemService } from '../../services/item/item.service';
import { PlatilloService } from '../../services/platillo/platillo.service';

/**
 * Generated class for the AdminComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-compras',
  templateUrl: 'admin-compras.html',
})
export class AdminComprasPage {

  tabBarElement:any;
  restaurantes:any; // Variable para recibir el json enviado

  compraList: Observable<any[]>;
  comprasGenerales:any=[];
  itemsGeneral:any=[];
  cliente: Observable<any[]>;
  itemsList: Observable<any[]>
  items:any;
  dishList: Observable<any[]>
  platillosLocal:  any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public compraS:CompraService,public perfilSer:PerfilService,public itemService:ItemService,public platilloService:PlatilloService) {
    this.restaurantes= this.navParams.get('rest');
    this.obtenerItems();
    this.allItems();
    this.getPlatillos();
    this.allPlatillos();
    this.getCompras();
    this.allCompras();
    }





    obtenerItems(){
      this.itemsList = this.itemService.getItemList()
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

    allItems(){

      this.itemsList.forEach(ITEM => {
        //this.obtenerItemsPropios(ITEM);
        this.items= ITEM;

     });

    }


    getPlatillos(){
      this.dishList = this.platilloService.getPlatilloList()
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

    allPlatillos(){
      this.dishList.forEach(platillo => {
        this.platillosLocal= platillo;
     });
    }







  getCompras(){
    this.compraList = this.compraS.getAllCompras()
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

  allCompras(){

    this.compraList.forEach(compra => {
      this.getCompraLocal(compra);

   });

  }



  getCompraLocal(ListaC){
      for(var y=0; y< ListaC.length;y++){
          this.cliente = this.perfilSer.getProfile(ListaC[y].idCliente);

            this.creaJson(ListaC[y]);


      }


     //console.log("Compras : ", this.comprasGenerales);

    }


  creaJson(compra ){   // genera el json de compras a mostrar
    this.cliente.forEach(user => {

    let arrayC=[];
    let itemsCompra= compra.arrayItems; // items de la compra

    let itemJson= {
      cliente:user[0].nombre,
      items: [],
      total: compra.total
    }



    for (var i=0; i<itemsCompra.length;i++){


      for (var n=0;n<this.items.length;n++){  //

          if (itemsCompra[i] == this.items[n].key ){ // si halla el item en la compra
              for (var p=0 ; p< this.platillosLocal.length;p++){
                if(this.platillosLocal[p].idRestaurante == this.restaurantes.key && user[0].idCliente ==this.items.idCliente ){
                  let itemss={
                    cantidad: this.items[n].cantidad,
                    nombre: this.platillosLocal[p].nombre
                  }
                  itemJson.items.push(itemss);
                  this.comprasGenerales.push(itemJson); // añade a lista de json de este tipo
                  break;
                }


              }
          }

        }


    }

   });
   console.log("ItemsJOsn; ", this.comprasGenerales)

  }






  ionViewWillEnter(){
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }
  ionViewWillLeave(){
    document.getElementById("TabPrincipal").className="MostrarTab";
  }


}
