import { Component } from '@angular/core';
import { FlightsService, Flight } from '../../../flights/service/flights.service';
import { FlightsTableComponent } from '../../../flights/pages/flights-table/flights-table.component';

@Component({
  selector: 'app-find-fligt',
  imports: [FlightsTableComponent],
  templateUrl: './find-flight.component.html',
  styleUrl: './find-flight.component.css'
})
export class FindFlightComponent {
  futureFlights: Flight[] = [];

  constructor(private flightService: FlightsService) {
    this.flightService.getFlights().forEach(flight => {
      if (flight.boarding > new Date()) {
        this.futureFlights.push(flight);
      }
    });
  }

}