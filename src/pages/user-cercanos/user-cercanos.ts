import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-user-cercanos',
  templateUrl: 'user-cercanos.html',
})
export class UserCercanosPage {

  @ViewChild("map") mapElement;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){

    let coords = new google.maps.LatLng(10.364245,-84.4838111);
    let mapOptions:  google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapOptions
      );
  }

}
