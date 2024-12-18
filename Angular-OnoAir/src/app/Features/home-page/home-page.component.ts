import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { LastMinuteFlightsComponent } from '../last-minute-flights/last-minute-flights.component';
import { RouterModule } from '@angular/router';
import { FindFligtComponent } from '../find-fligt/find-fligt.component';
@Component({
  selector: 'app-home-page',
  imports: [MatCardModule, MatListModule, LastMinuteFlightsComponent, FindFligtComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

}