import { TaskAction, TaskContract } from '../../interfaces/task.interface';
import { GenerateRandomString } from '../../../../shared/utils/generate-random-string';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITask } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskSubject = new BehaviorSubject<TaskContract>(null);
  public taskState$ = this.taskSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly generator: GenerateRandomString) { }

  emit(action: TaskAction, data = null) {
    this.taskSubject.next({action, data});
  }

  getTasks(pageIndex: number = 0, pageSize: number = null, filter = null): Observable<ITask[]> {

    let params = {};
    let searchParams = new HttpParams();

    if (filter) {
      params = filter;
    }

    params = (pageSize) ? {...params, ...{ _page: pageIndex, _limit: pageSize }} : params;

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v || v === false) {
          searchParams = searchParams.append(k, v as any);
        }
      }
    }

    return this.http.get<ITask[]>(`${environment.api}/tasks`, { params: searchParams }).pipe(map((response: ITask[]) => {
      return response ? response : [];
    }));
  }

  createTask(body: ITask): Observable<ITask> {
    body.id = Math.floor(Math.random() * (300 - 170 + 1) + 170);
    body.username = this.generator.create(body.name);

    return this.http.post<ITask>(`${environment.api}/tasks`, body).pipe(map((response: ITask) => {
      return response ? response : null;
    }));
  }

  updateTask(taskId: number, body: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${environment.api}/tasks/${taskId}`, body).pipe(map((response: ITask) => {
      return response ? response : null;
    }));
  }

  deleteTask(taskId: number): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.api}/tasks/${taskId}`).pipe(map((response: ITask) => {
      return response ? response : null;
    }));
  }
}
