/**
 * Angular Imports
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Material Imports
 */
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  /**
   * Datasurce Input
   * @type {any[]}
   * @memberof TableComponent
   */
  @Input() dataSource: any[] = [];

  /**
   * Column Defination Input
   * @type {{ field: string; header: string }[]}
   * @memberof TableComponent
   */
  @Input() columnDefs: { field: string; header: string }[] = [];

  /**
   * Output event when row is clicked
   */
  @Output() rowClicked = new EventEmitter<any>();

  /**
   * Columns to display
   * @type {string[]}
   * @memberof TableComponent
   */
  public displayedColumns: string[] = [];

  /**
   * Angular Lifecycle
   * @memberof TableComponent
   */
  ngOnInit() : void {
    this.displayedColumns = this.columnDefs.map(col => col.field);
  }

  /**
   * Method to Emit the Event when row is clicked
   * @param {*} row
   * @memberof TableComponent
   */
  public onRowClick(row: any) : void {
    this.rowClicked.emit(row);
  }


}
