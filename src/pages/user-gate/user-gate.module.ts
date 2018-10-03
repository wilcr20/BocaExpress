import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGatePage } from './user-gate';

@NgModule({
  declarations: [
    UserGatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserGatePage),
  ],
})
export class UserGatePageModule {}
