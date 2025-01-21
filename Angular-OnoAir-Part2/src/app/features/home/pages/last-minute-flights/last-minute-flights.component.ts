import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Flight } from '../../../flights/model/flight';
import { FlightsService } from '../../../flights/service/flights.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-last-minute-flights',
  imports: [CommonModule, MatGridListModule, FlightCardComponent],
  templateUrl: './last-minute-flights.component.html',
  styleUrl: './last-minute-flights.component.css'
})
export class LastMinuteFlightsComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];

  constructor(private flightsService: FlightsService) { }
  ngOnInit(): void {
    this.flightsService.getFlightsThisWeek().subscribe({
      next: (flights: Flight[]) => {
        this.lastMinuteFlights = flights;
      },
      error: (error) => {
        console.error('Error fetching last minute flights:', error);
      },
    });
  }
}