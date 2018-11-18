import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { adminService } from '../../services/adminService/admin.service';
import {UserPrincipalPage} from '../../pages/user-principal/user-principal'

import firebase from 'firebase';
import {FileChooser} from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';


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

  // Direcciones de Firebase Storage

  nombreIMG="";
  urlimg=""; // url imagen en firebase


  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AngularFireAuth, public admS:adminService,
    private fileC:FileChooser, private file:File, private filePath:FilePath) {

  this.alternative  = [{ name:"Comida Rapida" },
                         {name: "Familiar"},
                         {name: "Buffet"},
                         {name: "Temáticos"},
                         {name: "Para llevar"},
                         {name: "Oriental"}];
  }



  onItemSelection(selection) {

    this.selectCategoria = selection.name;

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

    alert("Subiendo imagen ... Por favor espere msj de confirmación!")
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

        this.urlimg= url; // obtiene link de  imagen desde firebase
    })

  }


  registraRestaurante(){
    var rest={
      idPropietario:this.authService.auth.currentUser.uid,
      categoria: this.selectCategoria,
      descripcion:this.descripcion,
      horario:this.horario,
      imagenPropietario:this.imagenP,
      imagenRestaurante:this.urlimg,
      nombrePropietario:this.propietario,
      nombreRestaurante:this.restaurantname,
      telefono:this.telefono,
      ubicacion:this.ubicacion
    }
    this.admS.addRestaurant(rest);
    this.navCtrl.push(UserPrincipalPage);
    this.urlimg="";
  }

}
