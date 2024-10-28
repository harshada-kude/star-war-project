import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { selectAllFavorites } from '../store/favorite/favorite.selectors';
import { addFavorite, removeFavorite, loadFavorite } from '../store/favorite/favorite.actions';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  /**
   * Creates an instance of FavoriteService.
   * @param {Store} store
   * @memberof FavoriteService
   */
  constructor(private store: Store) { }

  /**
   * Add favorite character within store
   * @param {number} characterId
   * @param {boolean} isFavorite
   * @memberof FavoriteService
   */
  addFavorite(characterId:  number, isFavorite: boolean): void {
    const newFavorite: Favorite = { characterId: characterId, isFavorite: isFavorite };
    this.store.dispatch(addFavorite({ favorite: newFavorite }));
  }

  /**
   * Remove favorite character from store
   * @param {number} characterId
   * @memberof FavoriteService
   */
  removeFavorite(characterId:  number)  {
    this.store.dispatch(removeFavorite({ characterId }));
  }

  /**
   * Get favorite character from store list
   * @return {*}  {Observable<Favorite[]>}
   * @memberof FavoriteService
   */
  getFavorite(): Observable<Favorite[]> {
    return this.store.pipe(select(selectAllFavorites));
  }

  /**
   * Load favorite character from session storage
   * @memberof FavoriteService
   */
  loadFavoriteFromSession(): void {
    this.store.dispatch(loadFavorite());
  }
}
