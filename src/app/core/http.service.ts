import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private _httpClient: HttpClient) { }

    get(path: string, params?: HttpParams): Observable<any> {
        return this._httpClient.get<any>(`${environment.apiUrl}/${path}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: params
        });
    }

    post(path: string, body: object): Observable<any> {
        return this._httpClient.post<any>(`${environment.apiUrl}/${path}`, JSON.stringify(body), {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    put(path: string, body: object): Observable<any> {
        return this._httpClient.put<any>(`${environment.apiUrl}/${path}`, JSON.stringify(body), {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    delete(path: string): Observable<any> {
        return this._httpClient.delete<any>(`${environment.apiUrl}/${path}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    request(path: string, body: object, method: string = 'GET'): Observable<any> {
        return this._httpClient.request<any>(method, `${environment.apiUrl}/${path}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
            responseType: 'json'
        });
    }
}
