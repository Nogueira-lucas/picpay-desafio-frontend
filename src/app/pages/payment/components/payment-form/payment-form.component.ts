import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import * as moment from 'moment';

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
    this.payment.date = moment(this.payment.date).format('YYYY-MM-DDTHH:mm');
  }

  savePayment() {
    if(!this.form.invalid) {
      try {
        this.payment.date = moment.utc(moment(this.payment.date).toDate()).format();
        
        if (this.payment.id) {
          this.paymentFacade.updatePayment(this.payment);
        } else {
          this.payment.id = Math.floor(Math.random() * 10000);
          this.payment.username = this.payment.name.replace('/ /g', '.');
          this.paymentFacade.addPayment(this.payment);
        }

        this.modal.close();
      } catch {}
    }
  }
}
