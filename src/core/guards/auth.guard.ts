import { AuthService } from './../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  constructor(private _router: Router, private _authService: AuthService) { }
  
  ngOnInit(): void {

  }

  canActivate(): any {
    if (localStorage.getItem('accessToken') != null && this._authService.isTokenValid()) {
      return true;
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}