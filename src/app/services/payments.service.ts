import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../shared/models/payment.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends RepositoryService {


  async getBy(id: number) {
    return await new Promise((r) => this.get(`tasks/${id}`).subscribe(data => r(data)));
  }

  async getAll(page: number, limit: number, sort: string, order: string) {
    const params = `tasks?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    return await new Promise((r) => this.get(params).subscribe(response => {
      r(response)
    })) 
  }

  async save(data: Payment) {
    if (data.id)
      return await new Promise((r) => this.put(`tasks/${data.id}`, data).subscribe(data => r(data)))
    else
      return await new Promise((r) => this.post('tasks', data).subscribe(data => r(data)))
  }

}
