import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LastMinuteFlightsComponent } from '../../last-minute-flights/last-minute-flights.component';

@Component({
  selector: 'app-home-page',
  imports: [MatCardModule, MatListModule, LastMinuteFlightsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
