import { MatPaginatorIntl } from "@angular/material/paginator";

export const getPtPaginatorIntl = (): MatPaginatorIntl => {
  const paginator = new MatPaginatorIntl();

  paginator.itemsPerPageLabel = "Itens por página";
  paginator.nextPageLabel = "Próxima página";
  paginator.previousPageLabel = "Página anterior";
  paginator.getRangeLabel = RANGE_PT_BR;

  return paginator;
};

const RANGE_PT_BR = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};