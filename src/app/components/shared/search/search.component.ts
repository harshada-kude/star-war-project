/**
 * Angular Imports
 */
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * rxjs Imports
 */
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  /**
   * Output EventEmitter for search
   * @memberof SearchComponent
   */
  @Output() searchChanged = new EventEmitter<string>();

  /**
   * Form Control
   * @memberof SearchComponent
   */
  public searchControl = new FormControl('');

  /**
   * Creates an instance of SearchComponent.
   * @param {ActivatedRoute} route
   * @memberof SearchComponent
   */
  constructor(private route: ActivatedRoute) {

  }

  /**
   * On Init Angular Lifecycle
   * @memberof SearchComponent
   */
  ngOnInit() {
    this.subscribeSearchValue();
    this.handleValueChange();
  }

  /**
   * Method to subscribe Search Value
   * @memberof SearchComponent
   */
  private subscribeSearchValue() : void {
    this.route.queryParams.subscribe(params => {
      const searchValue = params['search'] || '';
      this.searchControl.setValue(searchValue);
      this.searchChanged.emit(searchValue );
    });
  }

  /**
   * Method to handle search value change
   * @memberof SearchComponent
   */
  private handleValueChange() : void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        if (value !== null && value !== undefined) {
          this.searchChanged.emit(value);
        }
      });
  }

  /**
   * Method to clear Search
   * @memberof SearchComponent
   */
  public clearSearch(): void {
    this.searchControl.setValue('');
  }
  
}
