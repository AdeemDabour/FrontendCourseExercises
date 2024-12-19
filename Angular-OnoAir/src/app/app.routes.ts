import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home-page/home-page.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './manage-destinations/manage-destinations.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { HelpPageComponent } from './Features/help-page/help-page.component';
import { FlightDetailsComponent } from './Features/flight-details/flight-details.component';
import { DestinationDetailsComponent } from './Features/destination-details/destination-details.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { BookingDetailsComponent } from './Features/booking-details/booking-details.component';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'manage-destinations', component: ManageDestinationsComponent },
  { path: 'manage-flights', component: ManageFlightsComponent },
  { path: 'search-flight', component: FlightSearchComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'help-page', component: HelpPageComponent },
  { path: 'flight-details/:flightNo', component: FlightDetailsComponent },
  { path: 'destination-details/:code', component: DestinationDetailsComponent },
  { path: 'booking-details/:bookingCode', component: BookingDetailsComponent },
  { path: 'book-flight/:flightNo', component: BookFlightComponent },
  { path: '', component: HomePageComponent }
];