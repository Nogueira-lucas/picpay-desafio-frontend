import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  payments: Payment[];

  constructor(private http: HttpClient) {}

  loadPayments(page: number, limit: number, username: string = null): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>('http://localhost:3000/tasks', {
      observe: 'response',
      params: {
        _page: page,
        _limit: limit,
        name_like: !!username ? username : '',
      },
    });
  }

  updatePayment(payment: Payment) {
    return this.http.put(`http://localhost:3000/tasks/${payment.id}`, {
      ...payment,
      isPaid: !payment.isPaid,
    });
  }
}
