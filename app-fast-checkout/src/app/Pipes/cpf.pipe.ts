import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    // Aplica a máscara no valor do documento
    const maskedValue = `${value.substring(0, 3)}.•••.${value.substring(6, 9)}-${value.substring(9, 11)}`;
    return maskedValue;
  }
}
