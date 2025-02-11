import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CustomDatePickerComponent } from '../../model/custom-date-picker/custom-date-picker.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  imports: [
    FlightsTableComponent, CommonModule, MatProgressBarModule, FormsModule,
    CustomDatePickerComponent, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();
  filteredFlights: Flight[] = [];
  activeDestinations: string[] = [];

  // Filters
  originFilter: string = '';
  destinationFilter: string = '';
  minSeatsFilter: number | null = null;
  selectedDates: Date[] = [];
  selectedMonths: Date[] = [];

  isLoading: boolean = true;

  constructor(private flightService: FlightsService, private destinationService: DestinationService) { }

  ngOnInit(): void {
    try {
      this.futureFlights$ = this.flightService.getFutureFlights();
      this.futureFlights$.subscribe(flights => {
        this.filteredFlights = flights; // Initialize with all flights
      });

      this.destinationService.destinations$.subscribe(destinations => {
        this.activeDestinations = destinations.map(destination => destination.name);
      });

    } catch (error) {
      console.warn('Error fetching future flights:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    this.futureFlights$.subscribe(flights => {
        this.filteredFlights = flights.filter(flight => {
            const flightDate = new Date(flight.boarding);
            const flightMonth = flightDate.getMonth();
            const flightYear = flightDate.getFullYear();
            // ✅ Ensure selectedDates contains only specific dates
            const matchesSpecificDates = this.selectedDates.length > 0 
                ? this.selectedDates.some(date => date.toDateString() === flightDate.toDateString())
                : false;

            // ✅ Ensure selectedMonths contains only months
            const matchesFlexibleMonths = this.selectedMonths.length > 0 
                ? this.selectedMonths.some(month =>
                    month.getMonth() === flightMonth && month.getFullYear() === flightYear)
                : false;

            // ✅ Use either specific dates or flexible months, but not both at the same time
            let matchesDateFilter = true;
            if (this.selectedDates.length > 0 && this.selectedMonths.length === 0) {
                matchesDateFilter = matchesSpecificDates;
            } else if (this.selectedMonths.length > 0 && this.selectedDates.length === 0) {
                matchesDateFilter = matchesFlexibleMonths;
            } else if (this.selectedDates.length > 0 && this.selectedMonths.length > 0) {
                matchesDateFilter = matchesFlexibleMonths;
            }

            return (
                (this.originFilter ? flight.origin.toLowerCase().includes(this.originFilter.toLowerCase()) : true) &&
                (this.destinationFilter ? flight.destination.toLowerCase().includes(this.destinationFilter.toLowerCase()) : true) &&
                (this.minSeatsFilter !== null ? parseInt(flight.seats, 10) >= this.minSeatsFilter : true) &&
                matchesDateFilter
            );
        });

    });
}





  clearFilters(): void {
    this.originFilter = '';
    this.destinationFilter = '';
    this.minSeatsFilter = null;
    this.applyFilters();
  }
}
