import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    localStorage.removeItem('access_token')
    
    return this.http
      .get(`${this.url}/account`, {
        params: payload,
      })
      .pipe(
        map((data) => {
          if(typeof data[0] === 'undefined'){
            throw Error("Usuário ou senha inválidos");
          }
          localStorage.setItem('access_token', `fakeJWT${btoa(data[0])}`)
        }),
        catchError((err) => {
          if(err.message) return throwError(err.message)
          return throwError("Serviço indisponível no momento!");
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')

    return !!token
  }
}
