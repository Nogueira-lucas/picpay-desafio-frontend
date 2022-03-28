import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private apiURL = environment.api

  constructor(private http : HttpClient) {}
  
  listAllTasks() {
   return this.http.get<Payment[]>(`${ this.apiURL }/tasks`)
  }
  deleteTask(id: number) {
    return this.http.delete<Payment[]>(`${ this.apiURL }/tasks/${id}`)
   }
}
