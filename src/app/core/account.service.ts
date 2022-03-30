import { Injectable } from '@angular/core';
import { AccountModel } from '@models/account.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
const PATH = 'account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private _httpService: HttpService) { }

    getAccounts = (): Observable<Array<AccountModel>> => this._httpService.get(`${PATH}`);
    updateAccount = (account: AccountModel): Observable<AccountModel> =>
        this._httpService.put(`${PATH}/${account.id}`, account);
}
