import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserFacade } from '../facade/user.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade) { }
  canActivate() {
    const user = this.userFacade.getUser()

    if (user)  return true;

    this.router.navigate(['auth']);
    return false;
  }
}
