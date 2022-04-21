import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Payment } from '../_models/payment';
import { environment } from 'src/environments/environment';
import { PaymentParams } from '../_models/listRequest';

@Injectable({ providedIn: 'root' })
export class PaymentService {

    private readonly serviceUrl = environment.apiUrl + "payments/";

    constructor(private httpClient: HttpClient) { }

    getAllPaginated(params: PaymentParams): Observable<Payment[]> {
        const urlParams = this.buildUrlParams(params);
        return this.httpClient.get<Payment[]>(this.serviceUrl + urlParams)
    }

    delete(id) {
        if (!id) return;
        return this.httpClient.delete<Payment>(this.serviceUrl + id)
    }

    private buildUrlParams(params: PaymentParams) {
        let urlParams = "";

        urlParams += "?_page=" + params.page;
        urlParams += "&_limit=" + params.limit;

        return urlParams;
    }

}