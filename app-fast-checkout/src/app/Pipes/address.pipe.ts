import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: string): string {
    const ellipsisText = '•••';
    const addressSingle = value.trim().split(' ');
    const addressParts = value.trim().split(', ');

    if (addressParts.length > 1) {
      const lastPart = addressParts[addressParts.length - 1];
      const meio = addressSingle[addressSingle.length - 2];
      return `${ellipsisText} ${meio} ${lastPart}`;
    }
    if (addressSingle.length > 1) {
      return `${ellipsisText} ${addressSingle[addressSingle.length - 1]}`;
    }
    else {
      return value;
    }
  }

}
