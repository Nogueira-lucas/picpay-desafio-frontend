import { MatDialog } from '@angular/material/dialog';
import { AddPaymentService } from './../add-payment.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from '../payment.model';
import { TablePaymentsDataSource } from './table-payments-datasource';
import { UpdatePaymentComponent } from '../dialog/update-payment/update-payment.component';
import { DeletePaymentComponent } from '../dialog/delete-payment/delete-payment.component';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Payment>;
  dataSource = new MatTableDataSource<Payment>()
  //dataSource: TablePaymentsDataSource;
  payments: Payment[]

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username','title', 'date', 'value', 'isPayed', 'action'];
  
  constructor(private addPaymentService: AddPaymentService, public dialog: MatDialog) {
    this.getData();
    //this.dataSource = new TablePaymentsDataSource(addPaymentService);
  }
  getData(){
    this.addPaymentService.read().subscribe(payments => {
      this.payments = payments;
      this.dataSource.data = this.payments;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  updatePaymentDialog(id): void {
    const dialogRef = this.dialog.open(UpdatePaymentComponent, {
      width: '550px'
    });

    dialogRef.componentInstance.getDataDialog(id);

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog was closed');
      this.getData();
    });
  }

  deletePaymentDialog(id): void {
    const dialogRef = this.dialog.open(DeletePaymentComponent, {
      width: '550px'
    });

    dialogRef.componentInstance.getDataDialog(id);

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog was closed');
      this.getData();
    });
  }
}
