import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-remove',
  templateUrl: './payment-remove.component.html',
  styleUrls: ['./payment-remove.component.scss']
})
export class PaymentRemoveComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  payment: Payment = new Payment();

  constructor(private paymentFacade: PaymentFacade, public modal: NgbActiveModal) { }

  ngOnInit(): void { }

  removePayment() {
    try {
      const request = this.paymentFacade.removePayment(this.payment.id);
      this.subscriptions.push(request.subscribe((sub) => {
        this.subscriptions.push(sub);
        this.modal.close();
      }));
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
