import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBandejaPage } from './admin-bandeja';

@NgModule({
  declarations: [
    AdminBandejaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminBandejaPage),
  ],
})
export class AdminBandejaPageModule {}
