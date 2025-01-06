import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Flight } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon, DatePipe, RouterLink],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() showActionsColumn: boolean = true;

  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['id', 'flightNo.', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightsService, private router: Router) { }

  ngOnChanges(): void {
    if (this.flights) {
      this.dataSource.data = this.flights;
    }

    this.displayedColumns = this.showActionsColumn
      ? ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions']
      : ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'book'];
  }

  ngAfterViewInit(): void {
    this.refreshFlights();
    this.dataSource.sort = this.sort;
  }

  refreshFlights(): void {
    this.dataSource.data = this.flightService.listFlights();
  }

  deleteFlight(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this flight?');
    if (confirmation) {
      this.flightService.removeFlight(id);
      this.refreshFlights();
    }
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

  addFlight(): void {
    this.router.navigate(['/flight-form', this.flightService.CreateUniqueId()]);
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      const originMatch = data.origin.toLowerCase().includes(filter);
      const destinationMatch = data.destination.toLowerCase().includes(filter);
      const boardingDateMatch = data.boarding.toDateString().toLowerCase().includes(filter);
      const arrivalDateMatch = data.landing.toDateString().toLowerCase().includes(filter);

      return originMatch || destinationMatch || boardingDateMatch || arrivalDateMatch;
    };
  }
}