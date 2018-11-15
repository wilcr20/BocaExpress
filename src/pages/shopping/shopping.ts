import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  pet: string = "puppies";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {}

}