import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;


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

    let mapOptions = {
      center: coords,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      myLocationButton: true  
    }

    this.map = new google.maps.Map( this.mapElement.nativeElement,mapOptions);

    var dogwalkMarker = new google.maps.Marker({position: coords, title: "titulos"});
      dogwalkMarker.setMap(this.map);
  
  }
}
