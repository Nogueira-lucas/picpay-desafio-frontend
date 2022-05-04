import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentsInterface } from 'src/app/models/payments.interfaces';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-delete-payment-modal',
  templateUrl: './delete-payment-modal.component.html',
  styleUrls: ['./delete-payment-modal.component.scss']
})
export class DeletePaymentModalComponent implements OnInit {

  payment: PaymentsInterface;
  isLoading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentsInterface>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentsInterface,
    private service : PaymentsService) { }

  ngOnInit(): void {
    this.service.getPaymentBy(this.data.id)
      .subscribe(response => { 
        this.isLoading = true;
        this.payment = response;
      },
      err => {
        this.isLoading = false
        this.snackBar.open('erro ao carregar', 'fechar', { duration: 3000})
      }, () => {
        this.isLoading = false
      })
  }

  excluirPagamento() {
    this.service.deleteBy(this.data.id).subscribe(res => {
      this.isLoading = true
    }, err => {
      this.isLoading = false
      this.snackBar.open('erro ao carregar', 'fechar', { duration: 3000})
    }, () => {
      this.dialogRef.close()
      this.isLoading = false
      this.snackBar.open('pagamento excluído com sucesso', 'fechar', { duration: 3000})
    })
  }

}
