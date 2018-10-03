import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCercanosPage } from './user-cercanos';

@NgModule({
  declarations: [
    UserCercanosPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCercanosPage),
  ],
})
export class UserCercanosPageModule {}
