import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Task } from '../modules/payments/models/task';

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private readonly url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[] | any> {
    return this.http.get<Task[]>(`${this.url}/tasks`).pipe(delay(1000));
  }
}
