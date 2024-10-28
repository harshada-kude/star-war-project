
import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../models/favorite.model';

//Action to add favorite character
export const addFavorite = createAction(
  '[Favorite] Add Favorite',
  props<{ favorite: Favorite }>()
);

//Action to remove favorite character
export const removeFavorite = createAction(
  '[Favorite] Remove Favorite',
  props<{ characterId: number }>()
);

//Action to load favorite character
export const loadFavorite = createAction(
  '[Favorite] Load Favorites'
);
