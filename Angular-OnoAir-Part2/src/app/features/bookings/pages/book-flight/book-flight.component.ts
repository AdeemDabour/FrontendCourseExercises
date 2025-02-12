import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Passenger } from '../../model/passenger';
import { Flight } from '../../../flights/model/flight';
import { Coupon } from '../../../coupons/model/coupon';

import { BookingService } from '../../service/bookings.service';
import { CouponService } from '../../../coupons/service/coupon.service';
import { FlightsService } from '../../../flights/service/flights.service';

import { PassengerCardComponent } from '../passenger-card/passenger-card.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-book-flight',
  imports: [MatTableModule, MatCardModule, MatFormField, MatInput, MatLabel, MatDivider, MatHint, MatButtonModule, FormsModule, CommonModule, PassengerCardComponent, MatProgressBarModule, MatDialogModule, PassengerCardComponent],
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  [x: string]: any;
  flight: Flight | null = null;
  numPassengers: number = 1;
  passengers: Passenger[] = [];
  bookingCode: string = '';
  couponCode: string = '';
  discountPercentage: number = 0;
  totalPrice: number = 0;
  finalPrice: number = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  passportErrorMessage: string | null = null;
  isLoading: boolean = false;
  coupons: Coupon[] = [];
  couponErrorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private router: Router,
    private bookingService: BookingService,
    private couponService: CouponService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    const flightNo = this.route.snapshot.paramMap.get('flightNo');
    if (flightNo) {
      this.loadFlightDetails(flightNo);
    } else {
      this.errorMessage = 'Invalid flight number in URL.';
    }
    this.coupons = await this.couponService.loadCoupons();
  }

  loadFlightDetails(flightNo: string): void {
    this.flightsService.getFlightByNumber(flightNo).subscribe({
      next: (flight) => {
        if (flight) {
          this.flight = flight;
          this.createPassengerList();
          this.calculateTotalPrice();
        } else {
          this.errorMessage = `Flight with number "${flightNo}" does not exist.`;
        }
      },
      error: (err) => {
        console.error('Error loading flight details:', err);
        this.errorMessage = 'Unable to load flight details. Please try again later.';
      },
    });
  }

  updatePassengers(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10) || 1;
    const maxSeats = Number(this.flight?.seats) || 1;
    this.numPassengers = Math.min(value, maxSeats);
    this.createPassengerList();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    if (this.flight) {
      this.totalPrice = this.numPassengers * Number(this.flight.price);
      this.updateFinalPrice();
    }
  }

  updateFinalPrice(): void {
    this.finalPrice = this.totalPrice * (1 - this.discountPercentage / 100);
  }

  createPassengerList(): void {
    const currentPassengers = this.passengers;
    this.passengers = Array.from({ length: this.numPassengers }, (_, i) => ({
      name: currentPassengers[i]?.name || '',
      passport: currentPassengers[i]?.passport || '',
      luggage: currentPassengers[i]?.luggage || { cabin: 0, checked: 0, heavy: 0 }
    }));
  }

  updateTotalPrice(): void {
    if (this.flight) {
      this.totalPrice = this.numPassengers * this.flight.price;
      this.finalPrice = this.totalPrice * (1 - this.discountPercentage / 100);
    }
  }
  async applyCoupon(): Promise<void> {
    this.couponErrorMessage = null;

    if (!this.couponCode.trim()) {
      this.couponErrorMessage = 'Please enter a coupon code';
      return;
    }

    try {
      const discount = await this.couponService.applyCoupon(this.couponCode.trim());

      if (discount > 0) {
        this.discountPercentage = discount;
        this.couponErrorMessage = null;
      } else {
        this.couponErrorMessage = 'Invalid or expired coupon code';
        this.discountPercentage = 0;
      }
    } catch (error) {
      this.couponErrorMessage = String(error);
    }

    this.updateTotalPrice();
  }

  async submitBooking(): Promise<void> {
    if (!this.flight) {
      this.errorMessage = 'No flight selected.';
      return;
    }

    this.isLoading = true;

    try {
      const newBooking = {
        flightNo: this.flight!.flightNo,
        passengers: this.passengers.map(passenger => ({
          name: passenger.name,
          passport: passenger.passport,
          luggage: passenger.luggage
        })),
        totalPrice: this.totalPrice,
        discountPercentage: this.discountPercentage,
        finalPrice: this.finalPrice,
        status: 'Active',
        canceled: false
      };

      const bookingCode = await this.bookingService.saveBooking(
        newBooking.flightNo,
        newBooking.passengers,
        newBooking.totalPrice,
        newBooking.discountPercentage,
        newBooking.finalPrice
      );

      await this.flightsService.updateSeatsForFlight(this.flight.flightNo, -this.passengers.length);

      this.snackBar.open('Booking Booked successfully!', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      this.router.navigate(['/booking-details', bookingCode], {
        state: { bookingDetails: newBooking }
      });

    } catch (error) {
      this.errorMessage = 'Unable to complete booking. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/flight-search']);
  }

  isFormValid(): boolean {
    const hasValidPassengers = this.passengers.every(passenger =>
      /^[A-Za-z ]+$/.test(passenger.name) && /^\d{9,10}$/.test(passenger.passport)
    );
  
    return hasValidPassengers && !this.hasDuplicatePassports();
  }
  
  hasDuplicatePassports(): boolean {
    const passportNumbers = this.passengers.map(p => p.passport.trim()).filter(p => p !== '');
    const uniquePassports = new Set(passportNumbers);
  
    if (passportNumbers.length !== uniquePassports.size) {
      this.passportErrorMessage = "There are passengers with the same passport number. Please check and correct.";
      return true;
    }
  
    this.passportErrorMessage = null;
    return false;
  }
  
  updatePassenger(index: number, passenger: { name: string; passport: string }): void {
    if (index >= 0 && index < this.passengers.length) {
      this.passengers[index] = new Passenger(
        passenger.name,
        passenger.passport,
        this.passengers[index]?.luggage || { cabin: 0, checked: 0, heavy: 0 }
      );
      this.hasDuplicatePassports();
    }
  }

  updateLuggage(index: number, luggage: { cabin: number; checked: number; heavy: number }): void {
    if (index >= 0 && index < this.passengers.length) {
      this.passengers[index].luggage = luggage;
    }
  }
}