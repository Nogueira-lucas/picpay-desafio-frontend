import { Injectable } from '@angular/core';
import { AccountModel } from '@models/account.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
const PATH = 'account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private httpService: HttpService) { }

    getAccounts = (): Observable<Array<AccountModel>> => this.httpService.get(`${PATH}`);
}
