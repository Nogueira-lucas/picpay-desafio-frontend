import { Payment } from '../../payment.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddPaymentService } from '../../add-payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  payment: Payment = {
    username: '',
    value: null,
    date: new Date(),
    title: ''
  }

  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>,
    private addPaymentService: AddPaymentService
  ) { }

  ngOnInit(): void {
  }
  
  createPayment(): void {
    this.addPaymentService.create(this.payment).subscribe(() => {
      this.addPaymentService.showMessage('Pagamento adicionado com sucesso!');
      this.closeDialog();
    });

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
