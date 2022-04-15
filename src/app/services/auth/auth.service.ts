import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ApiService } from '../../api/api.service';

class User {
  email: string;
  senha: string;
}

@Injectable()
export class AuthService {

  private userAuthenticated: boolean = false

  constructor(private router: Router, private apiService: ApiService) {
    this.userAuthenticated = sessionStorage.getItem("auth") === 'true';
  }

  login(user: User){

    this.apiService.getUserAccount(user).subscribe((data) => {this.userAuthenticated = data[0].legth > 0})

    if (this.userAuthenticated) {
      console.log('this.userAuthenticated: ', this.userAuthenticated);
      sessionStorage.setItem("auth","true")
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  logout(){
    sessionStorage.setItem("auth","false")
  }

  authenticated(){
    return this.userAuthenticated;
  }
}
