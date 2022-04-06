import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserFacade } from '../facade/user.facade';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;

  constructor(private router: Router, private userFacade: UserFacade) { }
  
  canActivate(): boolean {
    this.user = this.userFacade.getUser();

    if (this.user) {  return true; }

    this.router.navigate(['auth']);
    return false;
  }
}
