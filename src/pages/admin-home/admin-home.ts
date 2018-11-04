import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AdminLocalPage } from '../admin-local/admin-local';
import { AdminComprasPage } from '../admin-compras/admin-compras';
import { AdminPlatillosPage } from '../admin-platillos/admin-platillos';
import { AdminBandejaPage } from '../admin-bandeja/admin-bandeja';

import {adminService} from '../../services/adminService/admin.service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';



/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  jsonUser:any; // Variable para recibir el json enviado desde userGate
  tabBarElement:any;

  RestauranteList: Observable<any[]> // guarda todos los resdtaurantes en DB
  rest:  any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public admServ:adminService) {

    this.jsonUser= this.navParams.get('jsonPrueba'); // se usa el navParams.get para obtener los paarmetros recibidos de ventanas
    console.log("Json recibido: ", this.jsonUser);

  }



  ionViewWillEnter(){
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4";
  }
  ionViewWillLeave(){
    document.getElementById("TabPrincipal").className="MostrarTab";
  }




  ventanaLocal(){
    this.obtieneRestaurantes();
    this.allRestaurants();
  }

  ventanaPlatillos(){
    this.navCtrl.push(AdminPlatillosPage);
  }

  ventanaBandeja(){
    this.navCtrl.push(AdminBandejaPage);
  }

  ventanaCompras(){
    this.navCtrl.push(AdminComprasPage);
  }


  //// Firebase

  obtieneRestaurantes(){
    this.RestauranteList = this.admServ.getRestaurantesList()
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

  allRestaurants(){

    this.RestauranteList.forEach(restaurante => {
    console.log(".. ",restaurante);
    var restP:any=  restaurante[0];
    this.navCtrl.push(AdminLocalPage,{"rest":restP});
    this.rest.push(restaurante);
 });


}



}
