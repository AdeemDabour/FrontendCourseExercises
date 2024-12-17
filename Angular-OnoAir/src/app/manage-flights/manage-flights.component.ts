import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { FlightsService, Flight } from '../flights.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-flights',
  imports: [MatSortModule, MatTableModule, MatIcon, DatePipe],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['flightNo.', 'origin', 'destination', 'boardingDateTime', 'arrivalDateTime', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightsService, private router: Router) {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.flightService.getFlights();
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Define the openFlightDetails method here
  openFlightDetails(flight: Flight): void {
    this.router.navigate(['/flight-details', flight.flightNo]);
  }
}