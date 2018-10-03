import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHistorialComprasPage } from './user-historial-compras';

@NgModule({
  declarations: [
    UserHistorialComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(UserHistorialComprasPage),
  ],
})
export class UserHistorialComprasPageModule {}
