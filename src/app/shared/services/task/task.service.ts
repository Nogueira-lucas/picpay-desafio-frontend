import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITask } from '../../interfaces/task.inteface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private accountSubject = new BehaviorSubject<ITask[]>(null);
  public accountState$ = this.accountSubject.asObservable();

  constructor(private readonly http: HttpClient) { }

  getTasks(pageIndex: number, pageSize: number): Observable<ITask[]> {
    const params = (pageSize) ? new HttpParams().appendAll({_page: pageIndex, _limit: pageSize}) : new HttpParams();
    return this.http.get<ITask[]>(`${environment.api}/tasks`, {params}).pipe(map((response: ITask[]) => {
      return response ? response : [];
    }));
  }
}