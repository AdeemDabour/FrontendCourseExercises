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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { CUSTOM_DATETIME_FORMATS, CustomDateAdapter } from '../../model/CustomDateAdapter';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
@Component({
  selector: 'app-edit-flight',
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatTimepickerModule],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css',
  providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
      { provide: DateAdapter, useClass: CustomDateAdapter },
    ],
})
export class EditFlightComponent implements OnInit {
  flight: Flight = new Flight('', '', '', '', new Date(), new Date(), '', Status.Active, 0);
  boardingDate: Date | null = null;
  boardingTime: Date | null = null;
  landingDate: Date | null = null;
  landingTime: Date | null = null;
  invalidTime: boolean = false;
  invalidDate: boolean = false;
  isLoading: boolean = true;
  today: Date = new Date();

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
        this.boardingDate = new Date(flight.boarding);
        this.boardingTime = new Date(flight.boarding);
        this.landingDate = new Date(flight.landing);
        this.landingTime = new Date (flight.landing);
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

  isLandingTimeInvalid(): boolean {
    if (!this.boardingDate || !this.landingDate || !this.boardingTime || !this.landingTime) {
      return false; 
    }
    this.invalidTime =
      this.boardingDate.getTime() >= this.landingDate.getTime() &&
      this.landingTime <= this.boardingTime;
      console.log(this.invalidTime);
    return this.invalidTime;
  }
  isLandingDateInvalid(): boolean {
    if (!this.boardingDate || !this.landingDate || !this.boardingTime || !this.landingTime) {
      return false; 
    }
    this.invalidDate =
      this.boardingDate.getTime() > this.landingDate.getTime();
      console.log("indalid date",this.invalidDate);
    return this.invalidDate;
  }

  async saveFlight(): Promise<void> {
    if (this.boardingDate && this.boardingTime && this.landingDate && this.landingTime) {
      this.flight.boarding = this.combineDateAndTime(this.boardingDate, this.boardingTime);
      this.flight.landing = this.combineDateAndTime(this.landingDate, this.landingTime);
    }

    try {
      await this.flightService.updateFlight(this.flight.id, this.flight);
      this.snackBar.open('Flight Updated successfully!', 'OK', {
        verticalPosition: 'top', // Show at the top
        horizontalPosition: 'center', // Centered
      });
      this.router.navigate(['/manage-flights']);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  }

  private combineDateAndTime(date: Date, time: Date): Date {
    const combinedDate = new Date(date);
    combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combinedDate;
  }
  cancelEdit(): void {
    this.router.navigate(['/manage-flights']);
  }
  checkValidation(): boolean {
    return this.invalidDate || this.invalidTime;
  }

}