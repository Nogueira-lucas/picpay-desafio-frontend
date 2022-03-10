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
  avatar = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.authState$.subscribe(response => {      
      this.avatar = (response) ? response.usr.avatar : '/assets/images/avatar_default.png';
      this.isUserLoggedIn = (response) ? true : false
    });
  }

  goTo(routeName: string) {
    this.router.navigate([`/${routeName}`]);
  }

  logout():void {
    this.authService.logout();
    this.goTo('login');
  }
}
