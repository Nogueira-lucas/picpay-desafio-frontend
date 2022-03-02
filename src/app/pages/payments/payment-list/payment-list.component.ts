import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PaymentsService } from '../../../services/payments.service';
import { Payment } from '../../../interfaces/payment.interface';
import { PaymentDeleteModalComponent } from '../payment-delete-modal/payment-delete-modal.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  @Input() payments!: Payment[];
  @Input() limit!: number;
  @Input() page!: number;
  @Input() totalPayments!: number;

  @Output() onSorted = new EventEmitter<string>();

  constructor(
    private paymentsService: PaymentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  updatePaymentPayed(payment: Payment) {
    payment.isPayed = !payment.isPayed;

    this.paymentsService.updatePayment(payment).subscribe((data: Payment) => {
      let index = this.payments.findIndex((p) => p.id == payment.id);
      this.payments.splice(index, 1, data);
    });
  }

  openDeleteModal(payment: Payment) {
    const paymentDeleteModalRef = this.modalService.open(PaymentDeleteModalComponent)

    paymentDeleteModalRef.componentInstance.payment = payment;

    paymentDeleteModalRef.result
      .then((confirm: boolean) => {
        if(confirm){
          this.deletePayment(payment.id)
        }
      })
      .catch(() => { })
  }

  deletePayment(id: number): void {
    this.paymentsService.deletePayment(id).subscribe(() => {
      let index = this.payments.findIndex((p) => p.id == id);
      this.payments.splice(index, 1);
    });
  }

  openEditPaymentModal(payment: Payment) {
    const paymentModalRef = this.modalService.open(PaymentModalComponent);
    paymentModalRef.componentInstance.title = "Editar Pagamento";
    paymentModalRef.componentInstance.payment = payment;

    paymentModalRef.result
      .then((data: Payment) => {
        let index = this.payments.findIndex((p) => p.id == payment.id);
        this.payments.splice(index, 1, data);
      })
      .catch(() => { })
  }

  sortBy(key: string) {
    this.onSorted.emit(key)
  }
}
