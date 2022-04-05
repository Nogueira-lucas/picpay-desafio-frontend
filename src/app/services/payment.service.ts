import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getPayments(userName = null): Observable<Payment[]> {
    let param = !!userName ? "?name_like=" + userName : "";
    return this.http.get<Payment[]>(`${this.API}/tasks${param}`);
  }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(`${this.API}/tasks`, payment);
  }

  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(`${this.API}/tasks/${payment.id}`, payment);
  }

  removePayment(paymentId: number) {
    return this.http.delete(`${this.API}/tasks/${paymentId}`);
  }
}