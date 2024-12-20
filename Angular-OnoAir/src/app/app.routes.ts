import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/pages/home-page/home-page.component';
import { ManageDestinationsComponent } from './Features/destinations/pages/manage-destinations/manage-destinations.component';
import { ManageFlightsComponent } from './Features/flights/pages/manage-flights/manage-flights.component';
import { FlightSearchComponent } from './Features/flights/pages/flight-search/flight-search.component';
import { MyBookingsComponent } from './Features/bookings/pages/my-bookings/my-bookings.component';
import { HelpPageComponent } from './Features/help/pages/help-page/help-page.component';
import { FlightDetailsComponent } from './Features/flights/pages/flight-details/flight-details.component';
import { DestinationDetailsComponent } from './Features/destinations/pages/destination-details/destination-details.component';
import { BookingDetailsComponent } from './Features/bookings/pages/booking-details/booking-details.component';
import { BookFlightComponent } from './Features/bookings/pages/book-flight/book-flight.component';

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