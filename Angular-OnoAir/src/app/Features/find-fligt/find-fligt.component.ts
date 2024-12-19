import { Component } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService, Flight } from '../../flights.service';

@Component({
  selector: 'app-find-fligt',
  imports: [FlightsTableComponent],
  templateUrl: './find-fligt.component.html',
  styleUrl: './find-fligt.component.css'
})
export class FindFligtComponent {
  futureFlights: Flight[] = [];

  constructor(private flightService: FlightsService) {
    this.flightService.getFlights().forEach(flight => {
      if (flight.boarding > new Date()) {
        this.futureFlights.push(flight);
      }
    });
  }

}
