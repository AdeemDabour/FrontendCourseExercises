import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../flights/service/flights.service';
import { FlightsTableComponent } from '../../../flights/pages/flights-table/flights-table.component';
import { Flight } from '../../../flights/model/flight';
import { CommonModule } from '@angular/common';
import { Timestamp } from 'firebase/firestore'; // Ensure you import Timestamp if using Firestore

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
    const now = new Date();
  
    this.flightService.listFlights().subscribe({
      next: (allFlights: Flight[]) => {
        this.futureFlights = allFlights.filter((flight: Flight) => {
          const boardingDate = flight.boarding;
          return boardingDate.getTime() > now.getTime();
        });
      },
      error: (error) => {
        console.error('Error fetching future flights:', error);
      },
    });
  }
}