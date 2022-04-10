import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppSettings } from '../settings/appSettings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate, CanDeactivate<unknown>, CanLoad {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAuthenticated = true;

    if (sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') !== AppSettings.TOKEN) {
      this.router.navigate(['/login']);
      isAuthenticated = false;
      this.snackbar.open('Token inválido.', 'PayFriends', {
        duration: 4000,
        panelClass: ['orange-snackbar']
      });
    }
    return isAuthenticated;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }
}
