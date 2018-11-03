import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Favorito } from '../../model/favorito/favorito.model';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Injectable()
export class LoginService {
    private loginService = this.authentication.auth;
    constructor(private authentication: AngularFireAuth) { }
 
    loginUser(email:string, password:string){
      
      return this.loginService.signInWithEmailAndPassword(email,password);
    }
    logoutUser(){
      return this.authentication.auth.signOut()
    .then(()=>{
      console.log("Sesión Cerrada");
     
    })
    .catch(error => console.log(error.message));
  }
  signUpUser(email:string,password:string){
    return this.authentication.auth.createUserWithEmailAndPassword(email,password);
  }
    
   
}