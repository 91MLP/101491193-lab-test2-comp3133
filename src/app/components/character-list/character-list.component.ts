import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CharacterFilterComponent } from '../character-filter/character-filter.component';
import { Character } from '../../models/character.model';
import { HarryPotterService } from '../../services/harry-potter.service';

@Component({
  selector: 'app-character-list',
  imports: [
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CharacterFilterComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent {
  private readonly service = inject(HarryPotterService);
  private readonly destroyRef = inject(DestroyRef);

  readonly characters = signal<Character[]>([]);
  readonly selectedHouse = signal('All Houses');
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  constructor() {
    this.loadCharacters();
  }

  onHouseChange(house: string): void {
    this.selectedHouse.set(house);
    this.loadCharacters();
  }

  trackById(_: number, character: Character): string {
    return character.id;
  }

  private loadCharacters(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    const selectedHouse = this.selectedHouse();
    const request =
      selectedHouse === 'All Houses'
        ? this.service.getCharacters()
        : selectedHouse === 'No House'
          ? this.service.getCharacters()
          : this.service.getCharactersByHouse(selectedHouse);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (characters) => {
        const normalized =
          selectedHouse === 'No House'
            ? characters.filter((character) => !character.house?.trim())
            : characters;

        this.characters.set(normalized);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load characters right now. Please try again.');
        this.characters.set([]);
        this.loading.set(false);
      },
    });
  }
}
