import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentsInterface } from 'src/app/models/payments.interfaces';
import { PaymentsService } from 'src/app/services/payments.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreatePaymentModalComponent } from 'src/app/components/create-payment-modal/create-payment-modal.component';
import { DeletePaymentModalComponent } from 'src/app/components/delete-payment-modal/delete-payment-modal.component';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

const minWidth = '500px'
@Component({
  selector: 'payments-page',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  isLoading: boolean = false

  displayedColumns: string[] = ['user', 'title', 'data', 'value', 'payed', 'options'];
  dataSource: any;

  filterInputForm = new FormControl('')

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private service: PaymentsService,
    private authService: AuthService) {
    this.init()
  }
  
  init() {
    this.filterInputForm.setValue('')
    this.service.allPayments().subscribe(res => {
      this.dataSource = new MatTableDataSource<PaymentsInterface>(res);
    }, err => {}, ()=> {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filterByUsername() {
    if(this.filterInputForm.value) {
      this.service.getPaymentByUser(this.filterInputForm.value)
      .subscribe(response => {
        this.dataSource = response
        this.isLoading = true;
      }, err => {
        this.isLoading = false;
        this.snackBar.open('usuário não encontrado', 'fechar', { duration: 3000})
        this.init()
      }, () => {
        this.isLoading = false;
        this.snackBar.open('usuário encontrado', 'fechar', { duration: 3000})
      })
    }
  }

  openPaymentModal(paymentElement?: PaymentsInterface) {
    const payment: PaymentsInterface = paymentElement;
    const dialogRef = this.dialog.open(
      CreatePaymentModalComponent, {
        data: {
          ...payment
        },
        minWidth: minWidth
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openDeletePaymentModal(id: number) {
    const dialogRef = this.dialog.open(
      DeletePaymentModalComponent, {
        data: {
          id: id,
        },
        minWidth: minWidth
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.service.allPayments().subscribe(res => {
        this.dataSource = new MatTableDataSource<PaymentsInterface>(res);
      }, err => {}, ()=> {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  logout() {
    this.authService.logout()
  }
}
