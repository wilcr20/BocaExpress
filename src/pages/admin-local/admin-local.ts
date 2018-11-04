import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {adminService} from '../../services/adminService/admin.service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-admin-local',
  templateUrl: 'admin-local.html',
})
export class AdminLocalPage {
  tabBarElement:any;
  restaurantes:any; // Variable para recibir el json enviado



  constructor(public navCtrl: NavController, public navParams: NavParams, public admServ:adminService) {
    this.restaurantes= this.navParams.get('rest');
    console.log("recibe : ", this.restaurantes);


  }



  ionViewWillEnter(){

    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4";
  }
  ionViewWillLeave(){

    document.getElementById("TabPrincipal").className="MostrarTab";
  }

}
