import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  payments: Payment[];

  constructor(private http: HttpClient) {}

  loadPayments() {
    this.http.get<Payment[]>('http://localhost:3000/tasks').subscribe(payments => {
      this.payments = payments;
      console.log(this.payments);
    });
  }
}
