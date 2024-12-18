import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { BookingService, Booking } from '../bookings.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-bookings',
  imports: [MatSortModule, MatTableModule, DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['origin', 'destination', 'boardingDateTime', 'arrivalDateTime', 'passengerCount', 'imageUrl'];
  dataSource = new MatTableDataSource<Booking>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) { }

  ngAfterViewInit(): void {
    this.dataSource.data = this.bookingService.getBookings();
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
