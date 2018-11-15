import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Platillo } from '../../model/platillo/platillo.model';

@Injectable()
export class ShoppingService {

    private ShoppingListRef = this.db.list<any>('Shopping');

    constructor(private db: AngularFireDatabase) { }

    getPlatilloList() {
        return this.ShoppingListRef;
    }

    addPlatillo(platillo: any) {
        return this.ShoppingListRef.push(platillo);
    }

    updatePlatillo(platillo: Platillo) {
        return this.ShoppingListRef.update(platillo.precio, platillo);
    }

    removePlatillo(platillo: Platillo) {
        return this.ShoppingListRef.remove(platillo.idRestaurante);
    }

}
