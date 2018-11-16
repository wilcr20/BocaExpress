import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

//Firebase
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProductoPage } from '../producto/producto';


@IonicPage()
@Component({
  selector: 'page-user-favoritos',
  templateUrl: 'user-favoritos.html',
})
export class UserFavoritosPage {

  //todos los favoritos
  favoriteList: Observable<any[]>
  //todos los platillos
  dishList: Observable<any[]>

  //lista de platillos que si son favorotos del usuario
  platillos:  any[] = [];

  lista:  any[] = [];

  dish: Platillo = {
    descripcion: '',
    idRestaurante: '',
    nombre: '',
    precio: '',
    imagen: '',

  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public favoriteService: FavoritoService,
              public platilloService: PlatilloService,
              public auth : AngularFireAuth,
              public toastCtrl: ToastController) {

            this.getPlatillos();
            this.myFavorites();
  }

  getPlatillos(){

    //obtengo los platillos
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

    //obtengo los favoritos
    this.favoriteList = this.favoriteService.getFavoritoList()
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


  //hago el inner join de las listas y creo las relaciones
  myFavorites(){

    let key: string = "";

    if(this.auth.auth.currentUser != null){

      this.favoriteList.forEach(favorito => {
          favorito.forEach(indexFavorito => {
  
            if(indexFavorito.idCliente == this.auth.auth.currentUser.uid){

              this.dishList.forEach(platillo => {
                platillo.forEach(indexPlatillo => {
    
                  if(indexFavorito.idPlatillo == indexPlatillo.key){
    
                    key = indexPlatillo.key;

                    let result = this.lista.find( platillo => platillo == key);

                    if(result == undefined){
    
                      this.platillos.push({platillo:indexPlatillo, favoriteKey: indexFavorito.key });
                      this.lista.push(indexPlatillo.key);
    
                    }
    
                  }
    
                });
              });

            }
              
          });
      });

    }else{

      this.mensajeToast('Tienes que estar logueado para ver tus favoritos!');
    }

  }

  removeFavorite(platillo: any){
    
    this.favoriteService.removeFavorito(platillo.favoriteKey).then(ref => {

      this.platillos = [];
      this.lista     = [];
      this.getPlatillos();
      this.myFavorites();
    });
  }

  verPlatillo(platillo: any){
    this.navCtrl.push(ProductoPage, {platillo});
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
