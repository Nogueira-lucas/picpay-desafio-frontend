import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { PaymentDeleteComponent } from '../payment-delete/payment-delete.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements AfterViewInit, OnInit {
  paymentsToRender: Payment[] = [];
  dataSource = new MatTableDataSource(this.paymentsToRender);
  displayedColumns: string[] = ['id', 'name', 'title', 'value', 'date', 'isPaid', 'icons'];
  totalPayments: string;
  filter: string;
  pageSizeOptions = [5, 10, 15, 20];
  pageSize = 10;
  pageIndex = 1;

  constructor(
    private paymentService: PaymentService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.loadPageData({ pageIndex: 0, pageSize: this.pageSize });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadPageData($event) {
    const { pageIndex, pageSize } = $event;
    this.pageIndex = pageIndex + 1;
    this.pageSize = pageSize;
    this.paymentService.loadPayments(this.pageIndex, this.pageSize, this.filter).subscribe(res => {
      this.paymentsToRender = res.body;
      this.dataSource.data = this.paymentsToRender;
      this.totalPayments = res.headers.get('X-Total-Count');
    });
  }

  filterData($filter: string) {
    this.filter = $filter;
    this.paymentService.loadPayments(this.pageIndex, this.pageSize, this.filter).subscribe(res => {
      this.paymentsToRender = res.body;
      this.dataSource.data = this.paymentsToRender;
    });
  }

  updateIsPaid(element: Payment) {
    const paymentUpdated = {
      ...element,
      isPaid: !element.isPaid,
    };
    this.paymentsToRender = this.paymentsToRender.map(payment => {
      if (payment.id == paymentUpdated.id) {
        payment = paymentUpdated;
      }
      return payment;
    });
    this.dataSource.data = this.paymentsToRender;
    this.paymentService.updatePayment(paymentUpdated).subscribe();
  }

  deletePayment(element: Payment) {
    this.paymentService.deletePayment(element).subscribe(() => {
      this.paymentsToRender = this.paymentsToRender.filter(payment => payment.id !== element.id);
      this.dataSource.data = this.paymentsToRender;
    });
  }

  openEditPaymentModal(element) {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      height: '400px',
      width: '600px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.paymentService.updatePayment(result).subscribe(() => {
          this.notificationService.showSuccess('Pagamento modificado com sucesso.');
          this.paymentsToRender = this.paymentsToRender.map(payment => {
            if (payment.id == result.id) {
              payment = result;
            }
            return payment;
          });
          this.dataSource.data = this.paymentsToRender;
        });
      }
    });
  }

  openCreatePaymentModal() {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
      if (!!result) {
        result.name = result.username;
        this.paymentService.addPayment(result).subscribe(() => {
          this.notificationService.showSuccess('Pagamento criado com sucesso.');
          this.loadPageData({ pageIndex: 0, pageSize: this.pageSize });
        });
      }
    });
  }

  openDeletePaymentModal(element) {
    const dialogRef = this.dialog.open(PaymentDeleteComponent, {
      height: '300px',
      width: '400px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.notificationService.showSuccess('Pagamento excluído com sucesso.');
        this.deletePayment(result);
      }
    });
  }
}
