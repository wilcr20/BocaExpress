import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class CompraService{

    constructor(private db : AngularFireDatabase){}




    getCompras(uid : string){
        return this.db.list('/Compra/',ref => ref.orderByChild("idCliente").equalTo(uid)).valueChanges();
    }

}