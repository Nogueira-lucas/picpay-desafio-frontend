import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from 'src/core/models/tasks.model';
import { ITaskResponseDto } from 'src/core/dtos/task.dto';

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

    create(body: ITaskResponseDto): Observable<Task> {
        return this.http.post<Task>(`${this.serverURL}/${this.baseURL}`, body);
    }

    update(id: number, body: any): Observable<Task> {
        return this.http.patch<Task>(`${this.serverURL}/${this.baseURL}/${id}`, body);
    }

    delete(id: number): Observable<Task> {
        return this.http.delete<Task>(`${this.serverURL}/${this.baseURL}/${id}`);
    }
}
