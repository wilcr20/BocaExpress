import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import {restaurante} from '../../model/restaurante/restaurante.model'
import firebase from 'firebase';


@Injectable()
export class adminService{

    //public urlRestaurants = "https://bocaexpress-3c2d9.firebaseio.com/Restaurante.json";
    private restauranteRef = this.db.list<restaurante>('Restaurante');
    //public restauranteRef:firebase.database.Reference = firebase.database().ref('/Restaurante');


    constructor(private db : AngularFireDatabase){}

    getRestaurantesList() {

      return this.restauranteRef;
  }


}
