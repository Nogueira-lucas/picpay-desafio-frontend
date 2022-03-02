import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Payment } from '../../../interfaces/payment.interface';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
  providers: [DatePipe]
})
export class PaymentModalComponent implements OnInit {
  @Input() title;
  @Input() payment!: Payment;

  paymentForm: FormGroup;

  get name() { return this.paymentForm.get('name'); }
  get username() { return this.paymentForm.get('username'); }
  get value() { return this.paymentForm.get('value'); }
  get date() { return this.paymentForm.get('date'); }

  constructor(
    public activeModal: NgbActiveModal,
    private paymentsService: PaymentsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setPaymentData();
  }

  setPaymentData() {
    if (!this.payment) return;

    this.paymentForm.setValue({
      id: this.payment.id,
      name: this.payment.name,
      username: this.payment.username,
      value: this.payment.value,
      date: this.datePipe.transform(new Date(this.payment.date), "yyyy-MM-dd'T'HH:mm:ss") ,
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
      name: ['', Validators.required],
      username: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: ['']
    });
  }
}
