import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentParameters } from 'src/app/shared/models/payment-parameters';

@Injectable({
    providedIn: 'root',
})
export class PaymentsService {
    private apiURL = environment.api;

    constructor(private http: HttpClient) {}

    listAllPayments(params: PaymentParameters = {}): Observable<Payment[]> {
        const parameters = new URLSearchParams({ ...params } as { [key: string]: string }).toString();
        return this.http.get<Payment[]>(`${this.apiURL}/payments?${parameters}`);
    }

    deletePayment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/payments/${id}`);
    }

    updatePayment(payment: Payment): Observable<void> {
        return this.http.put<void>(`${this.apiURL}/payments/${payment.id}`, payment);
    }

    createPayment(payment: Payment): Observable<void> {
        return this.http.post<void>(`${this.apiURL}/payments`, payment);
    }

    markAsPaid(id: number, record: Partial<Payment>): Observable<void> {
        return this.http.patch<void>(`${this.apiURL}/payments/${id}`, record);
    }
}
