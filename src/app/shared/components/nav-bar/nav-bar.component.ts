import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    user: User;
    constructor(private authService: AuthService) {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    out() {
        this.authService.logout();
    }
}
