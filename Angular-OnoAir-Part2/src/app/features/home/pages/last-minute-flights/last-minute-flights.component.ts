import { Component, OnInit } from '@angular/core';

import { Flight } from '../../../flights/model/flight';

import { FlightsService } from '../../../flights/service/flights.service';

import { FlightCardComponent } from '../flight-card/flight-card.component';

import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-last-minute-flights',
  imports: [CommonModule, MatGridListModule, FlightCardComponent, MatProgressBarModule],
  templateUrl: './last-minute-flights.component.html',
  styleUrls: ['./last-minute-flights.component.css']
})
export class LastMinuteFlightsComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];
  isLoading: boolean = true;
  constructor(private flightsService: FlightsService) { }
  ngOnInit(): void {
    this.isLoading = true;
    try {
      this.flightsService.getFlightsThisWeek().subscribe({
        next: (flights: Flight[]) => {
          this.lastMinuteFlights = flights;
        },
      } 
      );} catch (error) {
      console.error('Error fetching last minute flights:', error);
    } finally {
      this.isLoading = false;
    }
  }
}