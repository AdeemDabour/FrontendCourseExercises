import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> implements AfterViewInit {
  @Input() dataSource = new MatTableDataSource<T>();
  @Input() displayedColumns: string[] = [];
  @Input() actions: { name: string; callback: (element: T) => void }[] = [];

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  onAction(callback: (element: T) => void, element: T) {
    callback(element);
  }

  // Check if a column is a date column
  isDateColumn(column: string): boolean {
    return ['boardingDate', 'arrivalDate'].includes(column);
  }
}