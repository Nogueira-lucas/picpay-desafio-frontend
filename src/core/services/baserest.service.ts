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
this.serverURL = environment.serverUrl
    }
}