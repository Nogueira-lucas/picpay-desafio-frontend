import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    this.user = this.userService.getUserFromStorage();

    if (this.user) return true;

    this.router.navigate(['auth']);
    return null;
  }
}
