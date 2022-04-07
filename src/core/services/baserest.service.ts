import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injector } from "@angular/core";
import { environment } from "src/environments/environment";

export abstract class BaseRestService<T> {

    protected serverURL: string;
    protected http: HttpClient;

    constructor(
        protected injector: Injector,
        protected baseURL: string
    ) {
        this.http = injector.get(HttpClient);
        this.serverURL = environment.serverUrl;
    }

    getById(id: number): Observable<any> {
        return this.http.get<any>(`${this.serverURL}/${this.baseURL}/${id}`)
    }

    update(id: number, body: any): Observable<any> {
        return this.http.patch<any>(`${this.serverURL}/${this.baseURL}/${id}`, body)
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.serverURL}/${this.baseURL}/${id}`)
    }
}