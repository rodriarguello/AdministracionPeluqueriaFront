import { MatPaginatorIntl } from "@angular/material/paginator";

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Elementos por página:';
    override nextPageLabel = 'Siguiente página';
    override previousPageLabel = 'Página anterior';
    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
          return `0 de ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
  }