import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService, Flight } from '../flights.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent implements OnInit {

  flight: Flight | undefined; // Define the property and allow it to be undefined

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService
  ) {}

  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo'); // Retrieve 'flightNo' from the route
    if (flightNo) {
      this.flight = this.flightService.getFlightByNumber(flightNo); // Retrieve the flight
    }
  }

  goBack(): void {
    window.history.back();
  }
  
}
