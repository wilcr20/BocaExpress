import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { UserHistorialComprasPage } from '../user-historial-compras/user-historial-compras';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pages = [
      { title: 'Historial', component: UserHistorialComprasPage },
      { title: 'Login', component: LoginPage },
      { title: 'Registro', component: RegistroPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.navCtrl.push(page.component);
  
  }

}
