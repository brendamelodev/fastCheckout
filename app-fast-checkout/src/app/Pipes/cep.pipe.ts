import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string): string {
    const maskedValue = `${value.substring(0, 2)}•••-${value.substring(6)}`;
    return maskedValue;
  }

}
