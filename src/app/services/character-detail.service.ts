/**
 * Angular Imports
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * rxjs imports
 */
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Constants
 */
import { Character } from '../models/character.model';

/**
 * Models
 */
import { APP_CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailService {

  /**
   * Request URL to get people
   * @private
   * @memberof CharacterDetailService
   */
  private peopleUrl = APP_CONSTANTS.URLS.PEOPLE;

  constructor(private http: HttpClient) { }

  /**
   * Method to get single character details
   * @param {number} id
   * @return {*}  {Observable<Character>}
   * @memberof CharacterDetailService
   */
  getCharacterDetails(id: number): Observable<Character> {
    return this.http.get(`${this.peopleUrl}${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Method to handle error
   * @private
   * @param {*} error
   * @return {*}  {Observable<never>}
   * @memberof CharacterDetailService
   */
  private handleError(error: Error): Observable<never> {
    return throwError('Something went wrong; please try again later.');
  }
}
