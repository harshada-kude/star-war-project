
import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { loadFavorite, addFavorite, removeFavorite } from './favorite.actions';
import { FavoriteState } from '../../models/favorite.model';
import { SessionStorageService } from '../../services/session-storage.service';

export const initialState: FavoriteState = {
  favorites: [],
};

const sessionStorageService = new SessionStorageService();
const _favoriteReducer = createReducer(
  initialState,
  on(loadFavorite, (state) => {
    const favorites = sessionStorageService.getItem('favorites') || [];
    return { ...state, ...favorites };
  }),
  on(addFavorite, (state, { favorite }) => {
    const newState = { ...state, favorites: [...state.favorites, favorite] };
    sessionStorageService.setItem('favorites', newState);
    return newState
  }),
  on(removeFavorite, (state, { characterId }) => {
    const newState = {
      ...state,
      favorites: state.favorites.filter(favorite => favorite.characterId !== characterId),
    }
    sessionStorageService.setItem('favorites', newState);
    return newState;
  })
);

export function favoriteReducer(state: FavoriteState | undefined, action: Action) {
  return _favoriteReducer(state, action);
}
