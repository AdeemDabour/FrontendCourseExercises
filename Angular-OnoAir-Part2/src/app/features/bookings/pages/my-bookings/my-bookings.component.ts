import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../service/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Booking, Status } from '../../model/booking';
import { BookingCardComponent } from '../booking-card/booking-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlightsService } from '../../../flights/service/flights.service';
import { firstValueFrom } from 'rxjs';
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
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private flightService: FlightsService
    ) {}

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
  
      // Create an array of promises for fetching flights
      const flightPromises = allBookings.map(async (booking) => {
        const flight = await firstValueFrom(this.bookingService.getFlightDetails(booking.flightNo));
        
        if (!flight) {
          console.error(`Flight details not found for flight number: ${booking.flightNo}`);
          return;
        }
  
        const boardingDate = flight.boarding; // Already a Date type
  
        if (boardingDate > today) {
          upcoming.push(booking);
        } else {
          // Add the booking to the previous array and update its status
          if (booking.status !== Status.Inactive) {
            await this.bookingService.updateBookingStatus(booking.id, Status.Inactive);
          }
          previous.push(booking);
        }
      });
  
      // Wait for all flights to be fetched before updating the UI
      await Promise.all(flightPromises);
  
      // Update the properties after processing
      this.upcomingBookings = [...upcoming];
      this.previousBookings = [...previous];
  
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  

  viewBooking(booking: Booking): void {
    firstValueFrom(this.bookingService.getFlightDetails(booking.flightNo))
      .then((flight) => {
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
  
        console.log('Navigating to booking details with:', bookingDetails);
  
        // Prevent infinite navigation by ensuring we are not already on the same page
        if (this.router.url !== `/booking-details/${booking.bookingCode}`) {
          this.router.navigate(['/booking-details', booking.bookingCode], { state: { bookingDetails } });
        }
      })
      .catch((error) => {
        console.error('Error fetching flight details:', error);
      });
  }
  
}
