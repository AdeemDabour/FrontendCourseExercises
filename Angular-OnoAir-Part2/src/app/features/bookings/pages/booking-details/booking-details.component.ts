import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingService } from '../../service/bookings.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Flight } from '../../../flights/model/flight';
import { FlightsService } from '../../../flights/service/flights.service';

@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider, CommonModule, MatButtonModule, RouterLink, MatProgressBarModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  bookingCode: string | null = null;
  bookingDetails: any | null = null;
  showPassengers: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  flight: Flight | null = null;

  constructor(
      private bookingService: BookingService,
      private route: ActivatedRoute,
      private flightService: FlightsService
    ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bookingCode = this.route.snapshot.paramMap.get('bookingCode');
    console.log('Booking Code from URL:', this.bookingCode);

    if (this.bookingCode) {
      this.fetchBookingDetails(this.bookingCode);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Booking code not provided in the URL.';
    }
  }

  private async fetchBookingDetails(bookingCode: string): Promise<void> {
    this.isLoading = true;
    try {
      this.bookingDetails = await this.bookingService.getBookingByCode(bookingCode);
      console.log('Fetched Booking Details:', this.bookingDetails);
      this.flightService.getFlightByNumber(this.bookingDetails.flightNo).subscribe({
        next: (flight) => {
          this.flight = flight || null;
        },
        error: (err) => {
          console.error('Error fetching flight details:', err);
          this.errorMessage = 'Unable to fetch flight details. Please try again later.';
        },
      })
      console.log('Flight:', this.bookingDetails.flightNo);
      console.log('flight:', this.flight);
      if (!this.bookingDetails) {
        this.errorMessage = `Booking with code "${bookingCode}" not found.`;
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
      this.errorMessage = 'Unable to fetch booking details. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }
  

  togglePassengerList(): void {
    this.showPassengers = !this.showPassengers;
  }
}
