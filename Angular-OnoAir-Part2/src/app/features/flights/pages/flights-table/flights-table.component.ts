import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Flight } from '../../model/flight';

@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon, DatePipe],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnChanges {
  @Input() showActionsColumn: boolean = true;
  @Input() flights: Flight[] = [];
  
  displayedColumns: string[] = ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] && this.flights) {
      this.dataSource.data = this.sortById(this.flights);
    }

    this.displayedColumns = this.showActionsColumn
      ? ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions']
      : ['flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'book'];
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

  openEditFlight(flight: Flight): void {
    this.router.navigate(['/edit-flight', flight.id]);
  }

  openBookFlight(flight: Flight): void {
    this.router.navigate(['/book-flight', flight.flightNo]);
  }
  deleteFlight(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this flight?');
    if (confirmation) {
      //this.flightService.removeFlight(id);
      console.log(`Flight ${id} deleted`);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private sortById(flights: Flight[]): Flight[] {
    return flights.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
  }
}
