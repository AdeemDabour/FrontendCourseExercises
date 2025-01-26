import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-manage-flights',
  imports: [FlightsTableComponent, MatButtonModule, CommonModule, MatProgressBarModule],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent implements OnInit {
  flights: Flight[] = [];
  isLoading: boolean = true;
  constructor(private flightService: FlightsService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlights();
  }
  async loadFlights(): Promise<void> {
    await this.flightService.refreshFlights();
    try {
      this.flightService.listFlights().subscribe({
        next: (flights) => {
          this.flights = flights;
        },
      }
    );} catch (error) {
      console.error('Failed to load flights:', error);
    }
    finally {
      this.isLoading = false;
    }

  }
  navigateToAddFlight(): void {
    this.flightService.createUniqueId().then((uniqueId) => {
      this.router.navigate(['/flight-form', uniqueId]);
    }).catch((error) => {
      console.error('Error creating unique ID:', error);
    });
  }
}