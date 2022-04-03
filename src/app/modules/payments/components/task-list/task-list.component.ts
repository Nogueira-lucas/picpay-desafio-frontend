import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { PaymentsService } from "../../../../services/payments.service";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { Task } from "../../models/task";
import { DeletePaymentComponent } from "../delete-payment/delete-payment.component";
import { EditPaymentComponent } from "../edit-payment/edit-payment.component";
import { MatFormField } from "@angular/material/form-field";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatFormField) filter: MatFormField;

  public tasks: MatTableDataSource<Task>;

  public displayedColumns: string[] = [
    "name",
    "title",
    "date",
    "value",
    "isPayed",
    "id",
  ];

  public filterValue: string = "";

  constructor(
    private paymentService: PaymentsService,
    public dialog: MatDialog
  ) {
    this.paymentService
      .getTasks()
      .pipe(
        catchError((err) => {
          this.onError("Não foi possível carregar os dados.");
          console.error(err);
          return of([]);
        })
      )
      .subscribe((list) => {
        this.tasks = new MatTableDataSource(list);
        this.tasks.sort = this.sort;
        this.tasks.paginator = this.paginator;

        this.tasks.filterPredicate = (data: Task, filter: string) => {
          return data.name.toLowerCase().includes(filter);
        };
      });
  }

  applyFilter() {
    this.tasks.filter = this.filterValue.trim().toLowerCase();
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

  setPage(index) {
    this.paginator.pageIndex = index;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  editPayment(data: Task) {
    this.dialog.open(EditPaymentComponent, {
      data,
    });
  }

  ngOnInit(): void {}
}
