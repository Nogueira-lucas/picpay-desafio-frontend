import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user: User): Observable<any> {
    let params = {
      email: user.email,
      password: user.password
    }

    return this.http.get<any>(`${environment.apiUrl}/account`, { params: params }).pipe(
      tap((data) => {
        if (!data.length) return

        localStorage.setItem('user', btoa(JSON.stringify(data[0])));
        this.router.navigate(['']);
      }));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get loggedUser(): User {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')))
      : null;
  }

  get logged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }
}
