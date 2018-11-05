import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

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
  restaurante:any; // Variable para recibir el json enviado
  mostrar:any=true;
  dishList: Observable<any[]>

  //lista de platillos general
  platillos:any=[];
  platillosLocal:  any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public platilloService: PlatilloService) {
    this.restaurante= this.navParams.get('rest');
    console.log("recibe : ", this.restaurante);
    this.getPlatillos();
    this.allPlatillos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPlatillosPage');
  }

  ionViewWillEnter(){

    this.tabBarElement= document.getElementById("TabPrincipal");
    document.getElementById("TabPrincipal").className="OcultaTab1 OcultaTab2 OcultaTab3 OcultaTab4 OcultaTab5";
  }
  ionViewWillLeave(){
    document.getElementById("TabPrincipal").className="MostrarTab";
  }


  getPlatillos(){
    this.dishList = this.platilloService.getPlatilloList()
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

  allPlatillos(){
    this.dishList.forEach(platillo => {
      console.log("Platillo", platillo);
      this.platillos= platillo;
   });
   console.log("lista platillos: ", this.platillos);
   this.getPlatilloLocal();

  }

  getPlatilloLocal(){
    console.log("entra a getPlatilloLocal()");
    console.log("tam :", this.platillos.length);

     for(var i=0; i< this.platillos.length;i++){
       console.log("-",this.platillos[i]);
      if(this.platillos[i].idRestaurante == this.restaurante.key){
        this.platillosLocal.push(this.platillos[i]);
        console.log("HALLA IGULA");
      }
    }

  }

  mostrarP(){
    //console.log(this.platillosLocal.length);
    this.mostrar= true;
  }


  addP(){
    this.mostrar= false;
  }

  agregaPlatillo(){
      console.log("Agregas nuevo platillo");
  }

}
