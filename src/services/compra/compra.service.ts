import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Compra } from '../../model/compra/compra.model';

@Injectable()
export class CompraService{

    private compraListRef = this.db.list<Compra>('Compra');

    constructor(private db : AngularFireDatabase){}

    addCompra(compra: any) {
        return this.compraListRef.push(compra);
    }

    getCompras(uid : string){
        return this.db.list('/Compra/',ref => ref.orderByChild("idCliente").equalTo(uid)).valueChanges();
    }

}