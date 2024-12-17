import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home-page/home-page.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './manage-destinations/manage-destinations.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { HelpPageComponent } from './Features/help-page/help-page.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'manage-destinations', component: ManageDestinationsComponent },
  { path: 'manage-flights', component: ManageFlightsComponent },
  { path: 'search-flight', component: FlightSearchComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'help-page', component: HelpPageComponent },
  { path: 'flight-details/:flightNo', component: FlightDetailsComponent },
  { path: '', component: HomePageComponent },
];