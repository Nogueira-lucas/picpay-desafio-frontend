import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  paymentList$: Observable<Payment[]>

  constructor(private paymentFacade: PaymentFacade) {
    this.paymentList$ = this.paymentFacade.getPayments$();
  }

  async ngOnInit() {
    await this.paymentFacade.loadPayments().toPromise();
  }

}
