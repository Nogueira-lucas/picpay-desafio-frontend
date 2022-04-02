import { Injectable, Injector } from "@angular/core";
import { BaseRestService } from "./baserest.service";
import { Task } from "../models/tasks.model"
import { Observable } from "rxjs";

@Injectable()
export class taskService extends BaseRestService<Task> {

    constructor(protected injector: Injector) {
        super(injector, "tasks")
    }

    getAll(name = null, username = null, isPayed = null, date = null, title = null, page = 0): Observable<any> {

        var params = null;

        if (name) params = `?name=${name}`;
        if (username) params ? params += `&username=${username}` : params = `?username=${username}`;
        if (isPayed) params ? params += `&isPayed=${isPayed}` : params = `?isPayed=${isPayed}`;
        if (isPayed) params ? params += `&date=${date}` : params = `?date=${date}`;
        if (title) params ? params += `&title=${title}` : params = `?title=${title}`;

        params = params ? `&page=${page}` : `?page=${page}`;

        return this.http.get<any>(`${this.serverURL}/${this.baseURL}${params}`)
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