import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string): string {
    const names = value.trim().split(' ');

    if (names.length > 1) {
      const firstName = names[0];
      const lastName = names[names.length - 1];

      let ellipsis = '';

      for (let i = 1; i < names.length - 1; i++) {
        ellipsis += '••• ';
      }

      return firstName + ' ' + ellipsis + lastName;
    }

    return value;
  }

}
