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

  getTasks(pageIndex: number, pageSize: number): Observable<ITask[]> {
    const params = (pageSize) ? new HttpParams().appendAll({ _page: pageIndex, _limit: pageSize }) : new HttpParams();
    return this.http.get<ITask[]>(`${environment.api}/tasks`, { params }).pipe(map((response: ITask[]) => {
      return response ? response : [];
    }));
  }

  createTask(body: ITask): Observable<ITask> {
    body.id = Math.floor(Math.random() * 100) + 170;
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
