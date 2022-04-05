import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(NgForm) form: NgForm;
  payment: Payment;

  constructor(private paymentFacade: PaymentFacade, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  savePayment() {
    if(!this.form.invalid) {
      if (this.payment.id) {
        this.paymentFacade.updatePayment(this.payment)
      } else {
        this.payment.id = Math.floor(Math.random() * 10000)
        this.payment.username = this.payment.name.replace('/ /g', '.')
        this.paymentFacade.addPayment(this.payment)
      }
    }
  }
}
