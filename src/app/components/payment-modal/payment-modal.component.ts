import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "@src/app/models/payment-model";
import { PaymentsService } from "@src/app/services/payments.service";

export interface ModalData {
  title: "Adicionar" | "Editar" | "Excluir";
  id: number;
  payment: Payment;
}

@Component({
  selector: "app-payment-modal",
  templateUrl: "./payment-modal.component.html",
  styleUrls: ["./payment-modal.component.scss"],
})
export class PaymentModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private paymentsService: PaymentsService,
    private dialogRef: MatDialogRef<PaymentModalComponent>
  ) {
    this.data.payment.date = this.getDate(this.data.payment.date);
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  formatCurrency(value: number) {
    const newValue = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return newValue;
  }

  getDate(date: string) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" });
    const year = newDate.getFullYear();

    return `${day} ${month} ${year}`;
  }

  updatePayment(payment: Payment) {
    this.paymentsService.updatePayment(payment).subscribe(() => {
      this.closeDialog();
    });
  }
}
