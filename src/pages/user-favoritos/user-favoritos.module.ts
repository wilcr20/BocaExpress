import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFavoritosPage } from './user-favoritos';

@NgModule({
  declarations: [
    UserFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFavoritosPage),
  ],
})
export class UserFavoritosPageModule {}
