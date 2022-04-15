import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  payment: Payment;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Payment,
    public dialogRef: MatDialogRef<PaymentFormComponent>
  ) {
    if (data) {
      this.form = this.formBuilder.group({
        username: [data.username, Validators.required],
        value: [data.value, Validators.required],
        date: [data.date.split('T')[0], Validators.required],
        title: [data.title, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        value: ['', Validators.required],
        date: ['', Validators.required],
        title: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.payment = this.data;
    }
  }

  save(paymentData: Payment) {
    const paymentEdited = { ...this.payment, ...paymentData };
    this.dialogRef.close(paymentEdited);
  }
}
