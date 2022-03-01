import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Payment } from './payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  getPayments(params = {}) {
    return this.http.get<Payment[]>(`${environment.apiUrl}/tasks`, { params: params });
  }

  getPaymentById(id: number) {
    return this.http.get<Payment>(`${environment.apiUrl}/tasks/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.apiUrl}/tasks`, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.patch<Payment>(`${environment.apiUrl}/tasks/${payment.id}`, payment);
  }

  deletePayment(id: number): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}
