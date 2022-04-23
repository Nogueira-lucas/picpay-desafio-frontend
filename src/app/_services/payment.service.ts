import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Payment } from '../_models/payment';
import { environment } from 'src/environments/environment';
import { JsonServerParams } from '../_models/json-server-params';
import { JsonServerResponse } from '../_models/json-server-response';
import { JsonServerProvider } from '../_helpers/json-server-provider';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PaymentService {

    private readonly serviceUrl = environment.apiUrl + "payments/";

    constructor(
        private httpClient: HttpClient,
        private provider: JsonServerProvider
    ) { }

    getAllPaginated(params: JsonServerParams): Observable<JsonServerResponse> {
        const urlParams = this.provider.makeParams(params);
        return this.httpClient.get<JsonServerResponse>(this.serviceUrl + urlParams, { observe: 'response' })
            .pipe(
                map(response => {
                    return this.provider.makeResponse(response)
                })
            )
    }

    create(payment: Payment) {
        if (!payment) return;
        return this.httpClient.post<Payment>(this.serviceUrl, payment)
    }

    update(payment: Payment) {
        if (!payment) return;
        return this.httpClient.put<Payment>(this.serviceUrl + payment.id, payment)
    }

    delete(id: number) {
        if (!id) return;
        return this.httpClient.delete<Payment>(this.serviceUrl + id)
    }

}