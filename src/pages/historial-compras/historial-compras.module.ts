import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialComprasPage } from './historial-compras';

@NgModule({
  declarations: [
    HistorialComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialComprasPage),
  ],
})
export class HistorialComprasPageModule {}
