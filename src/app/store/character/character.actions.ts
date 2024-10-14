import { createAction, props } from '@ngrx/store';

// Action to reset the paginator and search params
export const resetPaginator = createAction('[Paginator] Reset Paginator');

//Action to set page number
export const setPagination = createAction(
  '[Character] Set Pagination',
  props<{ page: number }>()
);

//Action to set page size
export const setPageSize = createAction(
  '[Paginator] Set Page Size',
  props<{ pageSize: number }>()
);

//Action to set search term
export const setSearchTerm = createAction(
  '[Character] Set Search Term',
  props<{ searchTerm: string }>()
);
