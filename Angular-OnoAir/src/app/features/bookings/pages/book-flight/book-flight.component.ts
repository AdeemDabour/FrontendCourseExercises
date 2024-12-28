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
@Component({
  selector: 'app-book-flight',
  imports: [MatTableModule, MatCardModule, MatFormField, MatInput, MatLabel, MatDivider, MatHint, MatButtonModule, FormsModule, CommonModule, PassengerCardComponent],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css'
})
export class BookFlightComponent implements OnInit {
  flight: Flight | null = null;
  numPassengers: number = 1;
  passengers: Passenger[] = [];
  bookingCode: string = '';

  constructor(private route: ActivatedRoute, private flightsService: FlightsService, private router: Router) {}

  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo');
    if (flightNo) {
      this.loadFlightDetails(flightNo);
    }
  }

  loadFlightDetails(flightNo: string): void {
    this.flight = this.flightsService.getFlightByNumber(flightNo) || null;
    if (this.flight) {
      this.createPassengerList();
    } else {
      alert('Flight not found!');
    }
  }

  updatePassengers(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10) || 1;
    this.numPassengers = Math.min(value, this.flight?.seats ?? 1);
    this.createPassengerList();
  }

  createPassengerList(): void {
    this.passengers = Array.from({ length: this.numPassengers }, (_, i) => ({
      name: this.passengers[i]?.name || '',
      passport: this.passengers[i]?.passport || ''
    }));
  }

  updatePassenger(index: number, passenger: Passenger): void {
    this.passengers[index] = passenger;
  }

  submitBooking(): void {
    this.bookingCode = this.generateBookingCode();
    const bookingDetails = {
      bookingCode: this.bookingCode,
      flight: this.flight,
      passengers: this.passengers
    };

    console.log('Navigating to booking details with:', bookingDetails);
    this.router.navigate(['/booking-details', this.bookingCode], { state: { bookingDetails } });
  }

  private generateBookingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('');
  }
}