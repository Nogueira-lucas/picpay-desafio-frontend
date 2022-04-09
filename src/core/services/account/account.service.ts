import { Injectable, Injector } from '@angular/core';
import { BaseRestService } from '../baserest.service';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AccountService extends BaseRestService<Account> {

    constructor(protected injector: Injector) {
        super(injector, 'account');
    }

    login(login: string, password: string): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.serverURL}/${this.baseURL}?login=${login}&password=${password}`);
    }

}
