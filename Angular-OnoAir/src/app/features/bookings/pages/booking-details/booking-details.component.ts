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
  errorMessage: string | null = null; // Error message property
  ngOnInit(): void {
    const bookingCodeFromState = history.state.bookingDetails?.bookingCode;
    const bookingCodeFromUrl = this.bookingCode;
  
    if (bookingCodeFromState) {
      this.bookingCode = bookingCodeFromState; // Set booking code from state
      this.bookingDetails = history.state.bookingDetails;
  
      if (this.bookingDetails && this.bookingDetails.passengers) {
        console.log('Passengers:', this.bookingDetails.passengers);
      } else {
        console.error('No passengers found in bookingDetails!');
      }
    } else {
      this.errorMessage = `Booking with code "${bookingCodeFromUrl}" not found. Please check the booking code.`;
    }
  }  
  
  togglePassengerList(): void {
    console.log('Toggling passenger list. Current passengers:', this.bookingDetails.passengers);
    this.showPassengers = !this.showPassengers;
  }  
}