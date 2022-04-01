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

  getPayments(currentPage: number = 0): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API}/tasks?_page=${currentPage}&_limit=20`);
  }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(`${this.API}/tasks`, payment);
  }

  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(`${this.API}/tasks/${payment.id}`, payment);
  }
}