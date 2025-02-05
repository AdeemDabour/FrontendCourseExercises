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
import { CustomDateAdapter, CUSTOM_DATE_FORMATS } from '../../model/CustomDateAdapter';
import { Destination } from '../../../destinations/model/destination';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flight-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
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
    Status.Active
  );

  destinations: string[] = []; // List of destination names
  today: Date = new Date();
  boardingDate: Date | null = null;
  boardingTime: string = '';
  landingDate: Date | null = null;
  landingTime: string = '';
  existingFlightNos: string[] = []; // Store existing flight numbers
  flightNoExists: boolean = false;
  invalidTime: boolean = true;
  @Input() id = 0;

  constructor(
    private flightService: FlightsService,
    private destinationService: DestinationService,
    private router: Router,
    private snackBar : MatSnackBar
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
      const [hours, minutes] = this.boardingTime.split(':').map(Number);
      this.newFlight.boarding = new Date(this.boardingDate);
      this.newFlight.boarding.setHours(hours, minutes);
    }

    if (this.landingDate && this.landingTime) {
      const [hours, minutes] = this.landingTime.split(':').map(Number);
      this.newFlight.landing = new Date(this.landingDate);
      this.newFlight.landing.setHours(hours, minutes);
    }
  }
  isLandingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.landingDate || !this.boardingTime || !this.landingTime) {
      return false; // If any field is empty, don't show error
    }
    this.invalidTime = this.boardingDate.getDate() === this.landingDate.getDate() && this.landingTime <= this.boardingTime;
    return this.boardingDate.getDate() === this.landingDate.getDate() && this.landingTime <= this.boardingTime;
  }
  checkFlightNoExists(): void {
    this.flightNoExists = this.existingFlightNos.includes(this.newFlight.flightNo.trim());
  }
  checkValidation(): boolean {
    return this.flightNoExists || this.invalidTime || this.newFlight.origin === this.newFlight.destination;
  }
} 