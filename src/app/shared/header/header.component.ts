import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'pf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  get currentRoute() {
    return this._router.url;
  } 

  openProfileMenu() {
    this.trigger.openMenu();
  }

  goToUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  logout() {
    this._authService.logout();
    this._snackBar.open('Logout feito com sucesso!');
    this._router.navigateByUrl('/login');
  }
}
