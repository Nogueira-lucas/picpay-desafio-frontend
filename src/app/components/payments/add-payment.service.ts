
 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class AddPaymentService {

  baseUrl = 'http://localhost:3000/tasks';

  constructor(private snackBar: MatSnackBar, private http:HttpClient) { }

  showMessage(msg:string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  create(payment: Payment): Observable<Payment>{
    return this.http.post<Payment>(this.baseUrl, payment);
  }

  read(): Observable<Payment[]>{
    return this.http.get<Payment[]>(this.baseUrl);
  }

  readById(id: string): Observable<Payment>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Payment>(url);
  }

  update(payment: Payment): Observable<Payment>{
    const url = `${this.baseUrl}/${payment.id}`
    return this.http.put<Payment>(url, payment);
  }

  delete(id: number): Observable<Payment>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Payment>(url);
  }
}
