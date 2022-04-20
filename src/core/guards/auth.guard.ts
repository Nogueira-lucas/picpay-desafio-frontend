import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  tokenValid: boolean = false;

  constructor(private _authService: AuthService, private _router: Router, private _jwtHelper: JwtHelperService, private router: Router, private _localStorageService: LocalStorageService) { }
  
  ngOnInit(): void {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('accessToken') != null) {
      if (this._jwtHelper.isTokenExpired(localStorage.getItem('accessToken'))) {
        this._authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      else {
        return true;
      }
    }

    this.router.navigate(['/login']);

    return false;
  }
}