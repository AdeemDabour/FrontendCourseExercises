import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-flight-search',
  imports: [FlightsTableComponent, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  futureFlights: Flight[] = [];

  constructor(private flightService: FlightsService) { }

  ngOnInit(): void {
    const allFlights = this.flightService.listFlights();
    const today = new Date();

    this.futureFlights = allFlights.filter(flight => new Date(flight.boarding) > today);
  }
}