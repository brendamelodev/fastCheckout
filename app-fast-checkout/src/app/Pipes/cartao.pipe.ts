import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartao'
})
export class CartaoPipe implements PipeTransform {

  transform(value: string): string {
    const lastFourDigits = value.substr(-4);
    const ellipsisText = '••••';
    // const maskedNumber = '•'.repeat(value.length - 4) + ' ' + lastFourDigits;
    return `${ellipsisText} ${lastFourDigits}`
  }

}
