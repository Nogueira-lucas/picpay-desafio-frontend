import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPaymentService } from 'src/app/components/payments/add-payment.service';
import { Payment } from 'src/app/components/payments/payment.model';
import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: 'usuario@gmail.com',
    password: 'usuario'
  }

  hide = true;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  getLogin(email, password): void {
    this.loginService.getAccount().subscribe(account => {
      if(this.user.email == account[0].email){
        if(this.user.password == account[0].password){
          this.router.navigate(['/pagamentos']);
        }
        else{
          this.loginService.showMessage('Senha inválida');
        }
      }
      else {
        this.loginService.showMessage('Email inválido');
      }
     
    });
  }

}
