import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import PaymentTask from 'src/models/payment-task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  listAllTasks(): Observable<PaymentTask[]>{
    return this.http.get<PaymentTask[]>(`${environment.apiUrl}/tasks`)
  }

  listTasksWithPagination(param: any): Observable<any>{
      return this.http.get<any>(`${environment.apiUrl}/tasks?_page=${param.page}&_limit=${param.limit}`)
  }

  createTask(paymentTask: PaymentTask):Observable<any>{
      return this.http.post<any>(`${environment.apiUrl}/tasks`, paymentTask)
  }

  updateTask(paymentTaskId: number, paymentTask: PaymentTask):Observable<any>{
      return this.http.put<any>(`${environment.apiUrl}/tasks/${paymentTaskId}`, paymentTask)
  }

  deleteTask(paymentTaskId: number): Observable<any>{
      return this.http.delete<any>(`${environment.apiUrl}/tasks/${paymentTaskId}`)
  }

}
