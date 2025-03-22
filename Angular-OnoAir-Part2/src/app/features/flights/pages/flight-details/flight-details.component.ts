import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Flight } from '../../model/flight';

import { FlightsService } from '../../service/flights.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight | undefined = undefined;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService
  ) { }
  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo');
    if (flightNo) {
      // Subscribe to the observable to get the flight details
      this.flightService.getFlightByNumber(flightNo).subscribe({
        next: (flight) => {
          if (flight) {
            this.flight = flight;
          } else {
            this.errorMessage = `Flight with number "${flightNo}" does not exist.`;
          }
        },
        error: (err) => {
          this.errorMessage = `An error occurred while fetching flight details: ${err.message}`;
        },
      });
    } else {
      this.errorMessage = 'Invalid flight number in URL.';
    }
  }
}