import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../flights/service/flights.service';
import { FlightsTableComponent } from '../../../flights/pages/flights-table/flights-table.component';
import { Flight } from '../../../flights/model/flight';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-find-flight',
  imports: [FlightsTableComponent, CommonModule, MatProgressBarModule],
  templateUrl: './find-flight.component.html',
  styleUrl: './find-flight.component.css'
})
export class FindFlightComponent implements OnInit {
  futureFlights: Flight[] = [];
  isLoading: boolean = true;
  constructor(private flightService: FlightsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const now = new Date();
    try {
      this.flightService.listFlights().subscribe({
        next: (allFlights: Flight[]) => {
          this.futureFlights = allFlights.filter((flight: Flight) => {
            const boardingDate = flight.boarding;
            return boardingDate.getTime() > now.getTime();
          });
        },
      });
    } catch (error) {
      console.error('Error fetching future flights:', error);
    } finally {
      this.isLoading = false;
    }
    
  }
}