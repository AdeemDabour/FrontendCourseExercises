import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  flightNo: string;
  origin: string;
  destination: string;
  boardingDate: Date;
  boardingTime: string;
  arrivalDate: Date;
  arrivalTime: string;
  seats: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  @Input() dataSource = new MatTableDataSource<PeriodicElement>();
  @Output() editFlight = new EventEmitter<PeriodicElement>();

  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: string[] = [
    'flightNo',
    'origin',
    'destination',
    'boardingDate',
    'boardingTime',
    'arrivalDate',
    'arrivalTime',
    'seats',
    'actions',
  ];

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  onEditFlight(flight: PeriodicElement) {
    this.editFlight.emit(flight);
  }
}