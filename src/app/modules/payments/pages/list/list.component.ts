import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewPaymentComponent } from "../../components/new-payment/new-payment.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  newPayment(): void {
    this.dialog.open(NewPaymentComponent);
  }
}
