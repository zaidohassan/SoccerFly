import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchWord: string): any[] {
    if (!items) return [];
    if (!searchWord) return items;
    searchWord = searchWord.toLowerCase();
    return items.filter(it => {
      // had to look at values in the object and convert them to a string
      let values = Object.values(it).toString();
      console.log(Object.values(it).toString());
      console.log(Object.values(it));

      return values.toLowerCase().includes(searchWord);
    });
  }
}
