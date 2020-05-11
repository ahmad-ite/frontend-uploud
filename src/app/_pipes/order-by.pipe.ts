import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (!value || args.length < 1) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!args[0] || args[0] === '') {
      if (args[1] === 'desc') { return value.sort().reverse(); }
      else { return value.sort(); }
    } // sort 1d array
    return value.sort((a, b) => {
      if (!a.hasOwnProperty(args[0]) || !b.hasOwnProperty(args[0])) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[args[0]] === 'string')
        ? a[args[0]].toUpperCase() : a[args[0]];
      const varB = (typeof b[args[0]] === 'string')
        ? b[args[0]].toUpperCase() : b[args[0]];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (args[1] === 'desc') ? (comparison * -1) : comparison
      );
    });

    return null;
  }

}
