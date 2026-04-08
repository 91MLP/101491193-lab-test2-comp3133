import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Character } from '../../models/character.model';
import { HarryPotterService } from '../../services/harry-potter.service';

@Component({
  selector: 'app-character-details',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(HarryPotterService);
  private readonly destroyRef = inject(DestroyRef);

  readonly character = signal<Character | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly detailRows = computed(() => {
    const character = this.character();

    if (!character) {
      return [];
    }

    return [
      { label: 'Species', value: character.species || 'Unknown' },
      { label: 'House', value: character.house || 'No House' },
      { label: 'Wizard', value: character.wizard ? 'True' : 'False' },
      { label: 'Ancestry', value: character.ancestry || 'Unknown' },
      { label: 'Actor', value: character.actor || 'Unknown' },
      { label: 'Wand Wood', value: character.wand?.wood || 'Unknown' },
      { label: 'Wand Core', value: character.wand?.core || 'Unknown' },
      { label: 'Wand Length', value: character.wand?.length ?? 'Unknown' },
    ];
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.errorMessage.set('The requested character could not be found.');
        this.loading.set(false);
        return;
      }

      this.fetchCharacter(id);
    });
  }

  private fetchCharacter(id: string): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.service
      .getCharacterById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (characters) => {
          this.character.set(characters[0] ?? null);
          this.errorMessage.set(characters[0] ? '' : 'No details were returned for this character.');
          this.loading.set(false);
        },
        error: () => {
          this.character.set(null);
          this.errorMessage.set('Unable to load the character details right now.');
          this.loading.set(false);
        },
      });
  }
}
