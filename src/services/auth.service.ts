import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import UserLogin from 'src/models/user-login.model';
import Account from 'src/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    accounts: Account[] = []
    fakeJwtToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { 
        this.listAccounts().subscribe((accounts: Account[]) => {
           this.accounts = accounts;
        }, error => {
            console.log(error.message)
        })
    }

    listAccounts(): Observable<Account[]>{
        return this.http.get<Account[]>(`${environment.apiUrl}/account`)
    }

    login(user: UserLogin){    
        if(this.accounts.findIndex(account => account.email === user.email && account.password === user.password) !== -1){
            this.setToken(this.createToken())
        } else {
            localStorage.clear()
        }
    }

    logout(){
        localStorage.clear()
        this.router.navigate(["login"])
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    createToken(){
        return this.fakeJwtToken;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}