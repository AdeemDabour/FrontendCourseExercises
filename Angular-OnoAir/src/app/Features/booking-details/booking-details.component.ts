import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider ,CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  @Input() bookingCode = 0;
  bookingDetails: any = null;

  ngOnInit(): void {
    this.bookingDetails = history.state.bookingDetails;

    console.log('Booking Code:', this.bookingCode);
    console.log('Booking Details:', this.bookingDetails);

    if (!this.bookingDetails) {
      alert('No booking details found!');
    }
  }
}