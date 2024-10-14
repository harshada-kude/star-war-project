
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('character');

export const selectPage = createSelector(selectCharacterState, (state) => state?.page);
export const selectSearchTerm = createSelector(selectCharacterState, (state) => state?.searchTerm);
