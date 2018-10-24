import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {


  userOption : Array<{name: string}>;
  option     : Array<{name: string}>;

  categorieOption : Array<{name: string}>;
  alternative     : Array<{name: string}>;
  
  estado:any = "null";
  image: string = null;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public camera: Camera) {

    this.option  = [{ name: "Cliente" },{name: "Restaurante"}]; 

    this.alternative  = [{ name:"Comida Rapida" },
                         {name: "Familiar"},
                         {name: "Buffet"},
                         {name: "Temáticos"},
                         {name: "Para llevar"},
                         {name: "Oriental"}]; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  onItemSelection(selection) {

    if(selection.name == "Cliente"){
      this.estado="Cliente";
    }else{
      this.estado="Restaurante";
    }
  }

  takePhoto(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     //console.log(base64Image);
    }, (err) => {
     // Handle error
    });

  }

  getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
}

