import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  payments: Payment[];

  constructor(private http: HttpClient) {}

  loadPayments(page: number, limit: number, username: string = null): Observable<HttpResponse<Payment[]>> {
    const params = username
      ? {
          _page: page,
          _limit: limit,
          name_like: username,
        }
      : {
          _page: page,
          _limit: limit,
        };
    return this.http.get<Payment[]>(`${environment.API}/tasks`, {
      observe: 'response',
      params,
    });
  }

  updatePayment(payment: Payment) {
    return this.http.put(`${environment.API}/tasks/${payment.id}`, {
      ...payment,
    });
  }

  deletePayment(payment: Payment) {
    return this.http.delete(`${environment.API}/tasks/${payment.id}`);
  }

  addPayment(payment: Payment) {
    return this.http.post(`${environment.API}/tasks`, { ...payment });
  }
}
