import { Injectable, Injector } from "@angular/core";
import { BaseRestService } from "./baserest.service";
import { Account } from "../models/account.model"
import { Observable } from "rxjs";

@Injectable()
export class accountService extends BaseRestService < Account > {

    constructor(protected injector: Injector){
        super(injector, "account")
    }

    login(body:any): Observable<any>{
        return this.http.post<any>(`${this.serverURL}/${this.baseURL}`,body)
    }

    update(id:number, body:any): Observable<any>{
        return this.http.patch<any>(`${this.serverURL}/${this.baseURL}/${id}`,body)
    }

}