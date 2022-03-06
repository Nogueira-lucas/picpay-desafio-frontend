import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanLoad {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {
        return this.auth.isLoggedIn()
    }

    canLoad(): boolean {
        return this.auth.isLoggedIn()
    }
}