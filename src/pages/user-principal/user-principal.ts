import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {adminService} from '../../services/adminService/admin.service';

//pages
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
  RestauranteList: Observable<any[]> // guarda todos los resdtaurantes en DB
  rest:  any[] = [];

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
              public searchbarService: searchbarService, public authService: AngularFireAuth, public admServ:adminService) {

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




  ionViewWillEnter(){
    document.getElementById("TabPrincipal").className="OcultaTab4 OcultaTab5";

    if (this.authService.auth.currentUser != null){
      console.log("Logueado:  "+this.authService.auth.currentUser.uid )
      this.obtieneRestaurantes();
      this.allRestaurants();

    }

  }



  //// Firebase
  obtieneRestaurantes(){
    console.log("Entra a obtieneRestaurantes");
    this.RestauranteList = this.admServ.getRestaurantesList()
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


  allRestaurants(){
    console.log("Entra a allRestaurants");
    this.RestauranteList.forEach(restaurante => {
    this.rest.push(restaurante);
 });
    this.existeRestauranteAdmin(this.authService.auth.currentUser.uid);
}

   existeRestauranteAdmin(idUser){
      if(this.rest.length>0){
          var restJson = this.rest[0];
         // document.getElementById("TabPrincipal").className="MostrarTab";
          for(var i=0; i<restJson.length;i++){
            if(restJson[i].idPropietario == idUser){
              document.getElementById("TabPrincipal").className="OcultaTab4";
              return true;
            }
          }
          document.getElementById("TabPrincipal").className="OcultaTab5";
          return false;

      }

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
