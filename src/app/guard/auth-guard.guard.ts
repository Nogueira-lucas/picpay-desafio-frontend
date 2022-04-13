import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  user: User;

  constructor(private router: Router, private userService) {}

  canActivate(): boolean {
    this.user = this.userService.getUserFromtorage();

    if (this.user) return true;

    this.router.navigate(['auth']);
    return null;
  }
}
