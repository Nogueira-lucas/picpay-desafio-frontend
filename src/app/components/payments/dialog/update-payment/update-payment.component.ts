import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddPaymentService } from '../../add-payment.service';
import { Payment } from '../../payment.model';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit {
  payment: Payment

  constructor(
    public dialogRef: MatDialogRef<UpdatePaymentComponent>,
    private addPaymentService: AddPaymentService
  ) { }

  ngOnInit(): void {
  
  }
  getDataDialog(id): void {
    this.addPaymentService.readById(id).subscribe(payment => {
      this.payment = payment;
    });
  }

  updatePayment(): void {
    this.addPaymentService.update(this.payment).subscribe(() => {
      this.addPaymentService.showMessage('Pagamento atualizado com sucesso!');
      this.closeDialog();
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
