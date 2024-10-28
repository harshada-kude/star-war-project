// src/app/store/character/character.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FavoriteState } from '../../models/favorite.model';

export const selectFavoriteState = createFeatureSelector<FavoriteState>('favorite');

export const selectAllFavorites = createSelector(
  selectFavoriteState,
  (state: FavoriteState) => state.favorites
);
