import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return value.replace(urlRegex, '<a href="$1">$1</a>');
  }

}
