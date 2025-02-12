import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { DestinationService } from '../../../destinations/service/destinations.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CustomDatePickerComponent } from '../../model/custom-date-picker/custom-date-picker.component';

@Component({
  selector: 'app-flight-search',
  imports: [FlightsTableComponent, CommonModule, MatProgressBarModule, FormsModule, CustomDatePickerComponent, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  futureFlights$: Observable<Flight[]> = new Observable();
  filteredFlights: Flight[] = [];
  activeDestinations: string[] = [];

  originFilter: string = '';
  destinationFilter: string = '';
  minSeatsFilter: number | null = null;
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
    this.futureFlights$.subscribe(flights => {
      // ✅ Check if there are flights with the selected origin
      const originFlights = flights.filter(flight =>
        this.originFilter ? flight.origin.toLowerCase().includes(this.originFilter.toLowerCase()) : true
      );
      this.filteredFlights = flights.filter(flight => {
        const flightDateBoarding = new Date(flight.boarding);
        const flightDateLanding = new Date(flight.landing);
        const flightMonth = flightDateBoarding.getMonth();
        const flightYear = flightDateBoarding.getFullYear();

        // ✅ Ensure filtering even if only boarding is selected
        const isWithinRange = this.selectedDates.boarding
          ? this.selectedDates.landing
            ? (flightDateBoarding.getDate() === this.selectedDates.boarding.getDate() && flightDateLanding.getDate() === this.selectedDates.landing.getDate())
            : (flightDateBoarding.getDate() === this.selectedDates.boarding.getDate())
          : true; // If neither date is selected, allow all flights

        // ✅ Ensure selectedMonths contains only months
        const matchesFlexibleMonths = this.selectedMonths.length > 0
          ? this.selectedMonths.some(month =>
            month.getMonth() === flightMonth && month.getFullYear() === flightYear)
          : false;

        // ✅ Use either specific dates (boarding/landing) or flexible months, but not both at the same time
        let matchesDateFilter = true;
        if (this.selectedDates.boarding || this.selectedDates.landing) {
          matchesDateFilter = isWithinRange;
        } else if (this.selectedMonths.length > 0) {
          matchesDateFilter = matchesFlexibleMonths;
        }

        return (
          (this.originFilter ? flight.origin.toLowerCase().includes(this.originFilter.toLowerCase()) : true) &&
          (this.destinationFilter ? flight.destination.toLowerCase().includes(this.destinationFilter.toLowerCase()) : true) &&
          (this.minSeatsFilter !== null ? parseInt(flight.seats, 10) >= this.minSeatsFilter : true) &&
          matchesDateFilter
        );
      });
      this.hasOriginFlights = originFlights.length > 0;
    });
  }

  clearFilters(): void {
    this.originFilter = '';
    this.destinationFilter = '';
    this.minSeatsFilter = null;
    this.applyFilters();
  }
}