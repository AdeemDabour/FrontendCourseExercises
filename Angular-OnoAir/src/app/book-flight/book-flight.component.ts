import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight, FlightsService } from '../flights.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Passenger } from '../bookings.service';

@Component({
  selector: 'app-book-flight',
  imports: [MatTableModule, MatCardModule, MatFormField, MatInput, MatLabel, MatDivider, MatHint, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.css'
})
export class BookFlightComponent implements OnInit {
  flight: Flight | null = null;
  numPassengers: number = 1;
  passengers: Passenger[] = [];

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
      this.updatePassengers();
    } else {
      alert('Flight not found!');
    }
  }
  updatePassengers(): void {
    if (!this.flight) return;
    this.passengers = Array.from({ length: this.numPassengers }, () => ({
      name: '',
      passport: ''
    }));
  }
  submitBooking(): void {
    if (!this.flight) {
      alert('No flight selected!');
      return;
    }
  
    const bookingDetails = {
      flight: this.flight,
      passengers: this.passengers
    };
  
    console.log('Navigating to booking details with:', bookingDetails);
    this.router.navigate(['/booking-details'], { state: { bookingDetails } });
  }
}