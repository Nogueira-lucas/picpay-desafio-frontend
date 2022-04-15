import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/models/payment.model';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-payment-delete',
  templateUrl: './payment-delete.component.html',
  styleUrls: ['./payment-delete.component.scss'],
})
export class PaymentDeleteComponent implements OnInit {
  payment: Payment;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Payment, public dialogRef: MatDialogRef<PaymentFormComponent>) {}

  ngOnInit(): void {
    if (this.data) {
      this.payment = this.data;
    }
  }

  save() {
    this.dialogRef.close(this.payment);
  }
}
