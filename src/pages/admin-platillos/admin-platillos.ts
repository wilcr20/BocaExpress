import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminPlatillosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-platillos',
  templateUrl: 'admin-platillos.html',
})
export class AdminPlatillosPage {

  tabBarElement:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPlatillosPage');
  }

  ionViewWillEnter(){
    console.log("Aplica coultamiento");
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4";
  }
  ionViewWillLeave(){
    console.log("SALE ");
    document.getElementById("TabPrincipal").className="MostrarTab";
  }

}
