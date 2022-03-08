import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends RepositoryService {

  async list(page = 1, limit = 5, sort = 'date', order = 'asc'){
    const params = `tasks?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    return await new Promise((r) => this.get(params).subscribe( data =>  r(data)));
  }

}
