import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentModalComponent } from './../payment-modal/payment-modal.component';
import { PaymentsService } from './../payments.service';
import { Payment } from './../payment.interface';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  @Input() payments!: Payment[];

  constructor(
    private paymentsService: PaymentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  deletePayment(id: number): void {
    this.paymentsService.deletePayment(id).subscribe(() => {
      let index = this.payments.findIndex((p) => p.id == id);
      this.payments.splice(index, 1);
    });
  }

  openEditPaymentModal(payment: Payment) {
    const paymentModalRef = this.modalService.open(PaymentModalComponent);
    paymentModalRef.componentInstance.payment = payment;

    paymentModalRef.result.then((data: Payment) => {
      let index = this.payments.findIndex((p) => p.id == payment.id);
      this.payments.splice(index, 1, data);
    })
  }
}
