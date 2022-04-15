import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../middleware/user.service';

class User {
  email: string;
  senha: string;
}

@Injectable()
export class AuthService {

  private userAuthenticated: boolean = false

  constructor(private router: Router, private userService: UserService) {
    this.userAuthenticated = sessionStorage.getItem("auth") === 'true';
  }

  async login(user: User){

    const result = await this.userService.isAUser(user)

    if (result) {
      this.userAuthenticated = true;
      sessionStorage.setItem("auth","true")
      this.router.navigate(['/']);
      
    } else {
      this.userAuthenticated = false;
      sessionStorage.setItem("auth","false")
    }
  }
  
  logout(){
    sessionStorage.setItem("auth","false")
  }

  authenticated(){
    return this.userAuthenticated;
  }
}
