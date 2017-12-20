import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxHeight',
})
export class MaxHeightPipe implements PipeTransform {
  transform(value: any, ...args) {
    console.log(value.scrollHeight);
    
    return value.scrollHeight;
  }
}
