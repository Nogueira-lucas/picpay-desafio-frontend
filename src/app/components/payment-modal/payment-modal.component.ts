import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "@src/app/models/payment-model";

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {
    this.data.payment.date = this.getDate(this.data.payment.date);
  }

  ngOnInit(): void {}

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
}
