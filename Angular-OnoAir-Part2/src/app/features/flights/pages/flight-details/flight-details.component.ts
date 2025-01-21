import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
@Component({
  selector: 'app-flight-details',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight | undefined = undefined; // Define the property and allow it to be undefined
  errorMessage: string | null = null; // Variable for error message

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService
  ) { }
  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo'); // Retrieve 'flightNo' from the route
    if (flightNo) {
      // Subscribe to the observable to get the flight details
      this.flightService.getFlightByNumber(flightNo).subscribe({
        next: (flight) => {
          if (flight) {
            this.flight = flight; // Assign the flight if it exists
          } else {
            this.errorMessage = `Flight with number "${flightNo}" does not exist.`; // Error if flight not found
          }
        },
        error: (err) => {
          this.errorMessage = `An error occurred while fetching flight details: ${err.message}`;
        },
      });
    } else {
      this.errorMessage = 'Invalid flight number in URL.'; // Error message if no flightNo in URL
    }
  }
}