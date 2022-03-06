import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.accountState$.subscribe(response => this.isUserLoggedIn = (response) ? true : false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
