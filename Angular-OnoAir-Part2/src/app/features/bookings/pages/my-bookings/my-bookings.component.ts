import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Booking, Status } from '../../model/booking';
import { Flight } from '../../../flights/model/flight';

import { BookingService } from '../../service/bookings.service';
import { FlightsService } from '../../../flights/service/flights.service';

import { BookingCardComponent } from '../booking-card/booking-card.component';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-my-bookings',
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
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings(): Promise<void> {
    try {
      this.isLoading = true;
      const allBookings = await this.bookingService.listBookings();
      const today = new Date();

      const upcoming: Booking[] = [];
      const previous: Booking[] = [];

      const flightDetails: { [key: string]: Flight } = {};

      const flightPromises = allBookings.map(async (booking) => {
        const flight = await firstValueFrom(this.bookingService.getFlightDetails(booking.flightNo));

        if (!flight) {
          console.error(`Flight details not found for flight number: ${booking.flightNo}`);
          return;
        }

        flightDetails[booking.flightNo] = flight;
        const boardingDate = new Date(flight.boarding);

        if (booking.totalPrice !== undefined && booking.finalPrice === undefined) {
          booking.finalPrice = booking.totalPrice * (1 - (booking.discountPercentage || 0) / 100);
        }

        if (boardingDate > today && booking.status !== Status.Inactive) {
          upcoming.push(booking);
        } else {
          if (booking.status !== Status.Inactive) {
            booking.status = Status.Inactive;
            await this.bookingService.updateBooking(booking.id, booking);
          }
          previous.push(booking);
        }
      });

      await Promise.all(flightPromises);

      this.upcomingBookings = upcoming.sort((a, b) => new Date(flightDetails[a.flightNo].boarding).getTime() - new Date(flightDetails[b.flightNo].boarding).getTime());
      this.previousBookings = previous.sort((a, b) => new Date(flightDetails[b.flightNo].boarding).getTime() - new Date(flightDetails[a.flightNo].boarding).getTime());

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
            boarding: flight.boarding,
            landing: flight.landing,
            passengerCount: passengers.length,
          },
          passengers: passengers,
          totalPrice: booking.totalPrice,
          discountPercentage: booking.discountPercentage,
          finalPrice: booking.finalPrice,
        };
        console.log('Navigating to booking details with:', bookingDetails);
        this.router.navigate(['/booking-details', booking.bookingCode], { state: { bookingDetails } });
      })
      .catch((error) => {
        console.error('Error fetching flight details:', error);
      });
  }

  async cancelBooking(booking: Booking): Promise<void> {
    this.isLoading = true;

    try {
      booking.status = Status.Inactive;
      booking.canceled = true;
      await this.bookingService.updateBooking(booking.id, booking);
      await this.flightService.updateSeatsForFlight(booking.flightNo, booking.passengers.length);

      this.upcomingBookings = this.upcomingBookings.filter(b => b.id !== booking.id);
      this.previousBookings.push({ ...booking, status: Status.Inactive });

      console.log(`Booking ${booking.bookingCode} canceled & moved to previous bookings.`);
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}