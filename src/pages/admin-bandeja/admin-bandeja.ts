import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminBandejaPage');
  }

  ionViewWillEnter(){
    console.log("Aplica coultamiento");
    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }
  ionViewWillLeave(){
    console.log("SALE ");
    document.getElementById("TabPrincipal").className="MostrarTab";
  }

}
