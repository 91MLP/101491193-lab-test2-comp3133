import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-character-filter',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent implements OnChanges {
  @Input() selectedHouse = 'All Houses';
  @Output() houseChange = new EventEmitter<string>();

  readonly houses = ['All Houses', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', 'No House'];
  readonly houseControl = new FormControl(this.selectedHouse, { nonNullable: true });

  constructor() {
    this.houseControl.valueChanges.pipe(distinctUntilChanged()).subscribe((house) => {
      this.houseChange.emit(house);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedHouse'] && this.houseControl.value !== this.selectedHouse) {
      this.houseControl.setValue(this.selectedHouse, { emitEvent: false });
    }
  }
}
