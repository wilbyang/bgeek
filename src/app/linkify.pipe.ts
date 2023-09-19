import { Pipe, PipeTransform } from '@angular/core';
const urlRegex = /(https?:\/\/[^\s]+)/g;
@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(urlRegex, '<a href="$1">$1</a>');
  }

}
