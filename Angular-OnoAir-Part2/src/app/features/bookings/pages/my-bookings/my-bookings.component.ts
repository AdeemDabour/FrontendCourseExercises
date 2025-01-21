import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../service/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Booking } from '../../model/booking';
import { BookingCardComponent } from '../booking-card/booking-card.component';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, BookingCardComponent],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  previousBookings: Booking[] = [];

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const allBookings = this.bookingService.listBookings();
    const today = new Date();

    // Initialize the arrays for upcoming and previous bookings
    const upcoming: Booking[] = [];
    const previous: Booking[] = [];

    // Process each booking
    allBookings.forEach((booking) => {
      this.bookingService.getFlightDetails(booking.flightNo).subscribe((flight) => {
        if (!flight) {
          console.error(`Flight details not found for flight number: ${booking.flightNo}`);
          return;
        }

        const boardingDate = (flight.boarding as Timestamp).toDate(); // Convert Timestamp to Date

        if (boardingDate > today) {
          upcoming.push(booking);
        } else {
          previous.push(booking);
        }

        // Update the properties after processing
        this.upcomingBookings = [...upcoming];
        this.previousBookings = [...previous];
      });
    });
  }

  viewBooking(booking: Booking): void {
    this.bookingService.getFlightDetails(booking.flightNo).subscribe((flight) => {
      if (!flight) {
        console.error(`Flight details not found for flight number: ${booking.flightNo}`);
        return;
      }

      const passengers = booking.passengers;
      const bookingDetails = {
        bookingCode: booking.bookingCode,
        flight: {
          origin: flight.origin,
          destination: flight.destination,
          boarding: (flight.boarding as Timestamp).toDate(), // Convert Timestamp to Date
          landing: (flight.landing as Timestamp).toDate(),   // Convert Timestamp to Date
          passengerCount: passengers.length,
        },
        passengers: passengers,
      };

      this.router.navigate(['/booking-details', booking.bookingCode], { state: { bookingDetails } });
    });
  }
}