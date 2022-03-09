import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

enum PaginatorParams {
  ITEMS_PER_PAGE = "Exibir",
  NEXT_PAGE = 'Próxima página',
  PREVIOUS_PAGE = 'Página anterior'
};

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl
  implements OnDestroy {
  itemsPerPageLabel = PaginatorParams.ITEMS_PER_PAGE;
  nextPageLabel     = PaginatorParams.NEXT_PAGE;
  previousPageLabel = PaginatorParams.PREVIOUS_PAGE;
  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'de';

  constructor() {
    super();
    this.OF_LABEL = this.OF_LABEL;
    this.changes.next();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return `1 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL
      } ${length}`;
  };
}