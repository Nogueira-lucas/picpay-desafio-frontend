import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Payment } from './../payment.interface';
import { PaymentsService } from './../payments.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  @Input() payment!: Payment;

  paymentForm: FormGroup;

  get username() { return this.paymentForm.get('username'); }
  get value() { return this.paymentForm.get('value'); }
  get date() { return this.paymentForm.get('date'); }

  constructor(
    public activeModal: NgbActiveModal,
    private paymentsService: PaymentsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setPaymentData();
  }

  setPaymentData() {
    if (!this.payment) return;

    this.paymentForm.setValue({
      id: this.payment.id,
      username: this.payment.username,
      value: this.payment.value,
      date: this.payment.date,
      title: this.payment.title,
    });
  }

  onSubmit() {
    if (!this.paymentForm.valid) return

    let paymentData: Payment = this.paymentForm.value;

    if (!this.payment) {
      this.paymentsService.createPayment(paymentData).subscribe((data: Payment) => {
        this.activeModal.close(data);
      })
    } else {
      this.paymentsService.updatePayment(paymentData).subscribe((data: Payment) => {
        this.activeModal.close(data);
      })
    }
  }

  private createForm() {
    this.paymentForm = this.formBuilder.group({
      id: [null],
      username: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: ['']
    });
  }
}
