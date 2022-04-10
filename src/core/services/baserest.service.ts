import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from 'src/core/models/tasks.model';

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

    create(body: Task): Observable<Task> {
        return this.http.post<Task>(`${this.serverURL}/${this.baseURL}`, body);
    }

    update(id: number, body: Task): Observable<Task> {
        return this.http.patch<Task>(`${this.serverURL}/${this.baseURL}/${id}`, body);
    }

    delete(id: number): Observable<Task> {
        return this.http.delete<Task>(`${this.serverURL}/${this.baseURL}/${id}`);
    }
}
