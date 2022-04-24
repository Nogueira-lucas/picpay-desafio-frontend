import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagamentoModel } from '../model/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
    ) { }

  getTasks(): Observable<PagamentoModel[]> {
    return this.http.get<PagamentoModel[]>('http://localhost:3000/tasks')
  }

  deleteTask(id: number): Observable<PagamentoModel> {
    return this.http.delete<PagamentoModel>('http://localhost:3000/tasks/' + id)
  }

  putTask(pagamento: PagamentoModel): Observable<PagamentoModel> {
    return this.http.put<PagamentoModel>('http://localhost:3000/tasks/' + pagamento.id, {
      id: pagamento.id,
      name: pagamento.name,
      username: pagamento.username,
      title: pagamento.title,
      image: pagamento.image,
      date: pagamento.date,
      value: pagamento.value,
      isPayed: pagamento.isPayed
    })
  }

  postTask(pagamento: PagamentoModel): Observable<PagamentoModel> {
    return this.http.post<PagamentoModel>('http://localhost:3000/tasks', {
      name: pagamento.name,
      username: pagamento.username,
      title: pagamento.title,
      image: pagamento.image,
      date: pagamento.date,
      value: pagamento.value,
      isPayed: pagamento.isPayed
    })
  }
}
