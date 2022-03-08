import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements OnInit {
  modalStyle = ''
  search: string
  limitPagination = 5

  payments = []
  constructor(private _service: PaymentsService) { }

  ngOnInit(): void {
    this.getAll()
  }
  
  private async getAll(): Promise<void> {    
      this.payments = await this._service.list() as []  
  }

  getByAll(){
    this.getAll()
  }

  changeLimitPagination(e){
    e.preventDefault()
  }

}
