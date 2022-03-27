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
  payments: Payment[]
  payment: Payment
  displayedColumns = ['username','title', 'date', 'value', 'isPayed', 'action'];
  
  constructor(private addPaymentService: AddPaymentService, public dialog: MatDialog) {
    this.getData();
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
      width: 'auto'
    });

    dialogRef.componentInstance.getDataDialog(id);

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog was closed');
      this.getData();
    });
  }

  updateCheckbox(e: any, id: number): void{
    this.addPaymentService.readById(id).subscribe(payment => {
      this.payment = payment;

      let valueCheck;
      if(e.target.checked){
        valueCheck=true
      }
      else{
        valueCheck=false
      }
      this.payment.isPayed = valueCheck;

      this.addPaymentService.update(this.payment).subscribe(() => {
        this.addPaymentService.showMessage('Pagamento atualizado com sucesso!');
      });
      this.getData();
    });

  }
}
