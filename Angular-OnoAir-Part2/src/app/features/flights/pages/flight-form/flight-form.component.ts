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
@Component({
  selector: 'app-flight-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.css'
})
export class FlightFormComponent implements OnInit {

  newFlight: Flight = new Flight(0, '', '', '', new Date(), new Date(), 0);

  @Input() id = 0;

  constructor(private flightService: FlightsService, private router: Router) { };

  ngOnInit(): void {
    if (this.id > 0) {
      const flight = this.flightService.getFlightByNumber(this.id.toString());
      if (flight) {
        this.newFlight = flight;
      }
    }
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
    if (!this.newFlight.id || this.newFlight.id === 0) {
      this.newFlight.id = this.flightService.CreateUniqueId();
    }
    this.flightService.addFlight(this.newFlight);
    this.router.navigate(['/manage-flights']);
  }
}