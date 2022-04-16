import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PaymentModalComponent } from "src/app/components/payment-modal/payment-modal.component";

@Component({
  selector: "app-my-payments",
  templateUrl: "./my-payments.component.html",
  styleUrls: ["./my-payments.component.scss"],
})
export class MyPaymentsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(type: string) {
    this.dialog.open(PaymentModalComponent, {
      data: {
        type: type,
      },
      panelClass: "paymentModal",
    });
  }
}
