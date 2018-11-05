import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { adminService } from '../../services/adminService/admin.service';
import {UserPrincipalPage} from '../../pages/user-principal/user-principal'
/**
 * Generated class for the RegistroRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-restaurant',
  templateUrl: 'registro-restaurant.html',
})
export class RegistroRestaurantPage {

  alternative: Array<{name: string}>;
  categorieOption : Array<{name: string}>;
  selectCategoria = "";

  // variables NGMODEL para form de registro
  restaurantname="";
  horario="";
  telefono="";
  descripcion="";
  propietario="";
  imagen="";
  imagenP="";
  ubicacion="";


  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AngularFireAuth, public admS:adminService) {

  this.alternative  = [{ name:"Comida Rapida" },
                         {name: "Familiar"},
                         {name: "Buffet"},
                         {name: "Temáticos"},
                         {name: "Para llevar"},
                         {name: "Oriental"}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroRestaurantPage');
  }

  onItemSelection(selection) {

    this.selectCategoria = selection.name;

  }
  
  registraRestaurante(){
    var rest={
      idPropietario:this.authService.auth.currentUser.uid,
      categoria: this.selectCategoria,
      descripcion:this.descripcion,
      horario:this.horario,
      imagenPropietario:this.imagenP,
      imagenRestaurante:this.imagen,
      nombrePropietario:this.propietario,
      nombreRestaurante:this.restaurantname,
      telefono:this.telefono,
      ubicacion:this.ubicacion
    }
    this.admS.addRestaurant(rest);
    this.navCtrl.push(UserPrincipalPage);
  }

}
