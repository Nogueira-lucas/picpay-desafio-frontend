import { Injectable } from '@angular/core';
import { TaskModel } from '@models/task.model';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
const PATH = 'tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    refreshGetAll = new Subject<void>();

    constructor(private _httpService: HttpService) { }

    getAllTasks = (): Observable<Array<TaskModel>> => this._httpService.get(`${PATH}`);
    createTask = (task: TaskModel): Observable<TaskModel> =>
        this._httpService.post(`${PATH}`, task);
    updateTask = (task: TaskModel): Observable<TaskModel> =>
        this._httpService.put(`${PATH}/${task.id}`, task);
    deleteTask = (taskId: number): Observable<{}> =>
        this._httpService.delete(`${PATH}/${taskId}`);
    
    triggerGetAll = () => this.refreshGetAll.next(void 0);
}
