import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

const TEST_DATA_SOUCE = [
  {
    id: 1,
    name: 'Pennie Dumphries',
    username: 'pdumphries0',
    title: 'Dental Hygienist',
    value: 19.96,
    date: '2020-07-21T05:53:20Z',
    image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
    isPaid: true,
  },
  {
    id: 2,
    name: 'Foster Orthmann',
    username: 'forthmann1',
    title: 'Professor',
    value: 207.36,
    date: '2021-01-28T14:01:29Z',
    image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
    isPaid: false,
  },
];

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements AfterViewInit, OnInit {
  paymentsToRender: Payment[] = [];
  dataSource = new MatTableDataSource(this.paymentsToRender);
  displayedColumns: string[] = ['id', 'name', 'username', 'title', 'value', 'date', 'isPaid'];
  totalPayments: string;
  filter: string;
  pageSizeOptions = [5, 10, 15, 20];
  pageSize = 10;
  pageIndex = 1;

  constructor(private paymentService: PaymentService, private _liveAnnouncer: LiveAnnouncer) {}
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

  updateIsPaid(element) {
    this.paymentService.updatePayment(element).subscribe();
  }
}
