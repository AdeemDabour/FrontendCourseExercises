import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './manage-destinations/manage-destinations.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'manage-destinations', component: ManageDestinationsComponent },
  { path: 'manage-flights', component: ManageFlightsComponent },
  { path: 'search-flight', component: FlightSearchComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', redirectTo: '/homepage' } 
];