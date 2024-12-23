import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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

  flight: Flight | undefined;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightsService
  ) { }

  ngOnInit(): void {
    const flightNo = this.route.snapshot.paramMap.get('flightNo');
    if (flightNo) {
      this.flight = this.flightService.getFlightByNumber(flightNo);
      if (!this.flight) {
        this.errorMessage = `Flight with number ${flightNo} does not exist.`;
      }
    } else {
      this.errorMessage = 'No flight number provided in the URL.';
    }
  }
}