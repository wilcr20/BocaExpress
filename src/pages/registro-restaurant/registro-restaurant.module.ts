import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroRestaurantPage } from './registro-restaurant';

@NgModule({
  declarations: [
    RegistroRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroRestaurantPage),
  ],
})
export class RegistroRestaurantPageModule {}
