import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Platillo } from '../../model/platillo/platillo.model';

@Injectable()
export class PlatilloService {

    private platilloListRef = this.db.list<Platillo>('Platillo');

    constructor(private db: AngularFireDatabase) { }

    getPlatilloList() {
        return this.platilloListRef;
    }

    addPlatillo(platillo: Platillo) {
        return this.platilloListRef.push(platillo);
    }

    updatePlatillo(platillo: Platillo) {
        return this.platilloListRef.update(platillo.precio, platillo);
    }

    removePlatillo(platillo: Platillo) {
        return this.platilloListRef.remove(platillo.idRestaurante);
    }

    deletePlatillo(platillo){  /// borra platillo de manera general
      console.log(this.db.database.ref('Platillo/'+platillo.key));
      this.db.database.ref('Platillo/'+platillo.key).remove();

    }
}
