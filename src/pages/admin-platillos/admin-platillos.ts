import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

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
  restaurante:any=[]; // Variable para recibir el json enviado
  mostrar:any=true;
  dishList: Observable<any[]>

  //lista de platillos general
  platillos:any=[];
  platillosLocal:  any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public platilloService: PlatilloService,private alertCtrl: AlertController) {
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
      this.getPlatilloLocal(platillo);

   });


  }

  getPlatilloLocal(platillosL){
      for(var i=0; i< platillosL.length;i++){
       if(platillosL[i].idRestaurante == this.restaurante.key){
         this.platillosLocal.push(platillosL[i]);
       }
     }

  }


// funciones de ventana

  mostrarP(){
    console.log(this.platillosLocal.length);
    this.mostrar= true;
  }


  addP(){
    this.mostrar= false;
  }

  agregaPlatillo(){
      console.log("Agregas nuevo platillo");
  }

  borraPlatillo(dish){
    console.log("Borra");
    this.platilloService.deletePlatillo(dish);
    this.platillosLocal=[];
    this.getPlatillos();
    this.allPlatillos();
  }

  editaPlatillo(dish){

      let alert = this.alertCtrl.create({
        title: 'Modificar datos.',
        inputs: [
          {
            name: 'nombre',
            placeholder: 'Nombre de platillo',
            value:dish.nombre
          },
          {
            name: 'descripcion',
            placeholder: 'Descripcion',
            value:dish.descripcion
          },
          {
            name: 'precio',
            placeholder: 'Precio',
            value:dish.precio
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Modificar!',
            handler: data => {
              console.log("Data: ",data);
            }
          }
        ]
      });
      alert.present();
  }








}
