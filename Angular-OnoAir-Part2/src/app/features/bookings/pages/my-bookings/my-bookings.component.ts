import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../service/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Booking } from '../../model/booking';
import { BookingCardComponent } from '../booking-card/booking-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, BookingCardComponent, MatProgressBarModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  previousBookings: Booking[] = [];
  isLoading: boolean = true;
  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings(): Promise<void> {
    try {
      this.isLoading = true;
      const allBookings = await this.bookingService.listBookings(); // Await the Promise
      const today = new Date();

      // Initialize arrays for upcoming and previous bookings
      const upcoming: Booking[] = [];
      const previous: Booking[] = [];

      // Process each booking
      allBookings.forEach((booking: Booking) => {
        this.bookingService.getFlightDetails(booking.flightNo).subscribe((flight) => {
          if (!flight) {
            console.error(`Flight details not found for flight number: ${booking.flightNo}`);
            return;
          }

          const boardingDate = flight.boarding; // Already a Date type

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
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      this.isLoading = false;
    }
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
          boarding: flight.boarding, // Already a Date type
          landing: flight.landing,   // Already a Date type
          passengerCount: passengers.length,
        },
        passengers: passengers,
      };

      this.router.navigate(['/booking-details', booking.bookingCode], { state: { bookingDetails } });
    });
  }
}
