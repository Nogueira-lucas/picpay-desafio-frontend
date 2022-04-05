import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-remove',
  templateUrl: './payment-remove.component.html',
  styleUrls: ['./payment-remove.component.scss']
})
export class PaymentRemoveComponent implements OnInit {
  payment: Payment;

  constructor(private paymentFacade: PaymentFacade, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  removePayment() {
    try {
      this.paymentFacade.removePayment(this.payment.id)
      this.modal.close()
    } catch {}
  }

}
