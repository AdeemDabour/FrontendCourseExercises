import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Flight } from '../../model/flight';
import { FlightsService } from '../../service/flights.service';
import { DestinationService } from '../../../destinations/service/destinations.service';

import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { CustomDatePickerComponent } from '../../model/custom-date-picker/custom-date-picker.component';

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CUSTOM_DATETIME_FORMATS, CustomDateAdapter } from '../../model/CustomDateAdapter';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    FlightsTableComponent, CommonModule, MatProgressBarModule, FormsModule, CustomDatePickerComponent,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]
})

export class FlightSearchComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();
  filteredFlights: Flight[] = [];
  activeDestinations: string[] = [];

  originFilter: string = '';
  destinationFilter: string = '';
  minSeatsFilter: number | null = null;

  departureDate: Date | null = null;
  returnDate: Date | null = null;

  selectedDates: { boarding: Date | null; landing: Date | null } = { boarding: null, landing: null };
  selectedMonths: Date[] = [];
  hasOriginFlights: boolean = false;
  isLoading: boolean = true;

  constructor(private flightService: FlightsService, private destinationService: DestinationService) { }

  ngOnInit(): void {
    try {
      this.futureFlights$ = this.flightService.getFutureFlights();
      this.futureFlights$.subscribe(flights => {
        this.filteredFlights = flights;
      });

      this.destinationService.destinations$.subscribe(destinations => {
        this.activeDestinations = destinations.map(destination => destination.name)
          .sort((a, b) => a.localeCompare(b));
      });

    } catch (error) {
      console.warn('Error fetching future flights:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    this.isLoading = true;
  
    this.flightService.getFlightsByDateRange(this.selectedDates.boarding, this.selectedDates.landing)
      .subscribe(flights => {
        this.filteredFlights = flights.filter(flight => {
          const flightDateBoarding = new Date(flight.boarding);
          const flightDateLanding = new Date(flight.landing);
  
          let landingEndDate: Date | null = this.selectedDates.landing
            ? new Date(this.selectedDates.landing)
            : null;
  
          if (landingEndDate) {
            landingEndDate.setHours(23, 59, 59, 999);
          }
  
          const matchesExactDates =
            (!this.departureDate || flightDateBoarding.toDateString() === this.departureDate.toDateString()) &&
            (!this.returnDate || flightDateLanding.toDateString() === this.returnDate.toDateString());
  
            let matchesDateFilter = true;

            if (this.selectedMonths.length === 1) {
              // ✅ Show flights that board & land in the same month
              const selectedMonth = this.selectedMonths[0];
              matchesDateFilter =
                flightDateBoarding.getMonth() === selectedMonth.getMonth() &&
                flightDateBoarding.getFullYear() === selectedMonth.getFullYear() &&
                flightDateLanding.getMonth() === selectedMonth.getMonth() &&
                flightDateLanding.getFullYear() === selectedMonth.getFullYear();
            } else if (this.selectedMonths.length === 2) {
              // ✅ Show flights where boarding is in month 1 & landing is in month 2
              const [firstMonth, secondMonth] = this.selectedMonths;
              matchesDateFilter =
                flightDateBoarding.getMonth() === firstMonth.getMonth() &&
                flightDateBoarding.getFullYear() === firstMonth.getFullYear() &&
                flightDateLanding.getMonth() === secondMonth.getMonth() &&
                flightDateLanding.getFullYear() === secondMonth.getFullYear();
            }
          return (
            (this.originFilter ? flight.origin.toLowerCase().includes(this.originFilter.toLowerCase()) : true) &&
            (this.destinationFilter ? flight.destination.toLowerCase().includes(this.destinationFilter.toLowerCase()) : true) &&
            (this.minSeatsFilter !== null ? parseInt(flight.seats, 10) >= this.minSeatsFilter : true) &&
            matchesDateFilter &&
            matchesExactDates
          );
        });
  
        this.hasOriginFlights = this.filteredFlights.some(flight =>
          this.originFilter ? flight.origin.toLowerCase().includes(this.originFilter.toLowerCase()) : true
        );
  
        this.isLoading = false;
      });
  }
  

  clearFilters(): void {
    this.originFilter = '';
    this.destinationFilter = '';
    this.minSeatsFilter = null;
    this.departureDate = null;
    this.returnDate = null;
    this.applyFilters();
  }
}