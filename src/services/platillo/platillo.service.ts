import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Platillo } from '../../model/platillo/platillo.model';
 
@Injectable()
export class PlatilloService {
 
    private noteListRef = this.db.list<Platillo>('Platillo');
 
    constructor(private db: AngularFireDatabase) { }
 
    getPlatilloList() {
        return this.noteListRef;
    }
 
    addPlatillo(platillo: Platillo) {
        return this.noteListRef.push(platillo);
    }
 
    updatePlatillo(platillo: Platillo) {
        return this.noteListRef.update(platillo.precio, platillo);
    }
 
    removePlatillo(platillo: Platillo) {
        return this.noteListRef.remove(platillo.idRestaurante);
    }
}