import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //Este service faz um fake JWT para simular autenticação baseando em local storage e expiration Time
  }

  login() {
    return this.http.get('http://localhost:3000/account');
  }

  registrar(user: any) {
    return this.http.post('http://localhost:3000/account', user);
  }

  logout() {
    this._localStorageService.remove('accessToken');
    this._localStorageService.remove('expirationTime');
    this._localStorageService.remove('user');
    this._router.navigate(['/login']);
  }

  getUsers(){
    return this.http.get('http://localhost:3000/account');
  }

  generateGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateExpirationTime(){
    return new Date().getTime() + 3600000;
  }

  isTokenValid(){
    let token = this._localStorageService.get('accessToken');
    if (token != null) {
      let expirationTime = this._localStorageService.get('expirationTime');
      if (expirationTime != null) {
        if (expirationTime > new Date().getTime()) {
          return true;
        }
        else {
          this._localStorageService.remove('accessToken');
          this._localStorageService.remove('expirationTime');
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
}
