/**
 * Angular Imports
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * rxjs imports
 */
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Constants
 */
import { APP_CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  /**
   * Request URL to get people
   * @private
   * @memberof CharacterService
   */
  private peopleUrl = APP_CONSTANTS.URLS.PEOPLE;

  /**
   * Creates an instance of CharacterService.
   * @param {HttpClient} http
   * @memberof CharacterService
   */
  constructor(private http: HttpClient) { }

  /**
   * Method to get all the Characters based on pagination & search param
   * @param {number} page
   * @param {string} [searchParam]
   * @return {*}  {Observable<any>}
   * @memberof CharacterService
   */
  getCharacters(page: number, searchParam?: string): Observable<any> {
    const queryParam = new URLSearchParams();
    queryParam.set('page', page.toString());

    if (searchParam) {
      queryParam.set('search', searchParam);
    }

    return this.http.get(`${this.peopleUrl}?${queryParam.toString()}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Method to get single character details
   * @param {number} id
   * @return {*}  {Observable<any>}
   * @memberof CharacterService
   */
  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.peopleUrl}${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Method to handle error
   * @private
   * @param {*} error
   * @return {*}  {Observable<never>}
   * @memberof CharacterService
   */
  private handleError(error: any): Observable<never> {
    return throwError('Something went wrong; please try again later.');
  }
}
