import { AfterViewInit, Component, ViewChild, inject, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Flight } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon, DatePipe],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() showActionsColumn: boolean = true;

  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightsService, private router: Router) { }

  ngOnChanges(): void {
    this.refreshFlights();
    if (this.flights) {
      this.dataSource.data = this.sortById(this.flights); // Sort before assigning
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
    this.flightService.refreshFlights();
    this.flightService.listFlights().subscribe({
      next: (flights: Flight[]) => {
        this.dataSource.data = this.sortById(flights); // Sort before assigning to dataSource
      },
      error: (error: any) => {
        console.error('Failed to refresh flights:', error); // Handle errors gracefully
      },
    });
  }
  
  deleteFlight(id: string): void {
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
  openEditFlight(flight: Flight): void {
    this.router.navigate(['/edit-flight', flight.id]);
  }
  openBookFlight(flight: Flight): void {
    this.router.navigate(['/book-flight', flight.flightNo]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: Flight, filter: string) => {
      const originMatch = data.origin.toLowerCase().includes(filter);
      const destinationMatch = data.destination.toLowerCase().includes(filter);
      const boardingDateMatch = data.boarding.toLocaleDateString().toLowerCase().includes(filter);
      const landingDateMatch = data.landing.toLocaleDateString().toLowerCase().includes(filter);
  
      return originMatch || destinationMatch || boardingDateMatch || landingDateMatch;
    };
  }

  private sortById(flights: Flight[]): Flight[] {
    return flights.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
  }
}