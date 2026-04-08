import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseLabel',
  standalone: true,
})
export class HouseLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value?.trim() ? value : 'No House';
  }
}
