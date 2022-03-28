import { Injectable } from '@angular/core';
import { TaskModel } from '@models/task.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
const PATH = 'tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private httpService: HttpService) { }

    getAllTasks = (): Observable<Array<TaskModel>> => this.httpService.get(`${PATH}`);
    createTask = (task: TaskModel): Observable<TaskModel> =>
        this.httpService.post(`${PATH}`, task);
    updateTask = (task: TaskModel): Observable<TaskModel> =>
        this.httpService.put(`${PATH}/${task.id}`, task);
    deleteTask = (taskId: number): Observable<{}> =>
        this.httpService.delete(`${PATH}/${taskId}`);
}
