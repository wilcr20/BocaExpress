import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';

import { Favorito } from '../../model/favorito/favorito.model';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { SeeRestaurantPage } from '../see-restaurant/see-restaurant';
import { AngularFireAuth } from 'angularfire2/auth';
import { ShoppingPage } from '../shopping/shopping';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  platillo:any;
  visible = false;

  favorito: Favorito = {
    idPlatillo: '',
    idCliente: ''
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public favoritoService: FavoritoService,
              public toastCtrl: ToastController,
              public auth : AngularFireAuth,
              public loadingCtrl: LoadingController) {

              this.platillo= this.navParams.get('platillo');
  }

  addFavoritos(platillo: any){

    if(this.auth.auth.currentUser != null){
      //cambia el estado del icono
      this.visible = !this.visible;
  
      //llena el json de favorito
      this.favorito.idPlatillo = platillo.key;
      this.favorito.idCliente  = this.auth.auth.currentUser.uid;
  
      //agrega un favorito a firebase
      this.favoritoService.addFavorito(this.favorito).then(ref => {})
      
      //muestra una notificación
      this.loadingCtrl.create({
        content: 'Agregando favorito...',
        duration: 1000,
        dismissOnPageChange: true
      }).present();

    }else{
        
      const toast = this.toastCtrl.create({
        message: 'Tienes que estar logueado para agregar a favoritos!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }

  verRestaurante(idRestaurante){

    this.navCtrl.push(SeeRestaurantPage, {idRestaurante});
    
  }

  verShopping(){
    if(this.auth.auth.currentUser != null){

      this.navCtrl.push(ShoppingPage);

    }else{

      const toast = this.toastCtrl.create({
        message: 'Tienes que estar logueado para agregar a shopping!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }

  ionViewDidLoad() {}

}
