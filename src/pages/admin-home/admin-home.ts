import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


import { AdminLocalPage } from '../admin-local/admin-local';
import { AdminComprasPage } from '../admin-compras/admin-compras';
import { AdminPlatillosPage } from '../admin-platillos/admin-platillos';
import { AdminBandejaPage } from '../admin-bandeja/admin-bandeja';
import { RegistroRestaurantPage } from '../registro-restaurant/registro-restaurant';

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


  tabBarElement:any;

  RestauranteList: Observable<any[]> // guarda todos los resdtaurantes en DB
  rest:  any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public admServ:adminService,public authService: AngularFireAuth) {

  }



  ionViewWillEnter(){
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="MostrarTab";
    document.getElementById("TabPrincipal").className="OcultaTab4";
  }

  ionViewWillLeave(){
    document.getElementById("TabPrincipal").className="MostrarTab";
  }




  ventanaLocal(){
    this.obtieneRestaurantes();
    this.allRestaurants(1);
  }

  ventanaPlatillos(){
    this.obtieneRestaurantes();
    this.allRestaurants(2);

  }

  ventanaBandeja(){
    this.obtieneRestaurantes();
    this.allRestaurants(3);
    //this.navCtrl.push(AdminBandejaPage);
  }

  ventanaCompras(){
    this.obtieneRestaurantes();
    this.allRestaurants(4);
    //this.navCtrl.push(AdminComprasPage);
  }

  ventanaCrearRestaurante(){
    //this.obtieneRestaurantes();
    //this.allRestaurants(4);
    this.navCtrl.push(RegistroRestaurantPage);
  }

  //// Firebase
  obtieneRestaurantes(){
    this.rest=[];
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


  allRestaurants(page){

    this.RestauranteList.forEach(restaurante => {
    this.rest.push(restaurante);
    this.existeRestauranteAdmin(this.authService.auth.currentUser.uid,page);
 });
    //this.existeRestauranteAdmin(this.authService.auth.currentUser.uid,page);
}

existeRestauranteAdmin(idUser,page){
  if(this.rest.length>0){
      var restJson = this.rest[0];

      for(var i=0; i<restJson.length;i++){
        if(restJson[i].idPropietario == idUser){
          if(page ==1){
            this.navCtrl.push(AdminLocalPage,{"rest":restJson[i]});
            //return true;
            break;
          }
          if(page ==2){
            this.navCtrl.push(AdminPlatillosPage,{"rest":restJson[i]});
            break;
            //return true;
          }
          if(page ==3){
            this.navCtrl.push(AdminBandejaPage,{"rest":restJson[i]});
            break;
            //return true;
          }
          if(page ==4){
            this.navCtrl.push(AdminComprasPage,{"rest":restJson[i]});
            break;
            //return true;
          }

          //document.getElementById("TabPrincipal").className="OcultaTab4";

        }
      }

  }

}



}
