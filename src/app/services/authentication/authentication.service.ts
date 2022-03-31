import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { SERVER_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    let result = {
      success: false,
      message: 'Email não existe ou não cadastrado'
    };

    return this.http.get(SERVER_URL + '/account?email='+username).pipe(map((data: any) => {
      if (data && data.length > 0) {
        result.message = 'Senha não confere';
        for (let index = 0; index < data.length; index++) {
          const user = data[index];
          if (user.password == password) {
            localStorage.setItem('user_session', user);
            result.success = true;
            result.message = 'Login realizado com sucesso';
            break;
          }
        }
      }
      return result;
    }));
  }

  logout() {
    localStorage.removeItem('user_session');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('user_session');
  }


}
