import { UserEditModel } from './../model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocationModel } from '../model/location.model';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl + 'account/';
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

  login(): Observable<UserEditModel> {
    return this.http.get<UserEditModel>(API_URL);
  }

  registrar(user: any): Observable<UserEditModel> {
    return this.http.post<UserEditModel>(API_URL, user);
  }

  logout(): void {
    this._localStorageService.remove('accessToken');
    this._localStorageService.remove('expirationTime');
    this._localStorageService.remove('user');
    this._router.navigate(['/login']);
  }

  getUsers(): Observable<UserEditModel[]>{
    return this.http.get<UserEditModel[]>(API_URL);
  }

  getUserById(userId: number): Observable<UserEditModel> {
    return this.http.get<UserEditModel>(API_URL + userId);
  }

  generateGuid(): string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateExpirationTime(): number{
    return new Date().getTime() + 3600000;
  }

  isTokenValid(): boolean{
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

  updateUser(user: UserEditModel): Observable<Object> {
    return this.http.put(API_URL + user.id, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  getLocation(): Observable<LocationModel> {
    return this.http.get<LocationModel>(environment.apiGeoLocation);
  }
}
