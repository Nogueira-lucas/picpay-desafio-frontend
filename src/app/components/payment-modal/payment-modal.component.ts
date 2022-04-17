import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "@src/app/models/payment-model";
import { EventsService } from "@src/app/services/events/events.service";
import { PaymentsService } from "@src/app/services/payments/payments.service";
import { SnackBarService } from "@src/app/services/snackbar/snackbar.service";
import { TableComponent } from "../table/table.component";

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
  @ViewChild("app-table", { static: false })
  date: Date;
  table: TableComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private paymentsService: PaymentsService,
    private snackBService: SnackBarService,
    private eventsService: EventsService,
    private dialogRef: MatDialogRef<PaymentModalComponent>
  ) {
    if (this.data.payment?.date != null) {
      this.date = new Date(data.payment.date);
    }
  }

  ngOnInit(): void {
    if (this.data.title === "Adicionar") {
      this.data.payment = new Payment();
    }
  }

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

  sendEvent(message: string): void {
    this.eventsService.sendEvent(message);
  }

  dateToIso(date: string) {
    return new Date(date).toISOString();
  }

  updatePayment(payment: Payment) {
    payment.date = this.dateToIso(payment.date);
    this.paymentsService.updatePayment(payment).subscribe(() => {
      this.closeDialog();
      this.snackBService.openSnackBar("Pagamento Atualizado", "Fechar", 3000);
      this.sendEvent("refreshTable");
    });
  }

  createPayment(payment: Payment) {
    payment.date = this.dateToIso(payment.date);
    this.paymentsService.createPayment(payment).subscribe(() => {
      this.closeDialog();
      this.snackBService.openSnackBar("Pagamento Criado", "Fechar", 3000);
      this.sendEvent("refreshTable");
    });
  }

  deletePayment(payment: Payment) {
    this.paymentsService.deletePayment(payment).subscribe(() => {
      this.closeDialog();
      this.snackBService.openSnackBar("Pagamento Removido", "Fechar", 3000);
      this.sendEvent("refreshTable");
    });
  }
}
