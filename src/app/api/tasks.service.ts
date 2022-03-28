import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../app.api';
import { Tasks } from './data/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private controller = 'tasks'

  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${API}/${this.controller}`)
  }

  getTasksId(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(`${API}/${this.controller}/${id}`)
  }

  postTasks(body: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${API}/${this.controller}`, body)
  }

  putTasks(body: Tasks, id: number): Observable<Tasks> {
    return this.http.put<Tasks>(`${API}/${this.controller}/${id}`, body)
  }
  
  deleteTasks(id: number): Observable<any> {
    return this.http.delete(`${API}/${this.controller}/${id}`)
  }
}
