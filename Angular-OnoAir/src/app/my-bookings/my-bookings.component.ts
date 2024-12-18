import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BookingService, Booking } from '../bookings.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, MatCardModule ],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Booking>();
  upcomingBookings: Booking[] = [];
  previousBookings: Booking[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) { }

  ngAfterViewInit(): void {
    const allBookings = this.bookingService.getBookings();
    const today = new Date();

    // Separate bookings into upcoming and previous
    this.upcomingBookings = allBookings.filter(
      booking => new Date(booking.boardingDateTime) > today
    );
    this.previousBookings = allBookings.filter(
      booking => new Date(booking.boardingDateTime) <= today
    );

    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
