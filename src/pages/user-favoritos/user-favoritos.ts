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

    try {
      
      let i = 0;
      let j = 0;
    
      this.favoriteList.forEach(favorito => {
  
        if(favorito[i] != null){

          let id = favorito[i].idPlatillo;
  
          this.dishList.forEach(platillo =>{
              let key = platillo[j].key;
    
              if(id == key){
                //agregar platillo
                this.dish.nombre = platillo[j].nombre;
                this.dish.precio = platillo[j].precio;
                this.dish.imagen = platillo[j].imagen;
                
                try {
                  this.platillos.push(this.dish);
                } catch (error) {
                  console.log(error);
                }
                    
              }
              j++;
            });
          i++;
        }    
      });
      
    } catch (error) {
      console.log(error);
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFavoritosPage');
  }

}
