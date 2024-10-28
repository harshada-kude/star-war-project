/**
 * Angular Imports
 */
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Material Imports
 */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  /**
   * title Input
   * @type {string}
   * @memberof ToolbarComponent
   */
  @Input() title: string = '';

  /**
   * To hide or show the back button
   * @type {boolean}
   * @memberof ToolbarComponent
   */
  @Input() showBackButton: boolean = false;

  /**
   * back button event emitter
   * @memberof ToolbarComponent
   */
  @Output() backButtonClick = new EventEmitter<void>(); 

  /**
   * Method to emit the event when back button is clicked
   * @memberof ToolbarComponent
   */
  public onBackButtonClick(): void {
    this.backButtonClick.emit();
  }
}
