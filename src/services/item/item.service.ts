import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../../model/item/item.model';

 
@Injectable()
export class ItemService {
 
    private itemListRef = this.db.list<Item>('Item');
 
    constructor(private db: AngularFireDatabase) { }
 
    getItemList() {
        return this.itemListRef;
    }
 
    addItem(item: Item) {
        return this.itemListRef.push(item);
    }
 
    removeItem(key: any) {
        return this.itemListRef.remove(key);
    }
}