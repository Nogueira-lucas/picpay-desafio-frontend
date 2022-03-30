import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { PaymentsService } from "../../../../services/payments.service";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { Task } from "../../models/task";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  public tasks$: Observable<Task[]>;

  public displayedColumns = ["name", "title", "date", "value", "isPayed"];

  constructor(
    private paymentService: PaymentsService,
    public dialog: MatDialog
  ) {
    this.tasks$ = this.paymentService.getTasks().pipe(
      catchError((err) => {
        this.onError(
          'Não foi possível carregar os dados.'
        );
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

  ngOnInit(): void {}
}
