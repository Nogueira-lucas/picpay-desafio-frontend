import { Component, OnInit } from '@angular/core'
import { PaymentsService } from 'src/app/services/payments.service'
import { Payment } from 'src/app/shared/models/payment.model'
import { getPagination } from 'src/app/shared/utils/utils'
import { PaymentInterface } from './paymens.interface'

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  addPayments = false
  payment: Payment
  payments = new Array<Payment>()
  
  params: PaymentInterface = {
    pages: [1],
    page: 1,
    numEndPage: 1,
    limit: 5,
    totalPages: 0,
    pageView: 5,    
    sort: 'id',
    order: 'desc',
    like: String()
  }

  constructor(private _service: PaymentsService) { }

  onEdit(data: Payment){
    this.payment = data
    this.addPayments = true
  }

  onFormHide(){
    this.addPayments = false
    this.payment = new Payment()
    this.getAll()
  }
  
  private async getAll(): Promise<void> {
    const { headers, body } = await this._service.getAll(this.params.page, this.params.limit, this.params.sort, this.params.order, this.params.like) as any
    this.payments = body;
    this.params.totalPages = headers.get('X-Total-Count')
    this.params.pages = getPagination(this.params.totalPages, this.params.limit, this.params.pageView, this.params.page)
    this.params.numEndPage = this.params.pages[this.params.pages.length - 1];
  }

  onGetAll(params){
    this.params = params
    this.getAll()
  }
}
