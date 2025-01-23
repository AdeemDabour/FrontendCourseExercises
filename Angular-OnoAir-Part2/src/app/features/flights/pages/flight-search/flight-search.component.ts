import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  imports: [FlightsTableComponent, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();

  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    const today = new Date();
    this.futureFlights$ = this.flightService.listFlights().pipe(
      map((flights: Flight[]) => 
        flights.filter((flight: Flight) => flight.boarding > today) // Filter future flights
      )
    );
  }
}