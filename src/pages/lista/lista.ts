import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginService } from '../../services/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../../model/user/user.model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CompraService } from '../../services/compra/compra.service';
import { TabsPage} from '../tabs/tabs'


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    user : User ={
      email : undefined,
      password : undefined,
      nombre: undefined,
      telefono: undefined
    }
    compras: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loginService: LoginService, 
              public authService: AngularFireAuth,
              public db: AngularFireDatabase, 
              private comprasService: CompraService,
              public tabs: TabsPage ,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

      this.redirect();


     }


  ionViewDidLoad() {

    this.redirect();

    if(this.authService.auth.currentUser != null){

      this.user.email = this.authService.auth.currentUser.email;
      this.compras = this.comprasService.getCompras(this.authService.auth.currentUser.uid);
      this.tabs.showTab=true;

    }



  }

 ionViewWillEnter(){}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);

  }


  isLoggedIn() {

    this.tabs.showTab=true;
    return this.authService.authState.pipe(first()).toPromise();

  }

  async redirect() {

    const user = await this.isLoggedIn();

    if (!user) {

      this.navCtrl.setRoot(LoginPage);
      this.tabs.showTab=true;

    } else {

      // do something else
    }
  }

  logout(){

    this.loginService.logoutUser().then( ref =>{

      this.tabs.showTab=false;

      const toast = this.toastCtrl.create({
        message: 'Logout',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      
    });

    this.navCtrl.setRoot(LoginPage);



  }



}
