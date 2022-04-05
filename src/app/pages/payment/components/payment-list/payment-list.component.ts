import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentRemoveComponent } from '../payment-remove/payment-remove.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  paymentList$: Observable<Payment[]>

  constructor(private paymentFacade: PaymentFacade, private modalService: NgbModal) {
    this.paymentList$ = this.paymentFacade.getPayments$();
  }

  async ngOnInit() {
    await this.paymentFacade.loadPayments().toPromise();
  }

  updateIsPayed(payment: Payment) {
    this.paymentFacade.updatePayment(payment);
  }

  openPayment(payment: Payment = null) {
    const modal = this.modalService.open(PaymentFormComponent)
    modal.componentInstance.payment = JSON.parse(JSON.stringify(payment ?? new Payment()))
  }

  removePayment(payment: Payment) {
    const modal = this.modalService.open(PaymentRemoveComponent)
    modal.componentInstance.payment = JSON.parse(JSON.stringify(payment))
  }

  async changedSearch(filter) {
    await this.paymentFacade.loadPaymentsByUser(filter).toPromise()
  }
}
