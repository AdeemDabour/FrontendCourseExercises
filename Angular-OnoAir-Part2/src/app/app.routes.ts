import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ManageDestinationsComponent } from './features/destinations/pages/manage-destinations/manage-destinations.component';
import { ManageFlightsComponent } from './features/flights/pages/manage-flights/manage-flights.component';
import { FlightSearchComponent } from './features/flights/pages/flight-search/flight-search.component';
import { MyBookingsComponent } from './features/bookings/pages/my-bookings/my-bookings.component';
import { HelpPageComponent } from './features/help/pages/help-page/help-page.component';
import { FlightDetailsComponent } from './features/flights/pages/flight-details/flight-details.component';
import { DestinationDetailsComponent } from './features/destinations/pages/destination-details/destination-details.component';
import { BookingDetailsComponent } from './features/bookings/pages/booking-details/booking-details.component';
import { BookFlightComponent } from './features/bookings/pages/book-flight/book-flight.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'manage-destinations', component: ManageDestinationsComponent },
  { path: 'manage-flights', component: ManageFlightsComponent },
  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'help-page', component: HelpPageComponent },
  { path: 'flight-details/:flightNo', component: FlightDetailsComponent },
  { path: 'destination-details/:code', component: DestinationDetailsComponent },
  { path: 'booking-details/:bookingCode', component: BookingDetailsComponent },
  { path: 'book-flight/:flightNo', component: BookFlightComponent },
  { path: '**', redirectTo: '' }
];