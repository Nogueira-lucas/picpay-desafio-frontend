import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { Payment } from './payment.interface';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[]

  limit = 5
  page = 1

  constructor(
    private paymentsService: PaymentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPayments({
      _limit: this.limit,
      _page: this.page
    });
  }

  getPayments(params): void {
    this.paymentsService.getPayments(params).subscribe((data: Payment[]) => {
      this.payments = data;
    });
  }

  openCreatePaymentModal() {
    const paymentModalRef = this.modalService.open(PaymentModalComponent);

    paymentModalRef.result.then((data: Payment) => {
      this.payments.unshift(data)
    })
  }
}
