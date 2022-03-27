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
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  openProfileMenu() {
    this.trigger.openMenu();
  }

  logout() {
    this.authService.logout();
    this._snackBar.open('Logout feito com sucesso!');
    this.router.navigateByUrl('/login');
  }
}
