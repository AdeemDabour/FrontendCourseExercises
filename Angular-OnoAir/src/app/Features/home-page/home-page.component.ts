import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LastMinuteFlightsComponent } from '../last-minute-flights/last-minute-flights.component';
import { FlightSearchComponent } from '../../flight-search/flight-search.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, MatListModule, LastMinuteFlightsComponent, FlightSearchComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

}