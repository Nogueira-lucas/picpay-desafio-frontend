import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddPaymentService } from '../../add-payment.service';
import { Payment } from '../../payment.model';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {
  payment: Payment
  
  constructor(
    public dialogRef: MatDialogRef<DeletePaymentComponent>,
    private addPaymentService: AddPaymentService
  ) { }

  ngOnInit(): void {
  }

  getDataDialog(id): void {
    this.addPaymentService.readById(id).subscribe(payment => {
      this.payment = payment;
    });
  }
}
