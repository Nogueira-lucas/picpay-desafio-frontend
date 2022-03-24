import { AddPaymentService } from './../add-payment.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from '../payment.model';
import { TablePaymentsDataSource } from './table-payments-datasource';

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
  displayedColumns = ['id', 'name','title'];
  
  constructor(private addPaymentService: AddPaymentService) {
    this.addPaymentService.read().subscribe(payments => {
      this.payments = payments;
      this.dataSource.data = this.payments;
    })
    //this.dataSource = new TablePaymentsDataSource(addPaymentService);
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
