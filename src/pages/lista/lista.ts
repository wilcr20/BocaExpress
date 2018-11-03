import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { UserHistorialComprasPage } from '../user-historial-compras/user-historial-compras';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';
import { LoginService } from '../../services/login/login.service';
import { EmailValidator } from '@angular/forms';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../model/user/user.model';
import { Observable } from 'rxjs';
import { TabsPage } from '../tabs/tabs';
import { UserPrincipalPage } from '../user-principal/user-principal';
import { TabsPageModule } from '../tabs/tabs.module';
import { first } from 'rxjs/operators';
import { Platillo } from '../../model/platillo/platillo.model';
import { PlatilloService } from '../../services/platillo/platillo.service';
import { CompraService } from '../../services/compra/compra.service';



@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

    user : User ={
      email : undefined,
      password : undefined
    }
    compras: Observable<any[]>;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loginService: LoginService, public authService: AngularFireAuth,
     public db: AngularFireDatabase, private comprasService: CompraService ) {

      this.redirect();
    
      
     }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
    
    this.redirect();
    if(this.authService.auth.currentUser != null){
      this.user.email = this.authService.auth.currentUser.email;
      this.compras = this.comprasService.getCompras(this.authService.auth.currentUser.uid);
   
    }
    
    
    
  }
ionViewWillEnter(){
  

}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.navCtrl.push(page.component);
  
  }
  isLoggedIn() {
    return this.authService.authState.pipe(first()).toPromise();
 }
  async redirect() {
    const user = await this.isLoggedIn()
    if (!user) {
     this.navCtrl.setRoot(LoginPage);
    } else {
      // do something else
   }
  }

  logout(){
    this.loginService.logoutUser();

    this.navCtrl.setRoot(LoginPage);
    
  }



}
