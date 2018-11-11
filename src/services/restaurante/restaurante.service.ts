import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

 
@Injectable()
export class RestauranteService {

    private restauranteListRef = this.db.list<any>('Restaurante');
 
    constructor(private db: AngularFireDatabase) { }
 
    getRestauranteList() {
        return this.restauranteListRef;
    }
}