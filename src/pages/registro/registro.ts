import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginService } from '../../services/login/login.service';
import { UserPrincipalPage } from '../user-principal/user-principal';
import { User } from '../../model/user/user.model';
import { Profile } from '../../model/profile/profile.model';
import { PerfilService } from '../../services/perfil/perfil.service';
import { AngularFireAuth } from 'angularfire2/auth';




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

  user : User ={
    email : undefined,
    password : undefined,
    nombre:  undefined,
    telefono: undefined
  }

  profile : Profile = {
    nombre : "",
    telefono : "",
    user_id : ""

  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public camera: Camera,
              public authService :LoginService,
              public profileService : PerfilService,
              public auth : AngularFireAuth,
              public loginService : LoginService,
              public loadingCtrl: LoadingController) {

    this.option  = [{ name: "Cliente" },{name: "Restaurante"}]; 

    this.alternative  = [{ name:"Comida Rapida" },
                         {name: "Familiar"},
                         {name: "Buffet"},
                         {name: "Temáticos"},
                         {name: "Para llevar"},
                         {name: "Oriental"}]; 
    
  }

  ionViewDidLoad() {}

  onItemSelection(selection) {

    if(selection.name == "Cliente"){
      this.estado="Cliente";
    }else{
      this.estado="Restaurante";
    }
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
      
      this.image = 'data:image/jpeg;base64,' + imageData;//`data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });

  }

  createProfile(profile: Profile){

    this.profileService.newProfile(profile).then(ref => {})
    
  }


  signUpUser(email:string,password:string,nombre:string,telefono:string){

    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 1000,
      dismissOnPageChange: true
    }).present();


    this.authService.signUpUser(email,password).then(ref => {
      
      this.registerProfile(ref.user.uid,nombre,telefono);

    })
  }
   
  registerProfile(id: string,nombre: string,telefono: string){

    this.profile.nombre    = nombre;
    this.profile.telefono  = telefono;
    this.profile.user_id   = id;

    this.createProfile(this.profile);

    this.navCtrl.setRoot(UserPrincipalPage);
  

  }
}

