import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import { RestauranteService } from '../../services/restaurante/restaurante.service';
import { restaurante } from '../../model/restaurante/restaurante.model';

@IonicPage()
@Component({
  selector: 'page-see-restaurant',
  templateUrl: 'see-restaurant.html',
})
export class SeeRestaurantPage {

  idRestaurante:any;
  restaurante: Observable<any[]>
  restauranteById: restaurante[] =  [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public restService: RestauranteService) {

              this.idRestaurante= this.navParams.get('idRestaurante');

              this.restaurante = this.restService.getRestauranteList()
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

  ionViewDidLoad() {
    
    this.restaurante.forEach(restaurante => {
      restaurante.forEach(element => {
        if(element.key == this.idRestaurante){
         this.restauranteById.push(element);
        }
      });
    });
  }

}
