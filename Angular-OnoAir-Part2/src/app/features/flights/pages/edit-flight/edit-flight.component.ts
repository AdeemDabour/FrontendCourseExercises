import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Flight, Status } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';

import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-edit-flight',
  imports: [FlightFormComponent],
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css'],
})
export class EditFlightComponent implements OnInit {
  flight: Flight = new Flight('', '', '', '', new Date(), new Date(), '', Status.Active, 0);
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightsService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('id');
    if (flightId) {
      await this.loadFlight(flightId);
    } else {
      console.error('No flight ID provided.');
      this.router.navigate(['/manage-flights']);
    }
  }

  async loadFlight(id: string): Promise<void> {
    try {
      this.isLoading = true;
      const flight = await this.flightService.getFlightById(id);
      if (flight) {
        this.flight = flight;
      } else {
        console.error('Flight not found.');
        this.router.navigate(['/manage-flights']);
      }
    } catch (error) {
      console.error('Error loading flight:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async saveFlight(updatedFlight: Flight): Promise<void> {
    try {
      await this.flightService.updateFlight(updatedFlight.id, updatedFlight);
      this.snackBar.open('Flight Updated successfully!', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      this.router.navigate(['/manage-flights']);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  }
}
