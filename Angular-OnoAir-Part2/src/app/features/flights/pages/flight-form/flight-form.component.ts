import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomDateAdapter, CUSTOM_DATETIME_FORMATS } from '../../model/CustomDateAdapter';

import { Flight, Status } from '../../model/flight';
import { Destination } from '../../../destinations/model/destination';

import { FlightsService } from '../../service/flights.service';
import { DestinationService } from '../../../destinations/service/destinations.service';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

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
export class FlightFormComponent implements OnInit, OnChanges {
  @Input() flight: Flight = new Flight('', '', '', '', new Date(), new Date(), '', Status.Active, 0);
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<Flight>();

  destinations: string[] = [];
  today: Date = new Date();
  boardingDate: Date | null = null;
  boardingTime: Date | null = null;
  landingDate: Date | null = null;
  landingTime: Date | null = null;
  existingFlightNos: string[] = [];
  flightNoExists: boolean = false;

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

    // Remove the flight being edited from existing flights to avoid conflict
    this.existingFlightNos = this.flightService.listFlightNames();
    if (this.isEditMode && this.flight?.flightNo) {
      this.existingFlightNos = this.existingFlightNos.filter(flightNo => flightNo !== this.flight.flightNo);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'] && this.isEditMode && this.flight.boarding && this.flight.landing) {
      console.log("✈️ Flight updated:", this.flight);

      // Extract only date for the date fields
      this.boardingDate = new Date(this.flight.boarding);
      this.landingDate = new Date(this.flight.landing);

      // Extract only time for the time fields
      this.boardingTime = new Date();
      this.boardingTime.setHours(this.flight.boarding.getHours(), this.flight.boarding.getMinutes(), 0, 0);

      this.landingTime = new Date();
      this.landingTime.setHours(this.flight.landing.getHours(), this.flight.landing.getMinutes(), 0, 0);

      console.log("🕒 Corrected Boarding Date:", this.boardingDate);
      console.log("🕒 Corrected Boarding Time:", this.boardingTime);
      console.log("🕒 Corrected Landing Date:", this.landingDate);
      console.log("🕒 Corrected Landing Time:", this.landingTime);
    }
  }


  async submitForm(): Promise<void> {
    if (!this.checkValidation()) {
      this.combineDateAndTime();
      this.formSubmit.emit(this.flight);
    }
  }
  async onSubmitRegistration(): Promise<void> {
    if (!this.checkValidation()) {
      this.combineDateAndTime();
      await this.flightService.addFlight(this.flight);
      // ✅ Show success message
      this.snackBar.open('Flight Added successfully!', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      this.router.navigate(['/manage-flights']);
    }
  }
  combineDateAndTime(): void {
    if (this.boardingDate && this.boardingTime) {
      this.flight.boarding = new Date(this.boardingDate);
      this.flight.boarding.setHours(this.boardingTime.getHours(), this.boardingTime.getMinutes(), 0, 0);
    }
    if (this.landingDate && this.landingTime) {
      this.flight.landing = new Date(this.landingDate);
      this.flight.landing.setHours(this.landingTime.getHours(), this.landingTime.getMinutes(), 0, 0);
    }
  }
  isBoardingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.boardingTime) {
      return false;
    }
    const now = new Date();
    return  this.boardingDate.getDate() === now.getDate() && this.boardingTime < now;
  }
  isLandingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.landingDate || !this.boardingTime || !this.landingTime) {
      return false;
    }
    return this.landingDate.getDate() === this.boardingDate.getDate() && this.landingTime <= this.boardingTime;
  }
  checkFlightNoExists(): void {
    this.flightNoExists = this.existingFlightNos.includes(this.flight.flightNo.trim());
  }
  checkValidation(): boolean {
    return this.flightNoExists || this.flight.origin === this.flight.destination;
  }
} 