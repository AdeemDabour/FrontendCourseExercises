import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Flight, Status } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BookingService } from '../../../bookings/service/bookings.service';
import { DestinationService } from '../../../destinations/service/destinations.service';

@Component({
  selector: 'app-flights-table',
  imports: [MatSortModule, MatTableModule, MatButtonModule, MatIcon, DatePipe, MatPaginatorModule, CommonModule, MatProgressBarModule],
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnChanges, AfterViewInit {
  @Input() showActionsColumn: boolean = true;
  @Input() flights: Flight[] = [];

  displayedColumns: string[] = ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'price','actions'];
  dataSource = new MatTableDataSource<Flight>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Status = Status;
  isLoading: boolean = false;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private flightService: FlightsService,
    private bookingService: BookingService,
    private destinationService: DestinationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] && this.flights) {
      this.updateTableData();
    }

    this.displayedColumns = this.showActionsColumn
      ? ['id', 'flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'price', 'actions']
      : ['flightNo', 'origin', 'destination', 'boarding', 'landing', 'seats', 'price', 'book'];
  }

  ngAfterViewInit(): void {
    this.updateTableData();
  }

  private updateTableData(): void {
    if (this.flights.length) {
      this.dataSource.data = this.sortById(this.flights);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  async toggleFlightStatus(flight: Flight): Promise<void> {
    this.isLoading = true;

    const newStatus = flight.status === Status.Active ? Status.Inactive : Status.Active;
    const confirmMessage = newStatus === Status.Inactive
      ? 'Are you sure you want to Deactivate this flight?'
      : 'Are you sure you want to Activate this flight?';

    if (!confirm(confirmMessage)) {
      this.isLoading = false;
      return;
    }

    // Prevent Deactivation if There Are Active Bookings
    if (newStatus === Status.Inactive) {
      try {
        const activeBookings = await this.bookingService.getActiveBookingsForFlight(flight.flightNo);
        if (activeBookings.length > 0) {
          this.isLoading = false;
          alert(`This flight cannot be deactivated because there are active bookings: ${activeBookings.map(b => b.bookingCode).join(', ')}`);
          return;
        }
      } catch (error) {
        console.error('Error checking active bookings:', error);
        alert('Error verifying active bookings. Please try again.');
        this.isLoading = false;
        return;
      }
    }

    // Prevent Activation if Boarding Date is in the Past
    if (newStatus === Status.Active) {
      const now = new Date();
      const boardingDate = new Date(flight.boarding);

      if (boardingDate < now) {
        this.isLoading = false;
        alert(`This flight cannot be activated because its boarding time (${boardingDate.toLocaleString()}) has already passed. \n\n Please edit and update the flight Dates & Times if you want to activate it.`);
        return;
      }

      // Prevent Activation if the Destination or Origin is Inactive
      const destination = this.destinationService.getDestinationByName(flight.destination);
      const origin = this.destinationService.getDestinationByName(flight.origin);

      if ((destination && destination.status === Status.Inactive) ||
        (origin && origin.status === Status.Inactive)) {
        this.isLoading = false;
        alert(`This flight cannot be activated because its destination (${flight.destination}) or origin (${flight.origin}) is inactive.`);
        return;
      }
    }

    try {
      flight.status = newStatus;
      await this.flightService.updateFlight(flight.id, flight);
    } catch (error) {
      console.error('Error updating flight status:', error);
    } finally {
      this.isLoading = false;
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