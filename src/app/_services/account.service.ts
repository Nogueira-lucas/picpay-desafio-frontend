import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

import { Account } from "../_models/account";

@Injectable({ providedIn: 'root' })
export class AccountService {

    private readonly serviceUrl = environment.apiUrl + "account/";

    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;

    constructor(
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('account')));
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    login(email, password) {

        // TODO improve login request
        if (!password) return;

        return this.http.get<Account[]>(`${this.serviceUrl}?email=${email}`)
            .pipe(
                map(accountList => {
                    if (!accountList.length) throw Error("Conta não encontrada");
                    if (accountList[0].password !== password) throw Error("Senha inválida");

                    localStorage.setItem('account', JSON.stringify(accountList[0]));
                    this.accountSubject.next(accountList[0]);
                    return accountList[0];
                })
            );
    }

}