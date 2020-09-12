import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cedula'
})
export class CedulaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
