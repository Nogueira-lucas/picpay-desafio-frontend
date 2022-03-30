import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";


import { PaymentsService } from "../../../../services/payments.service";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { Task } from "../../models/task";
import { DeletePaymentComponent } from "../delete-payment/delete-payment.component";
import { EditPaymentComponent } from "../edit-payment/edit-payment.component";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  public tasks$: Observable<Task[]>;

  public displayedColumns = ["name", "title", "date", "value", "isPayed", "id"];

  constructor(
    private paymentService: PaymentsService,
    public dialog: MatDialog
  ) {
    this.tasks$ = this.paymentService.getTasks().pipe(
      map((res) => {
        return res.splice(0, 5);
      }),
      catchError((err) => {
        this.onError("Não foi possível carregar os dados.");
        console.error(err);
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  deletePayment(data: Task) {
    this.dialog.open(DeletePaymentComponent, {
      data,
    });
  }

  editPayment(data: Task) {
    this.dialog.open(EditPaymentComponent, {
      data,
    });
  }

  ngOnInit(): void {}
}
