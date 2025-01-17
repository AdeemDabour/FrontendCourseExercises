import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Flight } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-flight-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule, MatOptionModule, MatSelectModule],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  newFlight: Flight = new Flight(0, '', '', '', new Date(), new Date(), 0);
  destinations: string[] = []; // List of destination names

  @Input() id = 0;

  constructor(
    private flightService: FlightsService,
    private destinationService: DestinationService, // Inject the service
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.id > 0) {
      const flight = this.flightService.getFlightByNumber(this.id.toString());
      if (flight) {
        this.newFlight = flight;
      }
    }

    // Load destination names from the service
    this.destinations = this.destinationService.listDestinationNames();
  }

  addFlight(): void {
    this.flightService.addFlight(this.newFlight);
    this.router.navigate(['/manage-flights']);
  }

  removeFlight() {
    this.flightService.removeFlight(this.id);
    this.router.navigate(['/manage-flights']);
  }

  onSumbitRegistration(): void {
    if (!this.isValidFlight()) {
      alert('Invalid flight details. Please correct the errors.');
      return;
    }
  
    if (!this.newFlight.id || this.newFlight.id === 0) {
      this.newFlight.id = this.flightService.CreateUniqueId();
    }
  
    this.flightService.addFlight(this.newFlight);
    this.router.navigate(['/manage-flights']);
  }
  

  isValidFlight(): boolean {
    if (!this.isBoardingInFuture()) {
      return false; // Boarding time must be in the future
    }
  
    if (!this.isBoardingBeforeLanding()) {
      return false; // Boarding time must be before landing time
    }
  
    if (this.newFlight.origin === this.newFlight.destination) {
      return false; // Origin and destination must be different
    }
  
    if (this.newFlight.seats <= 0) {
      return false; // Number of seats must be greater than 0
    }
  
    return true;
  }
  

  isBoardingInFuture(): boolean {
    if (!this.newFlight.boarding) {
      return true;
    }
  
    const boardingDate = new Date(this.newFlight.boarding);
    return boardingDate > new Date();
  }
  
  isBoardingBeforeLanding(): boolean {
    if (!this.newFlight.boarding || !this.newFlight.landing) {
      return true;
    }
  
    const boardingDate = new Date(this.newFlight.boarding);
    const landingDate = new Date(this.newFlight.landing);
    return boardingDate < landingDate;
  }  
}