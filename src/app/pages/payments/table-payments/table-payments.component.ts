import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { getPagination } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements OnInit {
  modalStyle = ''
  search: string

  pages = [1]
  page = 1
  numEndPage = 1
  limit = 5
  totalPages = 0
  pageView = 5

  sort = 'id'
  order = 'desc'

  payments = []
  constructor(private _service: PaymentsService) { }

  ngOnInit(): void {
    this.getAll()
  }

  private async getAll(): Promise<void> {
    const { headers, body } = await this._service.getAll(this.page, this.limit, this.sort, this.order) as any
    this.payments = body;
    this.totalPages = headers.get('X-Total-Count')
    this.pages = getPagination(this.totalPages,this.limit,this.pageView,this.page)
    this.numEndPage = this.pages[this.pages.length - 1];
  }

  getByPageAll(event, p) {
    event.preventDefault();
    this.getByAll(p)
  }

  getByAll(p) {
    this.page = p
    this.getAll()
  }
}
