import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favorites: string[] = JSON.parse('[]');
  // private favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  private favoritesSubject = new BehaviorSubject<string[]>(this.favorites);

  constructor() { }

  toggleFavorite(characterId: string) {
    const index = this.favorites.indexOf(characterId);
    if (index > -1) {
      this.favorites.splice(index, 1); // Remove from favorites
    } else {
      this.favorites.push(characterId); // Add to favorites
    }
    // localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  getFavorites(): Observable<string[]> {
    return this.favoritesSubject.asObservable();
  }
}
