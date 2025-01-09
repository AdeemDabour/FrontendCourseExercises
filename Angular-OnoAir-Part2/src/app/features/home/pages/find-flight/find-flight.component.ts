import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../flights/service/flights.service';
import { FlightsTableComponent } from '../../../flights/pages/flights-table/flights-table.component';
import { Flight } from '../../../flights/model/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-flight',
  imports: [FlightsTableComponent, CommonModule],
  templateUrl: './find-flight.component.html',
  styleUrl: './find-flight.component.css'
})
export class FindFlightComponent implements OnInit {
  futureFlights: Flight[] = [];

  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    const allFlights = this.flightService.listFlights();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.futureFlights = allFlights.filter(flight => {
      const boardingDate = new Date(flight.boarding);
      return boardingDate > today;
    });

    console.log('Future Flights:', this.futureFlights);
  }
}