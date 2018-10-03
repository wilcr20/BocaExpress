import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AdminLocalPage } from '../admin-local/admin-local';
import { AdminComprasPage } from '../admin-compras/admin-compras';
import { AdminPlatillosPage } from '../admin-platillos/admin-platillos';
import { AdminBandejaPage } from '../admin-bandeja/admin-bandeja';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.jsonUser= this.navParams.get('jsonPrueba'); // se usa el navParams.get para obtener los paarmetros recibidos de ventanas
    console.log("Json recibido: ", this.jsonUser);
  }

  ventanaLocal(){
    this.navCtrl.push(AdminLocalPage);
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

}
