import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface ModalData {
  type: "add" | "edit";
}

@Component({
  selector: "app-payment-modal",
  templateUrl: "./payment-modal.component.html",
  styleUrls: ["./payment-modal.component.scss"],
})
export class PaymentModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {}
  ngOnInit(): void {}
}
