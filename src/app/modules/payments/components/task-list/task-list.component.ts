import { Component, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

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
export class TaskListComponent {
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

  public customPaginator: Array<{
    pageLabel: string;
    pageIndex: number;
    isCurrent: boolean;
  }>;

  constructor(
    private paymentService: PaymentsService,
    public dialog: MatDialog
  ) {
    this.paymentService
      .getTasks()
      .pipe(
        catchError((err: any) => {
          return this.thowDataError(err);
        })
      )
      .subscribe((list) => {
        this.tasks = new MatTableDataSource(list);
        this.tasks.sort = this.sort;
        this.tasks.paginator = this.paginator;

        this.tasks.filterPredicate = (data: Task, filter: string) => {
          return data.name.toLowerCase().includes(filter);
        };

        setTimeout(() => {
          this.setPaginatorParams();
        }, 1);
      });
  }

  onPaginateChange(event) {
    this.setPaginatorParams();
  }

  applyFilter() {
    this.tasks.filter = this.filterValue.trim().toLowerCase();
    setTimeout(() => {
      this.setPaginatorParams();
    }, 1);
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

  private thowDataError(err: any): Observable<[]> {
    this.onError("Não foi possível carregar os dados.");
    console.error(err);
    return of([]);
  }

  setPaginatorParams() {
    let pages = [];
    let maxIndex = this.paginator.getNumberOfPages() - 1;
    let currentPage = this.paginator.pageIndex;
    let generateIndex = currentPage + 4;

    if (generateIndex > maxIndex) {
      generateIndex = maxIndex;
    }

    for (let i = 0; pages.length <= generateIndex; i++) {
      pages.push({
        pageIndex: i,
        pageLabel: `${i + 1}`,
        isActive: i === currentPage,
      });
    }

    if (currentPage + 2 > maxIndex) {
      this.customPaginator = pages.splice(maxIndex - 4, 5);
    } else if (currentPage > 2) {
      this.customPaginator = pages.splice(currentPage - 2, 5);
    } else {
      this.customPaginator = pages.slice(0, 5);
    }
  }
}
