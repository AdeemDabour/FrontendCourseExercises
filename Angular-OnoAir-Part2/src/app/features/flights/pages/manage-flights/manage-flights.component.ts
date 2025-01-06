import { Component, OnInit } from '@angular/core';
import { FlightsTableComponent } from '../flights-table/flights-table.component';
import { FlightsService } from '../../service/flights.service';
import { Flight } from '../../model/flight';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-flights',
  imports: [FlightsTableComponent, MatButtonModule, CommonModule],
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
})
export class ManageFlightsComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightsService, private router: Router) { }

  ngOnInit(): void {
    this.flights = this.flightService.listFlights();
  }
  addFlight(): void {
    this.router.navigate(['/flight-form', this.flightService.CreateUniqueId()]);
  }
}