import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingHistoryPage } from './shopping-history';

@NgModule({
  declarations: [
    ShoppingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingHistoryPage),
  ],
})
export class ShoppingHistoryPageModule {}
