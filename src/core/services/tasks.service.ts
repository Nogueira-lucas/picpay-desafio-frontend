import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentoModel } from '../model/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
    ) { }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks')
  }

  deleteTask(id: number) {
    return this.http.delete('http://localhost:3000/tasks/' + id)
  }

  putTask(pagamento: PagamentoModel) {
    return this.http.put('http://localhost:3000/tasks/' + pagamento.id, {
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
}
