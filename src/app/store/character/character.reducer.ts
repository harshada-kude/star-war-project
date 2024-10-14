
import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './character.actions';

export interface CharacterState {
  page: number;
  pageSize: number;
  searchTerm: string;
}

export const initialState: CharacterState = {
  page: 1,
  pageSize: 10,
  searchTerm: ''
};


export const characterReducer = createReducer(
  initialState,
  //set page index when set pagination is dispatched
  on(CharacterActions.setPagination, (state, { page }) => ({ ...state, page })),
  //set page size when set size is dispatched
  on(CharacterActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize })),
  //set search term when set serach term is dispatched
  on(CharacterActions.setSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
  // Reset to the initial state when resetPaginator is dispatched
  on(CharacterActions.resetPaginator, (state) => ({ ...initialState }))

);
