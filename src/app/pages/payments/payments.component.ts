import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { Payment } from '../../interfaces/payment.interface';
import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[]

  userName = ''
  limit = 5
  page = 1
  totalPayments = 0

  sortSelected = null

  sortOptions = {
    username: 'desc',
    title: 'desc',
    date: 'desc',
    value: 'desc',
    isPayed: 'desc'
  }

  constructor(
    private paymentsService: PaymentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    if (this.sortSelected) {
      this.sortOptions[this.sortSelected] = this.sortOptions[this.sortSelected] == 'asc' ? 'desc' : 'asc';
    }

    this.paymentsService.getPayments({
      username_like: this.userName,
      _limit: this.limit,
      _page: this.page,
      _sort: this.sortSelected ?? '',
      _order: this.sortOptions[this.sortSelected] ?? ''
    })
      .subscribe(resp => {
        let payments: Payment[] = resp.body;
        this.payments = payments;

        let totalPayments = Number(resp.headers.get("X-Total-Count"));
        this.totalPayments = totalPayments;
      });
  }

  openCreatePaymentModal() {
    const paymentModalRef = this.modalService.open(PaymentModalComponent);
    paymentModalRef.componentInstance.title = "Adicionar Pagamento";

    paymentModalRef.result
      .then((data: Payment) => {
        this.payments.unshift(data);
      })
      .catch(() => { })
  }

  sortBy(key: string) {
    this.sortSelected = key;
    this.getPayments();
  }

  filterByUserName() {
    this.page = 1;
    this.getPayments();
  }

  changePage(page: number) {
    this.page = page;
    this.getPayments();
  }
}
