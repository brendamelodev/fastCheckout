import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: string): string {
    const ellipsisText = '•••';
    const trimmedValue = value.trim();
    const data = value.split(" ")

    if (trimmedValue.includes(',')) {
      const parts = trimmedValue.split(',');
      const lastPart = parts[parts.length - 1].trim();

      return ellipsisText + ', ' + lastPart;
    }
    else {
      return ellipsisText + ' ' + data[1] +data[2];
    }
  }

}
