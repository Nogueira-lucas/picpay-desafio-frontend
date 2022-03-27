import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/views/login/login.service';
import { User } from 'src/app/views/login/user.model';
import { AddPaymentService } from '../payments/add-payment.service';
import { Payment } from '../payments/payment.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: User
  payments: Payment[]
  
  constructor(
    private loginService: LoginService,
    private addPaymentService: AddPaymentService
  ) { }

  ngOnInit(): void {
    this.getDataUser();
    this.getDataPayments();
  }

  getDataUser(): void {
    this.loginService.getAccount().subscribe(account => {
      this.user = account[0];
    });
  }
  
  getDataPayments(){
    this.addPaymentService.read().subscribe(payments => {
      this.payments = payments;
    });
  }

}
