import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { Flight } from '../../flights.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatIcon, DatePipe],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['flightNo.', 'origin', 'destination', 'boardingDateTime', 'arrivalDateTime', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.flights;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openFlightDetails(flight: Flight): void {
    this.router.navigate(['/flight-details', flight.flightNo]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      const originMatch = data.origin.toLowerCase().includes(filter);
      const destinationMatch = data.destination.toLowerCase().includes(filter);
      const boardingDateMatch = data.boardingDateTime.toDateString().toLowerCase().includes(filter);
      const arrivalDateMatch = data.arrivalDateTime.toDateString().toLowerCase().includes(filter);

      return originMatch || destinationMatch || boardingDateMatch || arrivalDateMatch;
    };
  }
}