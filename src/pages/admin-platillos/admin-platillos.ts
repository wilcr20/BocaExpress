import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

import firebase from 'firebase';
import {FileChooser} from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';


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
  restaurante:any={}; // Variable para recibir el json enviado
  mostrar:any=true;
  dishList: Observable<any[]>

  //lista de platillos general
  platillos:any=[];
  platillosLocal:  any[] = [];


  // Variables NGMODEl para validar formulario de agregar platillo
    descripcion="";
    idRestaurante= "";
    nombre= "";
    precio= "";
    imagen="";

    // Direcciones de Firebase Storage

    nombreIMG="";
    urlimg=""; // url imagen en firebase



  constructor(public navCtrl: NavController, public navParams: NavParams,public platilloService: PlatilloService,
    private alertCtrl: AlertController, private fileC:FileChooser, private file:File, private filePath:FilePath) {
    this.restaurante= this.navParams.get('rest');
    console.log("recibe : ", this.restaurante);
    this.getPlatillos();
    this.allPlatillos();


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


  actualizaPantalla(){
    this.platillosLocal=[];

  }

  mostrarP(){
    console.log(this.platillosLocal.length);
    this.mostrar= true;
  }


  addP(){
    this.mostrar= false;
  }

  agregaPlatillo(){

      //NOTA: CAMBIE LA IMAGEN PARA HACER PREUBAS
      var dishJ:Platillo ={
        descripcion: this.descripcion,
        idRestaurante: this.restaurante.key,
        nombre: this.nombre,
        precio: this.precio,
        //imagen: 'https://firebasestorage.googleapis.com/v0/b/bocaexpress-3c2d9.appspot.com/o/pizza.jpg?alt=media&token=d915367c-986d-4144-96eb-d8a383628c8a'
        imagen: this.urlimg
      }

      this.platilloService.addPlatillo(dishJ);
      this.actualizaPantalla();
      alert("Platillo agregado correctamente...");

  }

  borraPlatillo(dish){
    console.log("Borra");
    this.platilloService.deletePlatillo(dish);
    this.actualizaPantalla();

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
              dish.nombre = data.nombre;
              dish.descripcion= data.descripcion;
              dish.precio= data.precio;
              console.log("Data: ",dish);
              this.platilloService.editPlatillo(dish);
              this.actualizaPantalla();
            }
          }
        ]
      });
      alert.present();
  }



  seleccionaImagen(){

    this.fileC.open().then((uri) => {

      this.filePath.resolveNativePath(uri).then(filePath => {
        let dirPathSegments = filePath.split('/');
        let fileName = dirPathSegments[dirPathSegments.length-1];
        this.nombreIMG= dirPathSegments.pop();

        let dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
          await this.upload(buffer, fileName);
        }).catch((err) => {
          alert(err.toString());
        });
      });
    });


  }


  async upload(buffer,name){

    alert("Subiendo imagen ...")
    let blob = new Blob([buffer],{ type: "image/jpeg"});
    // especificar mas formatos de fotos xd
    let storage = firebase.storage();
    storage.ref('imagenes/'+name).put(blob)
    .then((d)=>{
      alert("subida lista!!  ");
      this.getURLimagen(this.nombreIMG);

    })
    .catch( (error) =>{
      alert("ERROR: "+ JSON.stringify(error))
      this.getURLimagen(this.nombreIMG);
    })
  }

  getURLimagen(nombre){
    let storageFire = firebase.storage();
    let pathReference = storageFire.ref().child('imagenes/'+nombre).getDownloadURL()
    .then( (url)=>{

        this.urlimg= url;
    })

  }











}
