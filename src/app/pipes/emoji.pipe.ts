import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  transform(message: string, isError: boolean): string {
    if (message) return message + (isError ? ' ☹️' : ' 😄');
  }

}
