import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Passenger } from '../../model/passenger';
import { Flight } from '../../../flights/model/flight';

import { FlightsService } from '../../../flights/service/flights.service';
import { BookingService } from '../../service/bookings.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { Status } from '../../model/booking';
import { LuggageDialogComponent } from '../luggage-dialog/luggage-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-details',
  imports: [MatCardModule, MatDivider, CommonModule, MatButtonModule, RouterLink, MatProgressBarModule, MatIconModule],
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
  isUpcoming: boolean = false;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private flightService: FlightsService,
    private dialog: MatDialog
  ) { }

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
        this.bookingDetails.totalPrice = this.bookingDetails.totalPrice || 0;
        this.bookingDetails.discountPercentage = this.bookingDetails.discountPercentage || 0;
        this.bookingDetails.finalPrice = this.bookingDetails.finalPrice || this.bookingDetails.totalPrice;
        this.bookingDetails.usedCoupon = this.bookingDetails.usedCoupon || null;

        // ✅ Fetch flight details
        this.flightService.getFlightByNumber(this.bookingDetails.flightNo).subscribe({

          next: (flight) => {
            this.flight = flight || null;
          },
        });

        // ✅ Check if booking is upcoming
        const boardingDate = new Date(this.flight?.boarding || '');
        const today = new Date();
        this.isUpcoming = boardingDate > today && this.bookingDetails.status === Status.Active;
      }

    } catch (error) {
      this.errorMessage = `Booking with code "${bookingCode}" does not exist.`;
    } finally {
      this.isLoading = false;
    }
  }

  togglePassengerList(): void {
    this.showPassengers = !this.showPassengers;
  }

  openLuggageDialog(passenger: Passenger): void {
    const dialogRef = this.dialog.open(LuggageDialogComponent, {
      width: '400px',
      data: { passenger }
    });

    dialogRef.afterClosed().subscribe((updatedLuggage) => {
      if (updatedLuggage) {
        passenger.updateLuggage(updatedLuggage);
        this.bookingService.updateBooking(this.bookingDetails.id, this.bookingDetails);
      }
    });
  }

  getTotalLuggage(luggage: { cabin: number; checked: number; heavy: number }): number {
    return (luggage.cabin || 0) + (luggage.checked || 0) + (luggage.heavy || 0);
  }

  getTotalWeight(luggage: { cabin: number; checked: number; heavy: number }): number {
    return (luggage.cabin * 8 || 0) + (luggage.checked * 23 || 0) + (luggage.heavy * 32 || 0);
  }
}