import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AdminHomePage} from '../admin-home/admin-home'; // importa la pagina a llamar

/**
 * Generated class for the UserGatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-gate',
  templateUrl: 'user-gate.html',
})
export class UserGatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad UserGatePage');
  }

   adminVentana() {
    //alert("Admin");
    //var nombre= 'Wilfred';
    var jsonPrueba = {  // Prueba de como funcionan los envios de Json entre Pages
      nombre:'Wilfred',
      cedula:207720776
    };

    this.navCtrl.push(AdminHomePage, {jsonPrueba});  // el navCtrl funciona como redireccion de paginas

  }

    clienteVentana(){
      alert("Cliente");
    }




}
