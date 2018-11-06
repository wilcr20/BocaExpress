import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,ViewController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {adminService} from '../../services/adminService/admin.service';



//pages
import { LoginPage } from '../login/login';
import { ProductoPage } from '../producto/producto';
import { TabsPage} from '../tabs/tabs'

//Firebase
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Platillo } from '../../model/platillo/platillo.model';
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


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public searchbarService: searchbarService, 
              public authService: AngularFireAuth, 
              public admServ:adminService,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public tabs: TabsPage) {

                if (this.authService.auth.currentUser != null){
                  this.tabs.showTab = true;
                  
                }else{
                  this.tabs.showTab = false;
                }

              
              this.loadingCtrl.create({
                  content: 'Please wait...',
                  duration: 3000,
                  dismissOnPageChange: true
              }).present();
            

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


  ionViewDidLoad() {
    if (this.authService.auth.currentUser != null){
      this.tabs.showTab = true;
      
    }else{
      this.tabs.showTab = false;
    }
  }

  ionViewWillEnter(){

    if (this.authService.auth.currentUser != null){
      
      this.obtieneRestaurantes();
      this.allRestaurants(); 
    }

  }

  obtieneRestaurantes(){

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

    this.RestauranteList.forEach(restaurante => {
      this.rest.push(restaurante);
    });
    this.existeRestauranteAdmin(this.authService.auth.currentUser.uid);
  }

  existeRestauranteAdmin(idUser){

  
    if(this.rest != null){

      if(this.rest.length>0){

        var restJson = this.rest[0];

        for(var i=0; i<restJson.length;i++){

          if(restJson[i].idPropietario == idUser){
            
            //document.getElementById("TabPrincipal").className="OcultaTab4";
            return true;
          }

        }
        //document.getElementById("TabPrincipal").className="OcultaTab5";
        return false;
      }
    }

    
   }


  loginVentana(){
    this.navCtrl.push(LoginPage);
  }

  initializeItems(): void {
    this.searchbarService.platilloList = this.searchbarService.loadedPlatilloList;
  }

  getItems(searchbar) {

    this.initializeItems();

    var value = searchbar.srcElement.value;

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

  verPlatillo(platillo: Platillo){
    this.navCtrl.push(ProductoPage, {platillo});
  }
}
