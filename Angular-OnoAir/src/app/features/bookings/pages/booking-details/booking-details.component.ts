import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider, CommonModule, MatButtonModule, RouterLink],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  @Input() bookingCode = 0;
  bookingDetails: any = null;
  showPassengers: boolean = false;

  ngOnInit(): void {
    this.bookingDetails = history.state.bookingDetails;
  
    console.log('Booking Details:', this.bookingDetails);
  
    if (this.bookingDetails && this.bookingDetails.passengers) {
      console.log('Passengers:', this.bookingDetails.passengers);
    } else {
      console.error('No passengers found in bookingDetails!');
    }
  }  

  togglePassengerList(): void {
    console.log('Toggling passenger list. Current passengers:', this.bookingDetails.passengers);
    this.showPassengers = !this.showPassengers;
  }  
}