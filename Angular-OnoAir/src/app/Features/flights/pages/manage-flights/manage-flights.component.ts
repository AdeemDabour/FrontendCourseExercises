import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { Flight, FlightsService } from '../../service/flights.service';

@Component({
  selector: 'app-manage-flights',
  imports: [FlightsTableComponent],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.flights = this.flightService.getFlights();
  }
}