import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Favorito } from '../../model/favorito/favorito.model';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { FavoritoService } from '../../services/favorito/favorito.service';

/**
 * Generated class for the UserFavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-favoritos',
  templateUrl: 'user-favoritos.html',
})
export class UserFavoritosPage {

  //todos los favoritos
  favoriteList: Observable<Favorito[]>
  //todos los platillos
  dishList: Observable<any[]>

  //lista de platillos que si son favorotos del usuario
  platillos:  Platillo[] = [];

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
              public platilloService: PlatilloService) {

      this.getDish_and_favorites();
      this.myFavorites();

    
  }

  getDish_and_favorites(){

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

    this.favoriteList.forEach(favorito => {
        favorito.forEach(indexFavorito => {
 
          this.dishList.forEach(platillo => {
            platillo.forEach(indexPlatillo => {

              if(indexFavorito.idPlatillo == indexPlatillo.key){

                let result = this.lista.find( platillo => platillo == indexPlatillo.key);

                //significa no repetir datos
                if(result == undefined){

                  this.platillos.push(indexPlatillo);
                  this.lista.push(indexPlatillo.key);

                }
                
              }

            });
          });

        });
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFavoritosPage');
  }

}
