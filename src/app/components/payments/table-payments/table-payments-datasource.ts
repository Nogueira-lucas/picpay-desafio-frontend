import { Payment } from './../payment.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { AddPaymentService } from '../add-payment.service';
import { OnInit } from '@angular/core';

// TODO: replace this with real data from your application
var EXAMPLE_DATA: Payment[] = [
  {
    "id": 1,
    "name": "Pennie Dumphries",
    "username": "pdumphries0",
    "title": "Dental Hygienist",
    "value": 19.96,
    "date": "2020-07-21T05:53:20Z",
    "image": "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
    "isPayed": true
  },
  {
    "id": 2,
    "name": "Foster Orthmann",
    "username": "forthmann1",
    "title": "Professor",
    "value": 207.36,
    "date": "2021-01-28T14:01:29Z",
    "image": "https://robohash.org/quasetqui.png?size=150x150&set=set1",
    "isPayed": true
  },
  {
    "id": 3,
    "name": "Crissie Summerill",
    "username": "csummerill2",
    "title": "VP Product Management",
    "value": 464.54,
    "date": "2020-02-09T18:20:32Z",
    "image": "https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1",
    "isPayed": false
  },
];

/**
 * Data source for the TablePayments view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablePaymentsDataSource extends DataSource<Payment> {
  
  data: Payment[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  
  constructor(private addPaymentService: AddPaymentService) {
    super();
    //this.read();
  }

  // read(){
  //   //ou .subscribe()?
  //   this.addPaymentService.read().toPromise().then(data => {
  //     this.data = data;
  //     console.log('this.data', this.data);
  //   })
  // }
      
      /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
       */
      connect(): Observable<Payment[]> {
        if (this.paginator && this.sort) {
          // Combine everything that affects the rendered data into one update
          // stream for the data-table to consume.
          console.log('oi');
          return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
          .pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data ]));
          }));
        } else {
          throw Error('Please set the paginator and sort on the data source before connecting.');
        }
      }
      
      /**
       *  Called when the table is being destroyed. Use this function, to clean up
       * any open connections or free any held resources that were set up during connect.
       */
      disconnect(): void {}
      
      /**
       * Paginate the data (client-side). If you're using server-side pagination,
       * this would be replaced by requesting the appropriate data from the server.
       */
      private getPagedData(data: Payment[]): Payment[] {
        if (this.paginator) {
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          return data.splice(startIndex, this.paginator.pageSize);
        } else {
          return data;
        }
      }
  
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Payment[]): Payment[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }


}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
