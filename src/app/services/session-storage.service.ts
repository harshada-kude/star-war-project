import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  /**
   * Setter for session storage details
   * @param {string} key
   * @param {(Character | Favorite | any)} value
   * @memberof SessionStorageService
   */
  setItem(key: string, value: Character | Favorite | any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Getter for session storage details
   * @param {string} key
   * @return {*}  {(Character | Favorite | any)}
   * @memberof SessionStorageService
   */
  getItem(key: string): Character | Favorite | any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Remove item from session storage
   * @param {string} key
   * @memberof SessionStorageService
   */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Clear session storage
   * @memberof SessionStorageService
   */
  clear(): void {
    sessionStorage.clear();
  }
}
