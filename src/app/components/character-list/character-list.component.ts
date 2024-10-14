/**
 * Angular Imports
 */
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Material Imports
 */
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

/**
 * rxjs imports
 */
import { map, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * store imports
 */
import { select, Store } from '@ngrx/store';
import { selectPage, selectSearchTerm } from '../../store/character/character.selectors';
import { setPageSize, setPagination, setSearchTerm } from '../../store/character/character.actions';

/**
 * Services
 */
import { CharacterService } from '../../services/character.service';

/**
 * Components
 */
import { SearchComponent } from '../shared/search/search.component';

/**
 * Models
 */
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, SearchComponent, MatCardModule, MatProgressSpinnerModule],
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
   * Variable to store pageIndex
   * @type {number}
   * @memberof CharacterListComponent
   */
  pageIndex: number = 0;

  /**
   * Variable to store pageSize
   * @type {number}
   * @memberof CharacterListComponent
   */
  pageSize: number = 10;

  /**
   * Variable to search term
   * @type {string}
   * @memberof CharacterListComponent
   */
  searchTerm: string = '';

  /**
   * Variable to check if component is active or not
   * @type {boolean}
   * @memberof CharacterListComponent
   */
  compActive : boolean = true;

  /**
   * Variable to store characters
   * @type {Array<Character>}
   * @memberof CharacterListComponent
   */
  characters: Array<Character> = [];

  /**
   * Variable to store totalPages
   * @type {number}
   * @memberof CharacterListComponent
   */
  totalPages: number = 0;

  /**
   * current page observable
   * @type {Observable<number>}
   * @memberof CharacterListComponent
   */
  currentPage$: Observable<number>;
  
  /**
   * search term observable
   * @type {Observable<string>}
   * @memberof CharacterListComponent
   */
  searchTerm$: Observable<string>;

  /**
   * isMobile Observable
   * @type {(Observable<boolean> | undefined)}
   * @memberof CharacterListComponent
   */
  isMobile$: Observable<boolean> | undefined;

  /**
   * Column definations
   * @type {Array<string>}
   * @memberof CharacterListComponent
   */
  columndefs : Array<string> = ['name', 'birthYear', 'gender', 'height', 'weight'];

  /**
   * isLoading flag
   * @type {boolean}
   * @memberof CharacterListComponent
   */
  isLoading: boolean = false;



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
              private router: Router,
              private store: Store) {
                this.currentPage$ = store.pipe(select(selectPage));
                this.searchTerm$ = store.pipe(select(selectSearchTerm));
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
    this.paginator.pageIndex = this.pageIndex - 1;
    this.cd.detectChanges();
  }

  /**
   * Method to load characters
   * @param {*} [page=1]
   * @param {string} [searchTerm='']
   * @memberof CharacterListComponent
   */
  loadCharacters(page: any = 1, searchTerm: string = ''): void {
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
  onSearch(searchTerm: string): void {
    this.store.dispatch(setSearchTerm({ searchTerm }));
    this.pageIndex = this.searchTerm ? this.pageIndex : 1;
    this.searchTerm = searchTerm;
    this.prepareRouteParams();
  }

  /**
   * Method for page change logic
   * @param {*} event
   * @memberof CharacterListComponent
   */
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.prepareRouteParams();
  }

  /**
   * Method to prepare route params
   * @memberof CharacterListComponent
   */
  prepareRouteParams(): void {
    // Update URL query parameters to reflect the current state
    this.router.navigate([], {
      queryParams: {
        page: this.pageIndex,
        search: this.searchTerm
      },
      queryParamsHandling: 'merge' // To merge new params with existing ones
    });

    // Dispatch actions to store the new values in the store
    this.store.dispatch(setPagination({ page: this.pageIndex }));
    this.store.dispatch(setPageSize({ pageSize: this.pageSize }));
  }

  /**
   * Method to check if this is mobile view
   * @memberof CharacterListComponent
   */
  checkMobileView() {
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
  goToDetails(url: string | undefined) {
    let id = url?.split('/').slice(-2, -1)[0];
    this.router.navigate(['/character', id]);
  }

  /**
   * Method to load route data
   * @memberof CharacterListComponent
   */
  loadRouteData() {
    this.route.queryParams.pipe(takeWhile(() => this.compActive)).subscribe(params => {
      this.pageIndex = params['page'] ?? 1;
      this.searchTerm = params['search'] ?? '';

      // Dispatch actions to restore the state from URL
      this.store.dispatch(setPagination({ page: this.pageIndex }));
      this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));

      // Fetch the data based on the restored state
      this.loadCharacters(this.pageIndex, this.searchTerm ?? '');
    })
  }

}
