import { Routes } from '@angular/router';

import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'characters',
  },
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
