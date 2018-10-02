import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminComprasPage } from './admin-compras';

@NgModule({
  declarations: [
    AdminComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminComprasPage),
  ],
})
export class AdminComprasPageModule {}
