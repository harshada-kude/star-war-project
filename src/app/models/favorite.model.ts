/**
 * Model for favorite
 * @export
 * @interface Favorite
 */
export interface Favorite {
  characterId: number;
  isFavorite: boolean;
}

export interface FavoriteState {
  favorites: Favorite[];
}
