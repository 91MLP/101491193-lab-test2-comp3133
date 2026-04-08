import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-character-filter',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent {
  @Input() selectedHouse = 'All Houses';
  @Output() houseChange = new EventEmitter<string>();

  readonly houses = ['All Houses', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', 'No House'];

  onSelectionChange(house: string): void {
    this.houseChange.emit(house);
  }
}
