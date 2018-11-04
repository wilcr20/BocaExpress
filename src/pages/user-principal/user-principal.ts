import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';


//pages
import {AdminHomePage} from '../admin-home/admin-home'; // importa la pagina a llamar
import { LoginPage } from '../login/login';
import { ProductoPage } from '../producto/producto';

//Firebase
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { searchbarService} from '../../services/searchbar/searchbar.service';

@IonicPage()
@Component({
  selector: 'page-user-principal',
  templateUrl: 'user-principal.html',
})
export class UserPrincipalPage {

  platilloList: Observable<Platillo[]>

  //nota: Para wilfred: cuando se haga el metodo de agregar platillo: agregar la imagen a storage y recuperar la url y agregarla 
  platillo: Platillo = {
    descripcion: 'Casado tradicional tico.',
    idRestaurante: 'hfhsjsjhs',
    nombre: 'Casado',
    precio: '3000',
    imagen: 'https://firebasestorage.googleapis.com/v0/b/bocaexpress-3c2d9.appspot.com/o/casado.jpg?alt=media&token=58863b5c-4496-4245-8848-d6345293b5f6',

  };



  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private platilloService: PlatilloService,
              public toastCtrl: ToastController,
              public searchbarService: searchbarService) {
          
              this.searchbarService.platilloRef.on('value', platilloList => {

                let platillos = [];

                platilloList.forEach( platillo => {
          
                  platillos.push({platillo: platillo.val(), key: platillo.key});

                  return false;
                });
              
                this.searchbarService.platilloList = platillos;
                this.searchbarService.loadedPlatilloList = platillos;
              });
  
  }


  ionViewDidLoad() {}


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

  initializeItems(): void {
    this.searchbarService.platilloList = this.searchbarService.loadedPlatilloList;
  }

  getItems(searchbar) {

    // Reset items back to all of the items
    this.initializeItems();
  
    // set value to the value of the searchbar
    var value = searchbar.srcElement.value;
  
    // if the value is an empty string don't filter the items
    if (!value) {
      return;
    }
  
    this.searchbarService.platilloList = this.searchbarService.platilloList.filter((v) => {

      if(v.platillo.nombre && value) {
        if (v.platillo.nombre.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
  }

  //Nota: agrega platillo quemado con this.platillo(prueba)
  addPlatillo() {
    this.platilloService.addPlatillo(this.platillo).then(ref => {})
  }

  //Nota: la idea es obtener la informacion del platillo para procesar la compra
  verPlatillo(platillo: Platillo){
    this.navCtrl.push(ProductoPage, {platillo}); 
  }


}
