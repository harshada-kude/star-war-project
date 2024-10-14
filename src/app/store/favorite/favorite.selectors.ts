// src/app/store/character/character.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FavoriteState } from './favorite.reducer';

export const selectFavoriteState = createFeatureSelector<FavoriteState>('favorite');

export const selectAllFavorites = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => state.favorites
);