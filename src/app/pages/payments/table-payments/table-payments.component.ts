import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Payment } from 'src/app/shared/models/payment.model';
import { convertObjectInArray, getPagination } from 'src/app/shared/utils/utils';
import { PaymentInterface } from '../paymens.interface';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements OnInit {

  @Output() onEdit = new EventEmitter<Payment>();
  @Output() onGetAll = new EventEmitter<PaymentInterface>();

  @Input() payments = Array<Payment>()
  @Input() params: PaymentInterface

  modalStyle = String()
  search: string
  sortChange = { name: 'none', title: 'none', date: 'none', value: 'none', isPayed: 'none' }
  showDelete: boolean
  showConfirmPay: boolean
  payment = new Payment()

  constructor(private _service: PaymentsService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getAll()
  }

  private async getAll(): Promise<void> {
    this.onGetAll.emit(this.params);
  }

  onChangeSearch() {
    this.params.page = 1
    this.params.like = `&name_like=${this.search}`
    this.getAll()
  }

  getByPageAll(event, p) {
    event.preventDefault();
    this.getByAll(p)
  }

  getByAll(p) {
    this.params.page = p
    this.getAll()
  }

  sortBy(property) {
    eval(`this.sortChange.${property} = (this.sortChange.${property} === 'none') ? 'asc' : ((this.sortChange.${property} === 'asc') ? 'desc' : 'none')`)
    this.params.sort = Object.keys(this.sortChange).filter(c => this.sortChange[c] !== 'none').join(',')
    this.params.order = convertObjectInArray(this.sortChange).filter(c => c !== 'none').join(',')
    if (!Object.keys(this.sortChange).some(c => this.sortChange[c] !== 'none')) this.params.sort = 'id'
    this.getAll()
  }

  onResetFilter() {
    this.params.page = 1
    this.params.sort = 'id'
    this.params.order = 'desc'
    this.sortChange = { name: 'none', title: 'none', date: 'none', value: 'none', isPayed: 'none' }
    this.params.like = String()
    this.search = String()
    this.getAll()
  }

  edit(row) {
    this.onEdit.emit(row)
  }


  confirmDelete(row) {
    this.showDelete = true
    this.payment = row
  }

  async delete() {
    await this._service.remove(this.payment.id)
    this.showDelete = false
    this.getAll()
  }

  confirmPay(e,row) {
    this.showConfirmPay = true
    this.payment = row
    this.payment.isPayed = e.target.checked
  }

  async savePay() {
    const result = await this._service.save(this.payment) as Payment
    if (result?.id)
      this.alert.success("Salvo com sucesso!")
    else
      this.alert.error("Ocorreu um erro, por favor tente novamente!")
    this.showConfirmPay = false
    this.getAll()
  }
}
