import { Injectable, Injector } from '@angular/core';
import { BaseRestService } from '../baserest.service';
import { Task } from '../../models/tasks.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TaskService extends BaseRestService<Task> {

    constructor(protected injector: Injector) {
        super(injector, 'tasks');
    }

    findAll(name = null, username = null, isPayed = null, date = null, title = null, sortField = null,
            sortDirection = null, page = 1, limit = 10): Observable<Task[]> {

        let params = null;

        if (name) { params = `?name_like=${name}`; }
        if (username) { params ? params += `&username=${username}` : params = `?username=${username}`; }
        if (isPayed) { params ? params += `&isPayed=${isPayed}` : params = `?isPayed=${isPayed}`; }
        if (isPayed) { params ? params += `&date=${date}` : params = `?date=${date}`; }
        if (title) { params ? params += `&title=${title}` : params = `?title=${title}`; }
        if (sortField) { params ? params += `&_sort=${sortField}` : params = `?_sort=${sortField}`; }
        if (sortDirection) { params ? params += `&_order=${sortDirection}` : params = `?_order=${sortDirection}`; }
        if (page) { params ? params += `&_page=${page}` : params = `?_page=${page}`; }
        if (limit) { params ? params += `&_limit=${limit}` : params = `?_limit=${limit}`; }

        return this.http.get<Task[]>(`${this.serverURL}/${this.baseURL}${params}`);
    }

}
