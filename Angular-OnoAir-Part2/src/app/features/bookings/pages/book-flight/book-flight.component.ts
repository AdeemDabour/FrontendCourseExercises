import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FlightsService } from '../../../flights/service/flights.service';
import { Flight } from '../../../flights/model/flight';
import { Passenger } from '../../model/passenger';
import { PassengerCardComponent } from '../passenger-card/passenger-card.component';
import { BookingService } from '../../service/bookings.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-book-flight',
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    MatHint,
    MatButtonModule,
    FormsModule,
    CommonModule,
    PassengerCardComponent,
    MatProgressBarModule
  ],
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  flight: Flight | null = null;
  numPassengers: number = 1;
  passengers: Passenger[] = [];
  bookingCode: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo');
    if (flightNo) {
      this.loadFlightDetails(flightNo);
    } else {
      this.errorMessage = 'Invalid flight number in URL.';
    }
  }

  loadFlightDetails(flightNo: string): void {
    this.flightsService.getFlightByNumber(flightNo).subscribe({
      next: (flight) => {
        if (flight) {
          this.flight = flight;
          this.createPassengerList();
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
    const maxSeats = parseInt(this.flight?.seats || '1', 10) || 1;
    this.numPassengers = Math.min(value, maxSeats);
    this.createPassengerList();
  }

  createPassengerList(): void {
    // Dynamically adjust the passenger list length
    const currentPassengers = this.passengers;
    this.passengers = Array.from({ length: this.numPassengers }, (_, i) => ({
      name: currentPassengers[i]?.name || '',
      passport: currentPassengers[i]?.passport || '',
    }));
  }

  updatePassenger(index: number, passenger: Passenger): void {
    if (index >= 0 && index < this.passengers.length) {
      this.passengers[index] = passenger;
    }
  }

  async submitBooking(): Promise<void> {
    if (!this.flight) {
      this.errorMessage = 'No flight selected.';
      return;
    }

    this.isLoading = true;

    try {
      const bookingCode = await this.bookingService.saveBooking(this.flight.flightNo, this.passengers);
      await this.flightsService.updateSeatsForFlight(this.flight.flightNo, -this.passengers.length);
      this.router.navigate(['/booking-details', bookingCode], {
        state: { flight: this.flight, passengers: this.passengers },
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
    return this.passengers.every(passenger => 
      /^[A-Za-z ]+$/.test(passenger.name) && /^\d{9,10}$/.test(passenger.passport)
    );
  }
}