import { Component, OnInit } from '@angular/core';
import { Flight, Status } from '../../model/flight';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../../service/flights.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-flight',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatOptionModule
  ],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent implements OnInit {
  flight: Flight = new Flight('', '', '', '', new Date(), new Date(), '', Status.Active);
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightsService
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');
    if (flightId) {
      this.loadFlight(flightId);
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
  async saveFlight(): Promise<void> {
    try {
      await this.flightService.updateFlight(this.flight.id, this.flight);
      this.router.navigate(['/manage-flights']);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  }
  cancelEdit(): void {
    this.router.navigate(['/manage-flights']);
  }
}
