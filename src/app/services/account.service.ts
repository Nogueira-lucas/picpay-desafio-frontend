import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AccountInterface } from "../models/account.interface";
import { PaymentsInterface } from "../models/payments.interfaces";

@Injectable({providedIn: 'root'})
export class AccountService {

    baseUrl = environment.baseUrl

    constructor(private http: HttpClient) {

    }

    allAccounts() {
        return this.http.get<AccountInterface[]>
            (`${this.baseUrl}/accounts`)
    }
}