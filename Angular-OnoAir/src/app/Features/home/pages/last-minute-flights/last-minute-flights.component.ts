import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../flights/model/flight';
import { FlightsService } from '../../../flights/service/flights.service';

@Component({
  selector: 'app-last-minute-flights',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatButtonModule, MatListModule, MatGridListModule, RouterLink],
  templateUrl: './last-minute-flights.component.html',
  styleUrl: './last-minute-flights.component.css'
})
export class LastMinuteFlightsComponent implements OnInit {
  @Input() flightNo = 0;

  lastMinuteFlights: Flight[] = [];

  constructor(private flightsService: FlightsService) {}
  ngOnInit(): void {
    this.lastMinuteFlights = this.flightsService.getFlightsThisWeek();
  }
}