import { Component } from '@angular/core';

import { LastMinuteFlightsComponent } from '../last-minute-flights/last-minute-flights.component';
import { FindFlightComponent } from '../find-flight/find-flight.component';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [MatCardModule, MatListModule, LastMinuteFlightsComponent, FindFlightComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
}