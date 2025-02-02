import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../flights/service/flights.service';
import { FlightsTableComponent } from '../../../flights/pages/flights-table/flights-table.component';
import { Flight } from '../../../flights/model/flight';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-find-flight',
  imports: [FlightsTableComponent, CommonModule, MatProgressBarModule],
  templateUrl: './find-flight.component.html',
  styleUrl: './find-flight.component.css'
})
export class FindFlightComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();
  isLoading: boolean = true;
  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    try {
      this.futureFlights$ = this.flightService.getFutureFlights();
    } catch (error) {
      console.warn('Error fetching future flights:', error);
    } finally {
      this.isLoading = false;
    }
  }  
}