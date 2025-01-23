import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Flight, Status } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-flight-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent implements OnInit {
  newFlight: Flight = new Flight(
    '0',
    '',
    '',
    '',
    new Date(),
    new Date(),
    '0',
    Status.Active
  );

  destinations: string[] = []; // List of destination names

  @Input() id = 0;

  constructor(
    private flightService: FlightsService,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id > 0) {
      this.flightService.getFlightByNumber(this.id.toString()).subscribe((flight) => {
        if (flight) {
          this.newFlight = flight;
        } else {
          console.error(`Flight with ID ${this.id} not found.`);
        }
      });
    }
  
    // Load destination names from the service
    this.destinations = this.destinationService.listDestinationNames();
  }
  

  addFlight(): void {
    this.flightService.createUniqueId().then((uniqueId) => {
      this.router.navigate(['/flight-form', uniqueId]);
    }).catch((error) => {
      console.error('Error generating unique ID:', error);
      alert('Failed to create a unique ID. Please try again.');
    });
  }
  

  removeFlight(): void {
    this.flightService.removeFlight(this.id.toString());
    this.router.navigate(['/manage-flights']);
  }

  onSubmitRegistration(): void {
    if (!this.isValidFlight()) {
      alert('Invalid flight details. Please correct the errors.');
      return;
    }
  
    // Generate the ID and proceed only after it's resolved
    if (!this.newFlight.id || this.newFlight.id.trim() === '') {
      this.flightService.createUniqueId().then((uniqueId) => {
        this.newFlight.id = uniqueId;
  
        // Add the flight after the ID is set
        this.flightService.addFlight(this.newFlight).then(() => {
          this.router.navigate(['/manage-flights']);
        }).catch((error) => {
          console.error('Error adding flight:', error);
          alert('Failed to add flight. Please try again.');
        });
      });
    }
  }
  

  isValidFlight(): boolean {
    const boardingDate = this.newFlight.boarding;
    const landingDate = this.newFlight.landing;
    return (
      boardingDate > new Date() &&
      boardingDate < landingDate &&
      this.newFlight.origin !== this.newFlight.destination &&
      Number(this.newFlight.seats) > 0
    );
  }

  isBoardingInFuture(): boolean {
    if (!this.newFlight.boarding) {
      return true;
    }
    const boardingDate = this.newFlight.boarding;
    return boardingDate > new Date();
  }

  isBoardingBeforeLanding(): boolean {
    if (!this.newFlight.boarding || !this.newFlight.landing) {
      return true;
    }
    const boardingDate = this.newFlight.boarding;
    const landingDate = this.newFlight.landing;
    return boardingDate < landingDate;
  }
}