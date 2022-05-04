import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentsInterface } from 'src/app/models/payments.interfaces';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-create-payment-modal',
  templateUrl: './create-payment-modal.component.html',
  styleUrls: ['./create-payment-modal.component.scss']
})
export class CreatePaymentModalComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    title: new FormControl('')
  });
  isLoading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: PaymentsService,
    public dialogRef: MatDialogRef<PaymentsInterface>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentsInterface) { }

  ngOnInit(): void {
    if(this.data.id) {
      this.service.getPaymentBy(this.data.id)
      .subscribe(response => { 
        this.isLoading = true;
        this.form.patchValue({
          username: response.username,
          value: response.value,
          date: response.date,
          title: response.title
        })
      },
      err => {
        this.isLoading = false
        this.snackBar.open('erro ao carregar', 'fechar', { duration: 3000})
      }, () => {
        this.isLoading = false
      })
    }
  }

  execute() {
    this.data.id? this.update() : this.create()
  }

  update() {
    this.service.updateBy(this.data.id, this.form.value)
      .subscribe(res => {
        this.isLoading = true
      }, err => {
        this.isLoading = false
        this.snackBar.open('erro ao atualizar', 'fechar', { duration: 3000})
      }, () => {
        this.isLoading = false
        this.dialogRef.close()
        this.snackBar.open('pagamento atualizado com sucesso', 'fechar', { duration: 3000})
      })
  }

  create() {
    this.service.createPayment(this.form.value)
      .subscribe(res => {
        this.isLoading = true
      }, err => {
        this.isLoading = false
        this.snackBar.open('erro ao salvar', 'fechar', { duration: 3000})
      }, () => {
        this.isLoading = false
        this.dialogRef.close()
        this.snackBar.open('pagamento gravado com sucesso', 'fechar', { duration: 3000})
      })
  }
}
