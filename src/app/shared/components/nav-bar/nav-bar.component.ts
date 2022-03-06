import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{
  
  user: User
  show = false

  constructor(private auth: AuthService) {
    this.user = auth.user
  }

  goOut(){
    this.auth.logout()
  }
}
