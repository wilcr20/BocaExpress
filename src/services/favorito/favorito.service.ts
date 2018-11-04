import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Favorito } from '../../model/favorito/favorito.model';

 
@Injectable()
export class FavoritoService {
 
    private favoritoListRef = this.db.list<Favorito>('Favoritos');
 
    constructor(private db: AngularFireDatabase) { }
 
    getFavoritoList() {
        return this.favoritoListRef;
    }

    getElemntById(){
        return this.favoritoListRef
    }
 
    addFavorito(favorito: Favorito) {
        return this.favoritoListRef.push(favorito);
    }
 
 
    removeFavorito(favoriteKey: any) {
        return this.favoritoListRef.remove(favoriteKey);
    }
}