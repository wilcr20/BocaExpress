import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminLocalPage } from './admin-local';

@NgModule({
  declarations: [
    AdminLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminLocalPage),
  ],
})
export class AdminLocalPageModule {}
