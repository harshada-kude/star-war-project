import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-star-war-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading-container">
      <mat-spinner></mat-spinner>
      <span>Loading data, please wait...</span>
    </div>
  `,
  styles: `
    .loading-container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
})
export class StarWarLoaderComponent {
  @Input() isLoading: boolean = false;
}
