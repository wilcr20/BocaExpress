import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Favorito } from '../../model/favorito/favorito.model';
import { FavoritoService } from '../../services/favorito/favorito.service';

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
              public toastCtrl: ToastController) {

              this.platillo= this.navParams.get('platillo');
  }

  addFavoritos(platillo: any){

    //cambia el estado del icono
    this.visible = !this.visible;

    //llena el json de favorito
    this.favorito.idPlatillo = platillo.key;
    this.favorito.idCliente  = 'null';

    //agrega un favorito a firebase
    this.favoritoService.addFavorito(this.favorito).then(ref => {})
    
    

    //muestra una notificación
    const toast = this.toastCtrl.create({
      message: 'Agregado a favoritos!',
      duration: 3000
    });
    toast.present();
  }

  verRestaurante(){
    //muestra una notificación
    const toast = this.toastCtrl.create({
      message: 'Se redireccionara a restaurante!',
      duration: 1000
    });
    toast.present();
  }

  ionViewDidLoad() {}

}
