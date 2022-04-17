import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Account from 'src/models/account.model';
import UserLogin from 'src/models/user-login.model';
import { AccountService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    
  }

  goToPayments(){
    this.router.navigate(["home"])
  }

  login(){
    const login: UserLogin = {
      email: "usuario@gmail.com",
      password: "usuario"
    }

    this.authService.login(login)
    console.log(localStorage)
    
    if(localStorage.length > 0){
      this.goToPayments()
    } else {
      this.snackBar.open("Credenciais incorretas!", 'Ok', {
        duration: 5000,
      });
    }

  }

  onSubmit(){
    
  }


}
