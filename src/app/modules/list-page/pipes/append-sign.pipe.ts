import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendSign',
  pure: true,
})
export class AppendSignPipe implements PipeTransform {
  transform(value: number, sign: string): string {
    return `${sign}${value}`;
  }
}
