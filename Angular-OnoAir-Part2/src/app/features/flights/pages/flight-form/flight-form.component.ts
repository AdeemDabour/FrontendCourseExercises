import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Flight, Status } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { CustomDateAdapter, CUSTOM_DATETIME_FORMATS } from '../../model/CustomDateAdapter';
import { Destination } from '../../../destinations/model/destination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-flight-form',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, RouterModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatTimepickerModule],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]  
})
export class FlightFormComponent implements OnInit {
  newFlight: Flight = new Flight(
    '',
    '',
    '',
    '',
    new Date(),
    new Date(),
    '',
    Status.Active,
    0
  );

  destinations: string[] = []; // List of destination names
  today: Date = new Date();
  boardingDate: Date | null = null;
  boardingTime: Date | null = null;
  landingDate: Date | null = null;
  landingTime: Date | null = null;
  existingFlightNos: string[] = []; // Store existing flight numbers
  flightNoExists: boolean = false;
  @Input() id = 0;

  constructor(
    private flightService: FlightsService,
    private destinationService: DestinationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  async ngOnInit(): Promise<void> {
    this.flightService.loadFlights();

    this.destinationService.destinations$.subscribe(destinations => {
      this.destinations = destinations
        .filter((destination: Destination) => destination.status === Status.Active)
        .map((destination: Destination) => destination.name)
        .sort((a, b) => a.localeCompare(b));
    });

    this.existingFlightNos = this.flightService.listFlightNames();
  }

  async onSubmitRegistration(): Promise<void> {
    if (!this.checkValidation()) {
      this.combineDateAndTime();
      await this.flightService.addFlight(this.newFlight);
      // ✅ Show success message
      this.snackBar.open('Flight Added successfully!', 'OK', {
        verticalPosition: 'top', // Show at the top
        horizontalPosition: 'center', // Centered
      });

      this.router.navigate(['/manage-flights']);
    }
  }


  combineDateAndTime(): void {
    if (this.boardingDate && this.boardingTime) {
      this.newFlight.boarding = new Date(this.boardingDate); // Copy date
      this.newFlight.boarding.setHours(this.boardingTime.getHours(), this.boardingTime.getMinutes(), 0, 0);
    }
    if (this.landingDate && this.landingTime) {
      this.newFlight.landing = new Date(this.landingDate); // Copy date
      this.newFlight.landing.setHours(this.landingTime.getHours(), this.landingTime.getMinutes(), 0, 0);
    }
  }
  


  isBoardingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.boardingTime) {
      return false;
    }
  
    const now = new Date();
    return  this.boardingDate.getDate() === now.getDate() && this.boardingTime < now; // Ensures boarding time is in the future
  }
  
  isLandingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.landingDate || !this.boardingTime || !this.landingTime) {
      return false;
    }
    return this.landingDate.getDate() === this.boardingDate.getDate() && this.landingTime <= this.boardingTime;
  }
  
  checkFlightNoExists(): void {
    this.flightNoExists = this.existingFlightNos.includes(this.newFlight.flightNo.trim());
  }
  checkValidation(): boolean {
    return this.flightNoExists || this.newFlight.origin === this.newFlight.destination;
  }
} 