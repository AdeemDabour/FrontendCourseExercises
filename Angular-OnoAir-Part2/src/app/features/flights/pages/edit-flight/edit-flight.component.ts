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
  boardingDate: Date | null = null;
  boardingTime: string = '00:00'; // Default to midnight
  landingDate: Date | null = null;
  landingTime: string = '00:00'; // Default to midnight
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
        this.boardingDate = new Date(flight.boarding);
        this.boardingTime = this.formatTime(new Date(flight.boarding));
        this.landingDate = new Date(flight.landing);
        this.landingTime = this.formatTime(new Date(flight.landing));
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

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async saveFlight(): Promise<void> {
    if (this.boardingDate && this.boardingTime && this.landingDate && this.landingTime) {
      this.flight.boarding = this.combineDateAndTime(this.boardingDate, this.boardingTime);
      this.flight.landing = this.combineDateAndTime(this.landingDate, this.landingTime);
    }

    try {
      await this.flightService.updateFlight(this.flight.id, this.flight);
      this.router.navigate(['/manage-flights']);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0, 0);
    return combinedDate;
  }

  cancelEdit(): void {
    this.router.navigate(['/manage-flights']);
  }
}
