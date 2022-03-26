import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPaymentService } from 'src/app/components/payments/add-payment.service';
import { Payment } from 'src/app/components/payments/payment.model';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private addPaymentService: AddPaymentService
    ) { }

  ngOnInit(): void {
  }

}
