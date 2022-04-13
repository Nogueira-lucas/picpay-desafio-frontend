import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Task from 'src/models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  listAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`)
  }

  listTasksWithPagination(param: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/tasks?_page=${param.page}&_limit=${param.limit}`)
  }

  createTask(task: Task):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/tasks`, task)
  }

  updateTask(taskId: number, task: Task):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/tasks/${taskId}`, task)
  }

  deleteTask(taskId: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/tasks/${taskId}`)
  }

}
