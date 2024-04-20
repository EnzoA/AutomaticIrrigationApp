import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: boolean, yesText?: string, noText?: string): string {
    return value
    ? yesText || 'Abierta'
    : noText || 'Cerrada';
  }

}
