import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../service/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Booking } from '../../model/booking';
import { BookingCardComponent } from '../booking-card/booking-card.component';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, MatCardModule, MatButtonModule, BookingCardComponent],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: Booking[] = [];
  previousBookings: Booking[] = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const allBookings = this.bookingService.listBookings();
    const today = new Date();

    const [upcoming, previous] = allBookings.reduce((acc, booking) => {
      const flight = this.bookingService.getFlightDetails(booking.flightNo);
      if (!flight) {
        console.error(`Flight details not found for flight number: ${booking.flightNo}`);
        return acc;
      }

      if (new Date(flight.boarding) > today) {
        acc[0].push(booking);
      } else {
        acc[1].push(booking);
      }
      return acc;
    }, [[], []] as [Booking[], Booking[]]);

    this.upcomingBookings = upcoming;
    this.previousBookings = previous;
  }

  viewBooking(booking: Booking): void {
    const flight = this.bookingService.getFlightDetails(booking.flightNo);
    if (!flight) {
      console.error(`Flight details not found for flight number: ${booking.flightNo}`);
      return;
    }

    const passengers = this.bookingService.getPassengersByIds(booking.passengerIds);

    const bookingDetails = {
      bookingCode: booking.bookingCode,
      flight: {
        origin: flight.origin,
        destination: flight.destination,
        boarding: flight.boarding,
        landing: flight.landing,
        passengerCount: booking.passengerCount,
      },
      passengers: passengers
    };

    this.router.navigate(['/booking-details', booking.bookingCode], { state: { bookingDetails } });
  }
}