import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {


  userOption : Array<{name: string}>;
  option     : Array<{name: string}>;
  
  estado:any = "null";


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.option  = [{ name: "Cliente" },{name: "Restaurante"}]; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  onItemSelection(selection) {

    if(selection.name == "Cliente"){
      this.estado="Cliente";
    }else{
      this.estado="Restaurante";
    }
  }

}
