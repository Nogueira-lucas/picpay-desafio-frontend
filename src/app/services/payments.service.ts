import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PaymentsInterface } from "../models/payments.interfaces";

@Injectable({providedIn: 'root'})
export class PaymentsService {

    baseUrl = environment.baseUrl

    constructor(private http: HttpClient) {

    }

    allPayments() {
        return this.http.get<PaymentsInterface[]>
            (`${this.baseUrl}/tasks`)
    }

    getPaymentBy(id: number) {
        return this.http.get<PaymentsInterface>
            (`${this.baseUrl}/tasks/${id}`)
    }

    getPaymentByUser(username: string) {
        return this.http.get<PaymentsInterface[]>
            (`${this.baseUrl}/tasks?username=${username}`)
    }

    deleteBy(id: number) {
        return this.http.delete<PaymentsInterface>
            (`${this.baseUrl}/tasks/${id}`)
    }

    updateBy(id: number, payment: PaymentsInterface) {
        return this.http.patch<PaymentsInterface>
            (`${this.baseUrl}/tasks/${id}`, payment)
    }

    createPayment(payment: PaymentsInterface) {
        return this.http.post<PaymentsInterface>
            (`${this.baseUrl}/tasks`, payment)
    }
}