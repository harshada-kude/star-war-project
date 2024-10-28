import { Favorite } from './favorite.model';

/**
 * Model for character details
 * @export
 * @interface Character
 */
export interface Character {
    birth_year?: string;
    films?: Array<string>;
    gender?: string;
    height?: string;
    homeworld?: string;
    mass?: string;
    name?: string;
    url?: string;
    isFavorite?: Favorite;
}

/**
 * Model for character state
 * @export
 * @interface CharacterState
 */
export interface CharacterState {
  page: number;
  pageSize: number;
  searchTerm: string;
}

/**
 * Model for character response object
 * @export
 * @interface CharacterResObj
 */
export interface CharacterResObj {
    results: Array<Character>;
    count: number; 
    next: string | null;
    previous: string | null;
}

export interface CharacterColumnDef {
  field: string;
  header: string;
}
