import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeRestaurantPage } from './see-restaurant';

@NgModule({
  declarations: [
    SeeRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeRestaurantPage),
  ],
})
export class SeeRestaurantPageModule {}
