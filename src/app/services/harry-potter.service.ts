import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://hp-api.onrender.com/api';

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${encodeURIComponent(house)}`);
  }

  getCharacterById(id: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/character/${id}`);
  }
}
