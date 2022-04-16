import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Payment } from "../models/payment-model";
import { mockData } from "../mocks/mock-list";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private paymentsUrl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentsUrl);
  }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.paymentsUrl}/${id}`);
  }

  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(
      `${this.paymentsUrl}/${payment.id}`,
      payment,
      this.httpOptions
    );
  }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(`${this.paymentsUrl}`, payment, this.httpOptions);
  }

  deletePayment(payment: Payment): Observable<any> {
    return this.http.delete(`${this.paymentsUrl}/${payment.id}`);
  }
}
