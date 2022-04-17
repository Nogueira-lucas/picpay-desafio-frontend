import { Component, ViewChild, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Payment } from "@src/app/models/payment-model";
import { PaymentModalComponent } from "../payment-modal/payment-modal.component";
import { PaymentsService } from "@src/app/services/payments/payments.service";
import { Subscription, throwError } from "rxjs";
import { EventsService } from "@src/app/services/events/events.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  private eventSubscription: Subscription;
  dataSource: MatTableDataSource<Payment>;
  payments: Payment[];
  selectedPayment: Payment;
  isLoading: Boolean = true;
  eventReceived: string;
  filter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private paymentsService: PaymentsService,
    private eventsService: EventsService
  ) {
    this.eventSubscription = this.eventsService
      .getEvent()
      .subscribe((message) => {
        this.consumeEvent(message);
      });
  }

  ngOnInit(): void {
    this.getPayments();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  getPayments(): void {
    this.isLoading = true;
    this.paymentsService.getPayments().subscribe(
      (payments) => {
        this.payments = payments;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        return throwError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTime(date: string) {
    const newDate = new Date(date);
    const time = newDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return time;
  }

  getDate(date: string) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" });
    const year = newDate.getFullYear();

    return `${day} ${month} ${year}`;
  }

  formatCurrency(value: number) {
    const newValue = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return newValue;
  }

  openDialog(title: string, id: number) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      data: {
        title,
      },
      autoFocus: false,
    };

    this.paymentsService.getPayment(id).subscribe(
      (payment) => {
        this.selectedPayment = payment;
        dialogConfig.data.payment = this.selectedPayment;

        this.dialog.open(PaymentModalComponent, dialogConfig);
      },
      (error) => {
        return throwError(error);
      }
    );
  }

  refreshTable() {
    this.dataSource.filter = "";
    this.filter = "";
    this.getPayments();
  }

  consumeEvent(event: string) {
    const Events = {
      refreshTable: this.refreshTable(),
    };

    return Events[event];
  }

  getDisplayedColumns(): string[] {
    return ["name", "title", "date", "value", "isPayed", "actions"];
  }
}
