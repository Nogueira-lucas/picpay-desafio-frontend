import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayments(pagination: Pagination, userName: string = null): Observable<Payment[]> {
    const param = !!userName ? '&name_like=' + userName : '';
    return this.http.get<Payment[]>(`${environment.API}/tasks?_page=${pagination.pageCurrent}&_limit=${pagination.pageSize}${param}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post(`${environment.API}/tasks`, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.put(`${environment.API}/tasks/${payment.id}`, payment);
  }

  removePayment(paymentId: number): Observable<Payment> {
    return this.http.delete(`${environment.API}/tasks/${paymentId}`);
  }
}
