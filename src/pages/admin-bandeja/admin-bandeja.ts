import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../../services/item/item.service';
import { PerfilService } from '../../services/perfil/perfil.service';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { AngularFireAuth } from 'angularfire2/auth';



/**
 * Generated class for the AdminBandejaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-bandeja',
  templateUrl: 'admin-bandeja.html',
})
export class AdminBandejaPage {

  tabBarElement:any;
  restaurante:any={}; // Variable para recibir el json enviado


  itemsList: Observable<any[]>

  cliente: Observable<any[]>;
  itemsGeneral:any=[];

  dishList: Observable<any[]>
  platillosLocal:  any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService:ItemService, public perfilSer:PerfilService,
                public authService: AngularFireAuth, public platilloService:PlatilloService) {

                this.restaurante= this.navParams.get('rest');
                this.obtenerItems();
                this.allItems();
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
      this.obtenerItemsPropios(ITEM);

   });

  }


  listaT= [];
  obtenerItemsPropios(lista){

      for(var i=0; i<lista.length;i++){
        this.cliente = this.perfilSer.getProfile(lista[i].idCliente);
        this.getPlatillos(this.cliente,lista[i]);
        this.allPlatillos(this.cliente,lista[i]);

    }
  }


  ///// OBTENER PLATILLOS D ERETAURANT, PARA VERFICAR QUE ESTE EN PEDIDO

  getPlatillos(cliente,item){
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

  allPlatillos(cliente,item){
    this.dishList.forEach(platillo => {
      console.log(platillo);
      this.getPlatilloLocal(cliente,item,platillo);
   });
  }


  getPlatilloLocal(clienteP,item,platillosL){

      for(var y=0; y <platillosL.length;y++){

        if(platillosL[y].key == item.idPlatillo && item.estadoRestuante == false  && this.restaurante.key == platillosL[y].idRestaurante){

          clienteP.forEach(user => {
            let itemJson= {
              keyItem: item.key,
              cliente:user[0].nombre,
              estado:item.estado,
              nombrePlatillo:platillosL[y].nombre , // conseguir el nomb de platillo
              cantidad:item.cantidad,
              imagen:platillosL[y].imagen,
              idCliente: item.idCliente,
              idPlatillo: item.idPlatillo
            }
            console.log(itemJson);
            this.itemsGeneral.push(itemJson); // añade a lista de json de este tipo
         });


      }
      break;

        }

  }


  aceptaPedido(item){
    console.log(item);
    let itemJson={
      cantidad:item.cantidad,
      estado:item.estado,
      estadoRestuante: true,
      idCliente: item.idCliente,
      idPlatillo: item.idPlatillo
    }

    //console.log("ENBIS: ", itemJson);
    this.itemService.editItem(itemJson,item.keyItem);
    this.actulizaPantalla();
  }

  actulizaPantalla(){
    alert ("Aceptado Correctamente!!")
    this.itemsGeneral=[];
    this.allItems();
    this.obtenerItems();
  }






  ionViewWillEnter(){

    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }

  ionViewWillLeave(){

    document.getElementById("TabPrincipal").className="MostrarTab";
  }

}
