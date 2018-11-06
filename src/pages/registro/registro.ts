import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginService } from '../../services/login/login.service';
import { UserPrincipalPage } from '../user-principal/user-principal';
import { User } from '../../model/user/user.model';
import { Profile } from '../../model/profile/profile.model';
import { PerfilService } from '../../services/perfil/perfil.service';
import { AngularFireAuth } from 'angularfire2/auth';


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

  user : User ={
    email : undefined,
    password : undefined
  }



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public camera: Camera,
              public authService :LoginService,
              public profileService : PerfilService,
              public auth : AngularFireAuth) {

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
        this.profileService.newProfile(profile);
  }

  signUpUser(email:string,password:string){
    this.authService.signUpUser(email,password);

    console.log("Registrado");

    var profile : Profile = {
      nombre : "Juan",
      telefono : "12124124",
      user_id : this.auth.auth.currentUser.uid

    }
   
    this.auth.auth.onAuthStateChanged(function(user){
      if(user){

        this.createProfile(profile);
      }
    })
    

    console.log(this.auth.auth.currentUser.email);
  

    this.navCtrl.setRoot(UserPrincipalPage);
  }
}

