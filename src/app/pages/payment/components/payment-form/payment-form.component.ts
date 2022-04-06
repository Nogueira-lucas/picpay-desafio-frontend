import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  payment: Payment;
  submitted = false;
  subscriptions: Subscription[] = [];

  constructor(private paymentFacade: PaymentFacade, private formBuilder: FormBuilder, public modal: NgbActiveModal) {
    this.form = this.formBuilder.group({
      name: [''],
      value: [''],
      date: [''],
      title: [''],
    });
  }

  ngOnInit() {
    if (this.payment) {
      this.form = this.formBuilder.group({
        name: [this.payment.name],
        value: [this.payment.value],
        date: [moment(this.payment.date).format('YYYY-MM-DDTHH:mm')],
        title: [this.payment.title],
      });
    }
  }

  savePayment() {
    this.submitted = true;
    if (!this.form.invalid) {
      const paymentData: Payment = this.form.value;
      this.payment = {
        ...this.payment,
        ...paymentData,
        date: moment.utc(moment(paymentData.date).toDate()).format(),
        username: paymentData.name.replace(/ /g, '.')
      };

      if (this.payment.id) {
        this.requestFacade(this.paymentFacade.updatePayment(this.payment));
      } else {
        this.payment.id = Math.floor(Math.random() * 10000);
        this.requestFacade(this.paymentFacade.addPayment(this.payment));
      }
    }
  }

  requestFacade(request: Observable<Subscription>) {
    this.subscriptions.push(request.subscribe((sub) => {
      this.subscriptions.push(sub);
      this.modal.close();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
