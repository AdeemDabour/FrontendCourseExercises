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
import { Passenger } from '../../model/passenger';
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
      private flightService: FlightsService,
    ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.bookingCode = this.route.snapshot.paramMap.get('bookingCode');
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
      
      if (this.bookingDetails) {
        console.log('✅ Booking details loaded:', this.bookingDetails);
  
        this.bookingDetails.totalPrice = this.bookingDetails.totalPrice || 0;
        this.bookingDetails.discountPercentage = this.bookingDetails.discountPercentage || 0;
        this.bookingDetails.finalPrice = this.bookingDetails.finalPrice || this.bookingDetails.totalPrice;
  
        this.bookingDetails.passengers = this.bookingDetails.passengers.map((passenger: Passenger) => ({
          ...passenger,
          luggage: passenger.luggage || { cabin: 0, checked: 0, heavy: 0 }
        }));
  
        console.log('✅ Updated Passengers:', this.bookingDetails.passengers);
      } else {
        console.warn('⚠️ No booking details found');
      }
  
      this.flightService.getFlightByNumber(this.bookingDetails.flightNo).subscribe({
        next: (flight) => {
          this.flight = flight || null;
        },
      });
  
    } catch (error) {
      this.errorMessage = `Booking with code "${bookingCode}" does not exist.`;
    } finally {
      this.isLoading = false;
    }
  }
  

  togglePassengerList(): void {
    this.showPassengers = !this.showPassengers;
  }

  getTotalLuggage(luggage: { cabin: number; checked: number; heavy: number }): number {
    return (luggage.cabin || 0) + (luggage.checked || 0) + (luggage.heavy || 0);
  }
  
  getTotalWeight(luggage: { cabin: number; checked: number; heavy: number }): number {
    return (luggage.cabin * 8 || 0) + (luggage.checked * 23 || 0) + (luggage.heavy * 32 || 0);
  }  
}