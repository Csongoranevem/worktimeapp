import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  private server = environment.serverUrl;
  private tokenName = environment.tokenName;

  private isLoggedIn  = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  login(token:string){
    sessionStorage.setItem(this.tokenName, token);
    console.log('AuthService login, token stored:', token);
    this.isLoggedIn.next(true);
  }

  logout(){
    sessionStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.tokenName);
    this.isLoggedIn.next(false);
  }

  loggedUser(){
    const token = sessionStorage.getItem(this.tokenName);
    if(token){
      return token; // itt kell visszaadni a felhasználót
    }
    return null;
  }

  storeUser(token:string){
    localStorage.setItem(this.tokenName, token);

  }

  isLoggedUser():boolean{
    return this.isLoggedIn.value;
  }


  getToken():boolean{
    const loc = localStorage.getItem(this.tokenName);
    if(loc){
      sessionStorage.setItem(this.tokenName, loc);
      return true
    }
    return false;

  }
}
