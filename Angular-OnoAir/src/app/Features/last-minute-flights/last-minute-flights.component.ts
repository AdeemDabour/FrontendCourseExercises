import { Component, OnInit } from '@angular/core';
import { FlightsService, Flight } from '../flights.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-minute-flights',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatButtonModule, MatListModule, MatGridListModule],
  templateUrl: './last-minute-flights.component.html',
  styleUrl: './last-minute-flights.component.css'
})
export class LastMinuteFlightsComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];

  constructor(private flightsService: FlightsService, private router: Router) {}

  ngOnInit(): void {
    this.lastMinuteFlights = this.flightsService.getFlightsThisWeek();
  }

  navigateToBooking(flight: Flight): void {
    this.router.navigate(['/book-flight', flight.flightNo]);
  }

}