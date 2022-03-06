import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Authenticate } from 'src/app/domain/authenticate';
import { AuthenticationService } from 'src/app/service/authenticate/authentication.service';
import { AuthRouter } from '../auth-router';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        this.CheckLogin(url);
        return true;
    }

    CheckLogin(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            if (AuthRouter.CheckRoutePermission(url, this.authService._typeUser))
                return true;
            else
                this.router.navigate(['/home/not-permission']);

        } else {
            this.authService.logout();
            return false;
        }
    }
}