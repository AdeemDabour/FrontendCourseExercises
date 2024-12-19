import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider ,CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  bookingDetails: any = null;
  ngOnInit(): void {
    this.bookingDetails = history.state.bookingDetails;
    console.log('Received booking details:', this.bookingDetails); // Debugging
    if (!this.bookingDetails) {
      alert('No booking details found!');
    }
  }  
}