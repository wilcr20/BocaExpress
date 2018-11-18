
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { PerfilService } from '../../services/perfil/perfil.service';
import {CompraService} from '../../services/compra/compra.service'

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



  constructor(public navCtrl: NavController, public navParams: NavParams, public compraS:CompraService,public perfilSer:PerfilService) {
    this.restaurantes= this.navParams.get('rest');
    this.getCompras();
    this.allCompras();
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

  getCompraLocal(Lista){




      for(var i=0; i< Lista.length;i++){
        this.cliente = this.perfilSer.getProfile(Lista[i].idCliente);
        this.cliente.forEach(user => {
          let itemJson= {
            // keyItem: item.key,
             cliente:user[0].nombre
            // estado:item.estado,
            // nombrePlatillo:platillosL[y].nombre , // conseguir el nomb de platillo
            // cantidad:item.cantidad,
            // imagen:platillosL[y].imagen,
            // idCliente: item.idCliente,
            // idPlatillo: item.idPlatillo
          }
          console.log(itemJson);
          this.comprasGenerales.push(itemJson); // añade a lista de json de este tipo
       });
           }
     console.log("Compras : ", this.comprasGenerales);
  }






  ionViewWillEnter(){
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }
  ionViewWillLeave(){
    document.getElementById("TabPrincipal").className="MostrarTab";
  }


}
