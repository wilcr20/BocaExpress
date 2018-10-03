import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPrincipalPage } from './user-principal';

@NgModule({
  declarations: [
    UserPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPrincipalPage),
  ],
})
export class UserPrincipalPageModule {}
