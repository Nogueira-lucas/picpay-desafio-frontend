import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
