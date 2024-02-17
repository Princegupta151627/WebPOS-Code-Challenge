import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programterm'
})
export class ProgramtermPipe implements PipeTransform {

  private excludedFields = ['programTermId'];

  transform(items: any[], searchProg: string): any[] {
    if (!items || !searchProg) {
      return items;
    }

    searchProg = searchProg.toLowerCase(); // Convert the search term to lowercase for case-insensitive search

    return items.filter(item => {
      // Modify the logic based on your table structure and filter requirements
      let concatenatedValues = '';

      for (const key in item) {
        if (item.hasOwnProperty(key) && !this.excludedFields.includes(key) && typeof item[key] === 'string') {
          concatenatedValues += item[key].toLowerCase();
        }
      }
  
      return concatenatedValues.includes(searchProg);
    });
  }
}



