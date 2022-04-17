import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PaymentModalComponent } from "src/app/components/payment-modal/payment-modal.component";

@Component({
  selector: "app-my-payments",
  templateUrl: "./my-payments.component.html",
  styleUrls: ["./my-payments.component.scss"],
})
export class MyPaymentsComponent implements OnInit {
  flexDirectionColumn: Boolean = false;
  columnBreakpoint: string = "(min-width: 605px)";

  constructor(
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([this.columnBreakpoint])

      .subscribe((result) => {
        if (!result.breakpoints[this.columnBreakpoint]) {
          this.flexDirectionColumn = true;
        } else {
          this.flexDirectionColumn = false;
        }
      });
  }

  openDialog(title: string) {
    this.dialog.open(PaymentModalComponent, {
      data: {
        title,
      },
      autoFocus: false,
    });
  }
}
