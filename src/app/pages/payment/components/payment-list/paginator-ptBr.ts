// import { MatPaginatorIntl } from '@angular/material/paginator';

// const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
//   if (length === 0) {
//     return 'Página 1 de 1';
//   }
//   const amountPages = Math.ceil(length / pageSize);
//   return `Página ${page + 1} de ${amountPages}`;
// };

// export function getDutchPaginatorIntl() {
//   const paginatorIntl = new MatPaginatorIntl();

//   paginatorIntl.itemsPerPageLabel = 'Itens por pagina:';
//   paginatorIntl.nextPageLabel = 'Próxima página';
//   paginatorIntl.previousPageLabel = 'Página anterior';
//   paginatorIntl.getRangeLabel = portugueseRangeLabel;

//   return paginatorIntl;
// }
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class PortuguesePaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primeira página`;
  itemsPerPageLabel = `Itens por página:`;
  lastPageLabel = `'Última página'`;

  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
