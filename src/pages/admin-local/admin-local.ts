import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {adminService} from '../../services/adminService/admin.service';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-admin-local',
  templateUrl: 'admin-local.html',
})
export class AdminLocalPage {
  tabBarElement:any;
  restaurantes:any; // Variable para recibir el json enviado

  // variables NGMODEl usadas en forms
    categoria="";
    descripcion="";
    horario="";
    telefono="";
    ubicacion="";


  constructor(public navCtrl: NavController, public navParams: NavParams, public admServ:adminService,public authService: AngularFireAuth) {
    this.restaurantes= this.navParams.get('rest');
    console.log("recibe : ", this.restaurantes);
    this.categoria= this.restaurantes.categoria;
    this.descripcion= this.restaurantes.descripcion;
    this.horario= this.restaurantes.horario;
    this.telefono= this.restaurantes.telefono;
    this.ubicacion= this.restaurantes.ubicacion;

  }



  ionViewWillEnter(){

    this.tabBarElement= document.getElementById("TabPrincipal");
    //document.getElementById("TabPrincipal").className="MostrarTab";
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }
  ionViewWillLeave(){

    document.getElementById("TabPrincipal").className="MostrarTab";
  }


  modificaLocal(){
     var rest={
      categoria:this.categoria,
      descripcion:this.descripcion,
      horario:this.horario,
      idPropietario:this.authService.auth.currentUser.uid,
      imagenPropietario:this.restaurantes.imagenPropietario,
      imagenRestaurante:this.restaurantes.imagenRestaurante,
      nombrePropietario:this.restaurantes.nombrePropietario,
      nombreRestaurante:this.restaurantes.nombreRestaurante,
      telefono:this.telefono,
      ubicacion:this.ubicacion,
      key:this.restaurantes.key
     };
     this.admServ.editRestaurante(rest);
  }

}
