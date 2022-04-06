import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentRemoveComponent } from '../payment-remove/payment-remove.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  paymentList$: Observable<Payment[]>;

  constructor(private paymentFacade: PaymentFacade, private modalService: NgbModal) {
    this.paymentList$ = this.paymentFacade.getPayments$();
  }

  ngOnInit() {
    this.subscriptions.push(this.paymentFacade.loadPayments().subscribe());
  }

  updateIsPayed(payment: Payment) {
    const request = this.paymentFacade.updatePayment(payment)
    this.subscriptions.push(request.subscribe(sub => this.subscriptions.push(sub)));
  }

  openPayment(payment: Payment = null) {
    this.openModal(payment, PaymentFormComponent);
  }

  removePayment(payment: Payment) {
    this.openModal(payment, PaymentRemoveComponent);
  }

  openModal(payment: Payment = null, component) {
    const modal = this.modalService.open(component);
    modal.componentInstance.payment = JSON.parse(JSON.stringify(payment)) as Payment;
  }

  changedSearch(filter: string) {
    this.subscriptions.push(this.paymentFacade.loadPaymentsByUser(filter).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
