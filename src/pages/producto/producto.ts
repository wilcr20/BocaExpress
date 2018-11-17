import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';

import { Favorito } from '../../model/favorito/favorito.model';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { ShoppingService } from '../../services/shopping/shopping.service';
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
              public loadingCtrl: LoadingController,
              public shoppingService: ShoppingService) {

              this.platillo= this.navParams.get('platillo');
  }

  addFavoritos(platillo: any){

    if(this.auth.auth.currentUser != null){
      //cambia el estado del icono
      this.visible = !this.visible;
  
      try {
        //llena el json de favorito
        this.favorito.idPlatillo = platillo.key;
        this.favorito.idCliente  = this.auth.auth.currentUser.uid;
    
        //agrega un favorito a firebase
        this.favoritoService.addFavorito(this.favorito).then(ref => {

          //muestra una notificación
          this.mensajeLoading('Agregando favorito...');
  
        });
      
      } catch (error) {
        this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
      }
    
    }else{
        
      this.mensajeToast('Tienes que estar logueado para agregar a favoritos!');
    }
  }

  verRestaurante(idRestaurante){

    this.navCtrl.push(SeeRestaurantPage, {idRestaurante});
    
  }

  verShopping(){
    if(this.auth.auth.currentUser != null){

      this.navCtrl.push(ShoppingPage);

    }else{

      this.mensajeToast('Tienes que estar logueado para agregar a shopping!');
    
    }
  }


  addShopping(platillo: any){

    if(this.auth.auth.currentUser != null){
    
      try {
        
        this.favorito.idPlatillo = platillo.key;
        this.favorito.idCliente  = this.auth.auth.currentUser.uid;
      
        this.shoppingService.addPlatillo(this.favorito).then(ref => {
        
          this.mensajeLoading('Agregando carrito de compras...');
    
        });

      } catch (error) {
        this.mensajeToast('Ha ocurrido un error intenta nuevamente!');
      }
      

    }else{
        
      this.mensajeToast('Tienes que estar logueado para agregar a carrito de compras!');

    }
  }


  mensajeLoading(mensaje: any){

    this.loadingCtrl.create({
      content: mensaje,
      duration: 200,
      dismissOnPageChange: true
    }).present();

  }

  mensajeToast(mensaje: any){

    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: 'top'
    });
    toast.present();

  }

  ionViewDidLoad() {}

}
