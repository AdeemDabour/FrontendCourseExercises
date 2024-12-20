import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
@Component({
  selector: 'app-flight-search',
  imports: [FlightsTableComponent],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  futureFlights: Flight[] = [];

  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    const allFlights = this.flightService.getFlights();
    const today = new Date();

    this.futureFlights = allFlights.filter(flight => new Date(flight.boarding) > today);
  }
}