import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Account from 'src/models/account.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  listAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${environment.apiUrl}/account`)
  }


}