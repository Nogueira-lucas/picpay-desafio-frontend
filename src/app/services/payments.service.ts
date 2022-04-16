import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Payment } from "../models/payment-model";
import { mockData } from "../mocks/mock-list";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private paymentsUrl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentsUrl);
  }
}
