import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LastMinuteFlightsComponent } from '../last-minute-flights/last-minute-flights.component';
import { FlightSearchComponent } from '../../flight-search/flight-search.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, MatListModule, LastMinuteFlightsComponent, FlightSearchComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

}