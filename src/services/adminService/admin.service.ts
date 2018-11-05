import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import {restaurante} from '../../model/restaurante/restaurante.model'


@Injectable()
export class adminService{

    private restauranteRef = this.db.list<restaurante>('Restaurante');
    //public restauranteRef:firebase.database.Reference = firebase.database().ref('/Restaurante');


    constructor(private db : AngularFireDatabase){}

    addRestaurant(rest: restaurante) {
      this.restauranteRef.push(rest);
  }

    getRestaurantesList() {
      return this.restauranteRef;
    }

    editRestaurante(restaurante){
        this.db.database.ref('Restaurante/'+restaurante.key).set(restaurante);
    }


}
