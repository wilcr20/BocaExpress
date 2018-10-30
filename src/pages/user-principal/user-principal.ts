import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//pages
import {AdminHomePage} from '../admin-home/admin-home'; // importa la pagina a llamar
import { LoginPage } from '../login/login';

//Firebase
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';

@IonicPage()
@Component({
  selector: 'page-user-principal',
  templateUrl: 'user-principal.html',
})
export class UserPrincipalPage {

  platilloList: Observable<Platillo[]>

  //nota: Para wilfred: cuando se haga el metodo de agregar platillo: agregar la imagen a storage y recuperar la url y agregarla 
  platillo: Platillo = {
    descripcion: 'prueba',
    idRestaurante: 'prueba',
    nombre: 'prueba',
    precio: 'prueba',
    imagen: 'https://firebasestorage.googleapis.com/v0/b/bocaexpress-3c2d9.appspot.com/o/pizza.jpg?alt=media&token=d915367c-986d-4144-96eb-d8a383628c8a',

  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private platilloService: PlatilloService) {


    //Nota: apenas abre esta pagina carga el metodo obtener platillos
    this.platilloList = this.platilloService.getPlatilloList()
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPrincipalPage');
  }


  adminVentana() {

    var jsonPrueba = {  // Prueba de como funcionan los envios de Json entre Pages
      nombre:'Wilfred',
      cedula:207720776
    };
    this.navCtrl.push(AdminHomePage, {jsonPrueba});  // el navCtrl funciona como redireccion de paginas
  }


  loginVentana(){
    this.navCtrl.push(LoginPage);
  }

  //Nota: agrega platillo quemado con this.platillo(prueba)
  addPlatillo() {
    this.platilloService.addPlatillo(this.platillo).then(ref => {})
  }

  //Nota: la idea es obtener la informacion del platillo para procesar la compra
  verPlatillo(platillo: Platillo){
    alert("as precionado: "+platillo.nombre);

  }

}
