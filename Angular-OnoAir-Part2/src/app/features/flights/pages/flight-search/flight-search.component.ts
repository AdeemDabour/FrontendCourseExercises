import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-flight-search',
  imports: [FlightsTableComponent, CommonModule, MatProgressBarModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();
  isLoading: boolean = true;
  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    try {
      this.futureFlights$ = this.flightService.getFutureFlights();
    } catch (error) {
      console.warn('Error fetching future flights:', error);
    } finally {
      this.isLoading = false;
    }
  }  
}