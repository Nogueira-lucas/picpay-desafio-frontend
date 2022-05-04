import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { OStore } from "@fireflysemantics/slice";
import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";


/** mock de chaves JWT e mensagens de erro*/
export const USER_KEY = "USER_KEY";
export const AUTHENTICATION_ERROR_KEY = "AUTHENTICATION_ERROR_KEY"; 
export const AUTHENTICATION_ERROR_MESSAGE = 'Invalid username or password';

@Injectable({providedIn: 'root'})
export class AuthService {

    public ostore = new OStore({ email: 
      {
        value: '', 
        reset: ''
      }
    });

      //REACTIVE STATE OBSERVABLES
    public user$:Observable<string>;
    public isAuthenticated$:Observable<boolean>; 
    public authenticationError$:Observable<string | boolean>;

    constructor(
      private snackBar: MatSnackBar,
      private router: Router) {
        //INICIALIZANDO OBJEST STORE
        this.ostore.post(USER_KEY, null);
        this.ostore.post(AUTHENTICATION_ERROR_KEY, false);
        //INICIALIZANDO ESTADO INICIAL DE isAuthenticated$
        this.isAuthenticated$ = this.ostore.observe(USER_KEY).pipe(map(u=>!!u));
        this.authenticationError$ = this.ostore.observe(AUTHENTICATION_ERROR_KEY);
        this.user$=this.ostore.observe(USER_KEY);
    }

    login(email: string, password:string) {
        this.authenticate(email, password).subscribe(
          user => {
            this.ostore.put(USER_KEY, user);
            this.ostore.put(AUTHENTICATION_ERROR_KEY, false);
            this.snackBar.open('sucesso', 'fechar', { duration: 1000})
            this.router.navigate(['/payments']);
          },
          (error)=>{
            this.snackBar.open('falha ao autenticar', 'fechar', { duration: 1000})
            this.ostore.put(AUTHENTICATION_ERROR_KEY, error);
          });
      }
    
      logout() {
        this.ostore.put(USER_KEY, null);
        this.router.navigate(['/']);
      }

        /**
         * Mock server authentication call
         */
        private authenticate(email:string, password:string) {
            // Mock Authentication Check
            if (email !== 'admin@gmail.com') {
                return throwError(AUTHENTICATION_ERROR_MESSAGE);
            }
            return of({ email: email });
        }
}