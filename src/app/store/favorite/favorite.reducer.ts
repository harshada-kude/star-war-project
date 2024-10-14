
import { createReducer, on } from '@ngrx/store';
import { loadFavorite, addFavorite, removeFavorite } from './favorite.actions';

export interface Favorite {
  characterId: number;
  isFavorite: boolean;
}

export interface FavoriteState {
  favorites: Favorite[];
}

export const initialState: FavoriteState = {
  favorites: [],
};

const _favoriteReducer = createReducer(
  initialState,
  on(loadFavorite, (state, { favorites }) => ({ ...state, favorites })),
  on(addFavorite, (state, { favorite }) => ({ ...state, favorites: [...state.favorites, favorite] })),
  on(removeFavorite, (state, { characterId }) => ({
    ...state,
    favorites: state.favorites.filter(favorite => favorite.characterId !== characterId),
  }))
);

export function favoriteReducer(state: FavoriteState | undefined, action: any) {
  return _favoriteReducer(state, action);
}
