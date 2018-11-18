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
      this.db.database.ref('Platillo/'+platillo.key).remove();

    }

    getDishID(uid : string){
      return this.db.list('/Platillo/',ref => ref.orderByChild("idRestaurante").equalTo(uid)).valueChanges();
  }

    editPlatillo(platillo){
      this.db.database.ref('Platillo/'+platillo.key).set(platillo);
    }


    getPlatillo(platillo : string){
       return this.db.database.ref('Platillo/'+platillo);
    }
}
