import { Injectable } from '@angular/core';
import firebase from 'firebase';

 
@Injectable()
export class searchbarService {
 
    public platilloList:Array<any>;
    public loadedPlatilloList:Array<any>;
    public platilloRef:firebase.database.Reference = firebase.database().ref('/Platillo');


    constructor() { }
    


}