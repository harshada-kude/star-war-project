/**
 * Angular Imports
 */
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

/**
 * Material Imports
 */
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

/**
 * rxjs imports
 */
import { map, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Services
 */
import { CharacterService } from '../../services/character.service';

/**
 * Components
 */
import { SearchComponent } from '../shared/search/search.component';
import { TableComponent } from '../shared/table/table.component';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';

/**
 * Models
 */
import { Character, CharacterColumnDef } from '../../models/character.model';

/**
 * Library
 */
import { StarWarLoaderComponent } from 'star-war-loader';
import { APP_CONSTANTS } from '../../shared/constants';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, MatProgressSpinnerModule, SearchComponent, StarWarLoaderComponent, TableComponent, ToolbarComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * ViewChild Decorator for paginator
   * @type {MatPaginator}
   * @memberof CharacterListComponent
   */
  @ViewChild('paginator') paginator!: MatPaginator;

  /**
   * Variable to store characters
   * @type {Array<Character>}
   * @memberof CharacterListComponent
   */
  public characters: Array<Character> = [];

  /**
   * Column definations
   * @type {Array<string>}
   * @memberof CharacterListComponent
   */
  public columnDefs : Array<CharacterColumnDef> = APP_CONSTANTS.CHARACTER_COLUMNS;

  /**
   * isMobile Observable
   * @type {(Observable<boolean> | undefined)}
   * @memberof CharacterListComponent
   */
  public isMobile$: Observable<boolean> | undefined;

  /**
   * Variable to store totalPages
   * @type {number}
   * @memberof CharacterListComponent
   */
  public totalPages: number = 0;

  /**
   * isLoading flag
   * @type {boolean}
   * @memberof CharacterListComponent
   */
  public isLoading: boolean = false;

  /**
   * Variable to store pageIndex
   * @type {number}
   * @memberof CharacterListComponent
   */
  private pageIndex: number = 0;

  /**
   * Variable to search term
   * @type {string}
   * @memberof CharacterListComponent
   */
  private searchTerm: string = '';

  /**
   * Variable to check if component is active or not
   * @type {boolean}
   * @memberof CharacterListComponent
   */
  private compActive : boolean = true;

/**
 * Creates an instance of CharacterListComponent.
 * @param {BreakpointObserver} breakpointObserver
 * @param {CharacterService} characterService
 * @param {ChangeDetectorRef} cd
 * @param {ActivatedRoute} route
 * @param {Router} router
 * @param {Store} store
 * @memberof CharacterListComponent
 */
constructor(private breakpointObserver: BreakpointObserver,
              private characterService: CharacterService,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router) {
              }

  /**
   * Angular life cycle hook for component initialization
   * @memberof CharacterListComponent
   */
  ngOnInit() {
    this.checkMobileView();
    this.loadRouteData();
  }

  /**
   * Angular life cycle hook on component destruction
   * @memberof CharacterListComponent
   */
  ngOnDestroy(): void {
    this.compActive = false;
  }

  /**
   * Angular life cycle hook
   * @memberof CharacterListComponent
   */
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex - 1;
    }
    this.cd.detectChanges();
  }

  /**
   * Method to load characters
   * @param {*} [page=1]
   * @param {string} [searchTerm='']
   * @memberof CharacterListComponent
   */
  private loadCharacters(page: number = 1, searchTerm: string = ''): void {
    this.isLoading = true;
    this.characterService.getCharacters(page, searchTerm).pipe(takeWhile(() => this.compActive)).subscribe(data => {
      this.characters = data.results;
      this.totalPages = Math.ceil(data.count / 10);
      this.isLoading = false;
      this.cd.detectChanges();
    });
  }

  /**
   * Method to search characters
   * @param {string} searchTerm
   * @memberof CharacterListComponent
   */
  public onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex - 1;
    }
    this.prepareRouteParams();
  }

  /**
   * Method for page change logic
   * @param {*} event
   * @memberof CharacterListComponent
   */
  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex + 1;
    this.prepareRouteParams();
  }

  /**
   * Method to prepare route params
   * @memberof CharacterListComponent
   */
  private prepareRouteParams(): void {
    const queryParams: any = {}; 

    if (this.pageIndex !== undefined && this.pageIndex !== null) {
        queryParams.page = this.pageIndex;
    }

    queryParams.search = this.searchTerm || null; 

    this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
    });
  }

  /**
   * Method to check if this is mobile view
   * @memberof CharacterListComponent
   */
  private checkMobileView() {
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).pipe(
      map(result => result.matches)
    );
  }


  /**
   * Method to go to character details page
   * @param {(string | undefined)} url
   * @memberof CharacterListComponent
   */
  public goToDetails(url: string | undefined) {
    let id = url?.split('/').slice(-2, -1)[0];
    this.router.navigate(['/character', id]);
  }

  /**
   * Method to load route data
   * @memberof CharacterListComponent
   */
  private loadRouteData() {
    this.route.queryParams.pipe(takeWhile(() => this.compActive)).subscribe(params => {
      this.pageIndex = params['page'] ?? 1;
      this.searchTerm = params['search'] ?? '';

      // Fetch the data based on the restored state
      this.loadCharacters(this.pageIndex, this.searchTerm ?? '');
    })
  }

}
