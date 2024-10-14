/**
 * Angular Imports
 */
import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Material Imports
 */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  /**
   * Output EventEmitter for search
   * @memberof SearchComponent
   */
  @Output() searchChanged = new EventEmitter<string>();

  /**
   * onSearch Method
   * @param {*} value
   * @memberof SearchComponent
   */
  onSearch(value : any) {
    this.searchChanged.emit(value.target.value);
  }
}
