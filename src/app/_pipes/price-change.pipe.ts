import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceChange'
})
export class PriceChangePipe implements PipeTransform {

  transform(value: number, priceCharacter: string): string {
    // const regex: RegExp = /(\d)(?=(\d\d\d)+(?!\d))/g;
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' ' + priceCharacter;
}

}
