import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 200, ellipsis: string = '...'): string {
    if (!value) return ''; // Si el valor es nulo o indefinido, devuelve una cadena vacía

    // Si el texto es más corto que el límite, devuélvelo tal cual
    if (value.length <= limit) {
      return value;
    }

    // Trunca el texto y añade los puntos suspensivos
    return value.slice(0, limit) + ellipsis;
  }
}
