import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit, OnDestroy {
  upcomingBookings: Booking[] = [];
  previousBookings: Booking[] = [];
  private subscription!: Subscription;

  constructor(private bookingService: BookingService, private router: Router) {}
  ngOnInit(): void {
    this.loadBookings();

    // Listen to navigation events for refreshing data
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/my-bookings') {
        this.loadBookings();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loadBookings(): void {
    const allBookings = this.bookingService.getBookings();
    const today = new Date();

    // Separate bookings into upcoming and previous
    this.upcomingBookings = allBookings.filter(
      booking => new Date(booking.boarding) > today
    );
    this.previousBookings = allBookings.filter(
      booking => new Date(booking.boarding) <= today
    );
  }
  viewBooking(booking: Booking): void {
    const bookingDetails = {
      bookingCode: booking.bookingCode,
      flight: {
        origin: booking.origin,
        destination: booking.destination,
        boarding: booking.boarding,
        landing: booking.landing,
        passengerCount: booking.passengerCount,
      },
      passengers: []
    };
  
    console.log('Navigating to booking-details with:', bookingDetails);
    this.router.navigate(['/booking-details'], { state: { bookingDetails } });
  }
  
} 